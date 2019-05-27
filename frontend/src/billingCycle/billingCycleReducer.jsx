const INITIAL_STATE = {list: []} //estado inicial da aplicação

export default (state = INITIAL_STATE, action) => {
	switch(action.type) { //fazer um switch dos tipos das actions da aplicação
		case 'BILLING_CYCLES_FETCHED':
			return { ...state, list: action.payload.data }
		default: //colocar default caso nenhuma das ações interessem
			return state
	}
}