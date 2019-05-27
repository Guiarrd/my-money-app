const userKey = '_mymoney_user'
const INITIAL_STATE = {
	user: JSON.parse(localStorage.getItem(userKey)), //localStorage é como se fosse os cookies do browser. esta é uma variável global do node para testes: { name: 'Teste', email: 'aluno@escola.com.br' },
	validToken: false
}

export default (state = INITIAL_STATE, action) => {
	switch(action.type) {
		case 'TOKEN_VALIDATED': //verifica se o token foi validade
			if (action.payload) { //payload vai vir true ou false
				return {...state, validToken: true} //se for validade, retorna que o token é válido
			} else {
				localStorage.removeItem(userKey) //senão, remove o user logado do localStorage
				return {...state, validToken: false, user: null} //retorna token inválido e sem nenhum user
			}
		case 'USER_FETCHED': //usuário se registrou e/ou fez login
			localStorage.setItem(userKey, JSON.stringify(action.payload)) //payload tem nome, email e token do user. quando ele chamar esta ação, seta estas informações serializadas no localStorage
			return {...state, user: action.payload, validToken: true}
		default:
			return state
	}
}