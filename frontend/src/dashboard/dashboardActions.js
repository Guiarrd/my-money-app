import axios from 'axios'

const BASE_URL = 'http://localhost:3003/api' //definir URL base para usar no axios

export function getSummary() { //consulta com GET
	const request = axios.get(`${BASE_URL}/billingCycles/summary`) //requisição ASSÍNCRONA axios via GET
	return { //retorna um objeto com os atributos type e payload obrigatórios do action creator, já que este arquivo é um action creator...
		type: 'BILLING_SUMMARY_FETCHED',
		payload: request
	}
}