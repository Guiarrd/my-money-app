const BillingCycle = require('./billingCycle')

//essa configuração só é possível fazer usando o mongoose através do node-restful
BillingCycle.methods(['get', 'post', 'put', 'delete'])
BillingCycle.updateOptions({ new: true, runValidators: true })

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

module.exports = BillingCycle