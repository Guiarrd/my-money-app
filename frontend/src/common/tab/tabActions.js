export function selectTab(tabId){
	return {
		type: 'TAB_SELECTED',
		payload: tabId
	}
}

export function showTabs(...tabIds){ //operador rest que vai juntar todos os parâmetros passados em um array
	const tabsToShow = {}
	tabIds.forEach(e => tabsToShow[e] = true) //inserindo atributos no objeto vazio
	return {
		type: 'TAB_SHOWED',
		payload: tabsToShow
	}
}