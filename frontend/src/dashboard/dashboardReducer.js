const INITIAL_STATE = {summary: { credit: 0, debt: 0}} //estado inicial da aplicação

export default function(state = INITIAL_STATE, action) {
	switch(action.type) { //fazer um switch dos tipos das actions da aplicação
		case 'BILLING_SUMMARY_FETCHED':
			return { ...state, summary: action.payload.data }
		default: //colocar default caso nenhuma das ações interessem
			return state
	}
}