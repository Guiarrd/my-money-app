const express = require('express')

//quando precisa passar algo por parametro de um modulo para outro
module.exports = function(server) {

	//URL base para todas as rotas
	const router = express.Router()
	server.use('/api', router)

	//Rotas de Ciclo de Pagamento
	const BillingCycle = require('../api/billingCycle/billingCycleService')
	BillingCycle.register(router, '/billingCycles')
}