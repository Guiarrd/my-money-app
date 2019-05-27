const express = require('express')
const auth = require('./auth')

//quando precisa passar algo por parametro de um modulo para outro
module.exports = function(server) {

	/*
	* Rotas protegidas por Token JWT
	*/

	const protectedApi = express.Router() //criar novas rotas
	server.use('/api', protectedApi) //prefixo da rota

	protectedApi.use(auth) //aplica autenticação em todas as rotas que foram registradas

	//Rotas de Ciclo de Pagamento
	const BillingCycle = require('../api/billingCycle/billingCycleService')
	BillingCycle.register(protectedApi, '/billingCycles')

	/*
	* Rotas abertas
	*/

	const openApi = express.Router()
	server.use('/oapi', openApi)

	const AuthService = require('../api/user/authService')
	openApi.post('/login', AuthService.login)
	openApi.post('/signup', AuthService.signup)
	openApi.post('/validateToken', AuthService.validateToken)

}