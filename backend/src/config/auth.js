const jwt = require('jsonwebtoken')
const env = require('../.env')

module.exports = (req, res, next) => {
	// ignorar requisição do CORS
	if (req.method === 'OPTIONS') {
		next()
	} else {
		const token = req.body.token || req.query.token || req.headers['authorization'] // recebe o token da requisição, que pode vir de três formas: no corpo da requisição, na query da requisição ou no cabeçalho de autenticação do CORS

		if (!token) { //se não tiver token na requisição
			return res.status(403).send({ errors: ['Nenhum token encontrado'] })
		}

		jwt.verify(token, env.authSecret, function(err, decoded) {
			if (err) {
				return res.status(403).send({ errors: ['Falha ao autenticar o token'] })
			} else {
				// req.decoded = decoded //só se quiser passar o token decodificado
				next()
			}
		})
	}
}