const _ = require('lodash')

module.exports = (req, res, next) => { //exportar um middleware padrão express
	const bundle = res.locals.bundle

	if (bundle.errors) {
		const errors = parseErrors(bundle.errors)
		res.status(500).json({errors})
	} else {
		next() //chama proximo middleware senão buga
	}
}

const parseErrors = (nodeRestfulErrors) => {
	const errors = [] //array pode ser uma constante pois podem ser adicionados elementos nele
	_.forIn(nodeRestfulErrors, error => errors.push(error.message))
	return errors
}