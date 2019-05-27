import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import { initialize } from 'redux-form'
import { showTabs, selectTab } from '../common/tab/tabActions'

const BASE_URL = 'http://localhost:3003/api' //definir URL base para usar no axios
const INITIAL_VALUES = { 
	credits: [{}],
	debts: [{}]
}

export function getList() { //consulta com GET
	const request = axios.get(`${BASE_URL}/billingCycles`) //requisição ASSÍNCRONA axios via GET
	return { //retorna um objeto com os atributos type e payload obrigatórios do action creator, já que este arquivo é um action creator...
		type: 'BILLING_CYCLES_FETCHED',
		payload: request
	}
}

export function create(values) {
	return submit(values, 'post')
}

export function update(values) {
	return submit(values, 'put')
}

export function remove(values) {
	return submit(values, 'delete')
}

function submit(values, method) { //função não está sendo exportada pq será usada internamente neste action creator. só exportar funções que serão usadas externamente
	return dispatch => { //esta função vai retornar várias actions ao invés de uma, usando o middleware multi
		const id = values._id ? values._id : ''
		axios[method](`${BASE_URL}/billingCycles/${id}`, values)
			.then(resp => {
				toastr.success('Sucesso', 'Operação realizada com sucesso')
				dispatch(init())
			})
			.catch(e => { //pega as exceções da promise
				e.response.data.errors.forEach(error => toastr.error('Erro', error)) //atributo errors[] que criamos no backend
			})
	}
}

export function showUpdate(billingCycle) { //TODO refatorar este método para reuso no final do curso
	return [
		showTabs('tabUpdate'),
		selectTab('tabUpdate'),
		initialize('billingCycleForm', billingCycle) //action creator do redux-form para inicializar os formularios com dados preenchidos. parametro obrigatorio: id do form e o objeto contendo os dados.
	]
}

export function showDelete(billingCycle) {
	return [
		showTabs('tabDelete'),
		selectTab('tabDelete'),
		initialize('billingCycleForm', billingCycle) //action creator do redux-form para inicializar os formularios com dados preenchidos. parametro obrigatorio: id do form e o objeto contendo os dados.
	]
}

export function init() { //estado inicial do cadastro que servirá também pro botão cancelar
	return [
		showTabs('tabList', 'tabCreate'),
		selectTab('tabList'),
		getList(),
		initialize('billingCycleForm', INITIAL_VALUES)
	]
}