const BillingCycle = require('./billingCycle')
const errorHandler = require('../common/errorHandler')

//essa configuração só é possível fazer usando o mongoose através do node-restful
BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })
BillingCycle.after('post', errorHandler).after('put', errorHandler)

//criar uma nova rota para trazer a contagem de registros para paginação
//não precisa registrar essa rota pq lá em routes já registramos todas
BillingCycle.route('count', (req, res, next) => {
	//método disponível pelo mongoose
	BillingCycle.count((error, value) => {
		//se tiver erro, retorna um JSON contendo array de erros com status 500
		if (error) {
			res.status(500).json({errors: [error]})
		} else {
			//se não der erro, retorna a resposta em JSON
			res.json({value})
		}
	})
})

BillingCycle.route('summary', (req, res, next) => {
	BillingCycle.aggregate({
		$project: {credit: {$sum: "$credits.value"}, debt: {$sum: "$debts.value"}}
	}, {
		$group: {_id: null, credit: {$sum: "$credit"}, debt: {$sum: "$debt"}}
	}, {
		$project: {_id: 0, credit: 1, debt: 1} //0 = esconde campo, 1 mostra campo no resultado
	}, (error, result) => {
		if (error) {
			res.status(500).json({errors: [error]})
		} else {
			//se não der erro, retorna a resposta em JSON
			res.json(result[0] || {credit: 0, debt: 0})
		}		
	})
})

module.exports = BillingCycle