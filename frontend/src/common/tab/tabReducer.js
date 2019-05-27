const INITIAL_STATE = { selected: '', visible: {} } //estado evoluído para considerar as abas visíveis ou não

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case 'TAB_SELECTED':
			return { ...state, selected: action.payload } //atribuit o payload ao atributo do initial_state
		case 'TAB_SHOWED':
			return { ...state, visible: action.payload } //atribuit o payload ao atributo do initial_state
		default:
			return state
	}
}