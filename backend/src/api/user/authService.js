//aqui ficam todos os métodos de autenticação do usuário
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('./user')
const env = require('../../.env')

const emailRegex = /\S+@\S+\.\S+/
const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{6,20})/

const sendErrorsFromDB = (res, dbErrors) => {
	const errors = [] //array pode ser uma constante pois podem ser adicionados elementos nele
	_.forIn(dbErrors.errors, error => errors.push(error.message))
	return res.status(400).json({ errors })
}

const login = (req, res, next) => { //criando um middleware
	const email = req.body.email || '' //pegar email e senha do form de login que o user digitou
	const password = req.body.password || ''

	User.findOne({ email }, (err, user) => { //busca um único usuário filtrando pelo e-mail
		if (err) {
			return sendErrorsFromDB(res, err) //se der erro, chama a função acima
		} else if (user && bcrypt.compareSync(password, user.password)) { //se achar um usuário e a senha deste for igual a senha digitada
			const token = jwt.sign(user, env.authSecret, { //instancia um token com a secret criada no env para o user, com 1 dia de duração. salva o token no local storage do browser
				expiresIn: '1 day'
			})
			const { name, email } = user //destructuring email e nome do user
			res.json({ name, email, token }) //retorna o nome do usuario, email e o token criado
		} else { //se não achar user
			return res.status(400).send({ errors: ['Usuário/Senha Inválidos'] }) //boa pratica: dizer que os dois estão inválidos para evitar que alguem saiba que o user pertence a base de dados
		}
	})
}

const validateToken = (req, res, next) => {
	const token = req.body.token || ''

	jwt.verify(token, env.authSecret, function (err, decoded) { //verifica o token e retorna decodificado
		return res.status(200).send({ valid: !err }) //se tiver valido retorna true se tiver erro retorna false
	})
}

const signup = (req, res, next) => { //método de registrar usuário
	const name = req.body.name || ''
	const email = req.body.email || ''
	const password = req.body.password || ''
	console.log('pass'+password)
	const confirmPassword = req.body.confirm_password || ''
	console.log('confpass'+confirmPassword)

	//validações

	if (!email.match(emailRegex)) { //se o e-mail não bater com o regex
		return res.status(400).send({ errors: ['O e-mail informado está inválido'] })
	}

	if (!password.match(passwordRegex)) {
		return res.status(400).send({ errors: ['Senha precisa ter: uma letra maiúscula, uma letra minúscula, um número, um caractere especial (@#$%) e ter entre 6 e 20 caracteres.'] })
	}

	const salt = bcrypt.genSaltSync()
	const passwordHash = bcrypt.hashSync(password, salt) //gera um hash seguro da senha
	if (!bcrypt.compareSync(confirmPassword, passwordHash)) { //compara o hash com a confirmação de senha e verifica se são iguais
		return res.status(400).send({ errors: ['Senhas não conferem.'] }) //retorna erro se não forem
	}

	User.findOne({ email }, (err, user) => { //busca um único usuário filtrando pelo e-mail
		if (err) {
			return sendErrorsFromDB(res, err) 
		} else if (user) { //verifica se já existe usuário cadastrado na base com este email
			return res.status(400).send({ errors: ['Usuário já cadastrado.'] }) 
		} else {
			const newUser = new User({ name, email, password: passwordHash }) //depois de todas as validações o usuário é criado. salvar o passwordHash e nunca o password
			newUser.save(err => { //salva o user na base
				if (err) {
					return sendErrorsFromDB(res, err) 
				} else {
					login(req, res, next) //se o usuário for criado com sucesso, já loga ele no sistema
				}
			})
		}
	})
}

module.exports = { login, signup, validateToken }