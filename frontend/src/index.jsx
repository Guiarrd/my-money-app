import React from 'react'
import ReactDom from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'

import promise from 'redux-promise'
import multi from 'redux-multi'
import thunk from 'redux-thunk'

import Routes from './main/routes'
import reducers from './main/reducers'

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
const store = applyMiddleware(multi, thunk, promise)(createStore)(reducers, devTools) //aplica middleware ao estado via decorator

ReactDom.render( //envolver toda a aplicação com o Provider pra aplicar o store e os reducers nela
	<Provider store={store}> 
		<Routes />
	</Provider>
, document.getElementById('app'))