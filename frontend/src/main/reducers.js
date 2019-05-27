import { combineReducers } from 'redux'

import DashboardReducer from '../dashboard/dashboardReducer'
import TabReducer from '../common/tab/tabReducer'
import BillingCycleReducer from '../billingCycle/billingCycleReducer'
import { reducer as formReducer } from 'redux-form' //usar as para dar outro nome ao objeto importado
import { reducer as toastrReducer } from 'react-redux-toastr'
import AuthReducer from '../auth/authReducer'

const rootReducer = combineReducers({ //combina todos reducers
	dashboard: DashboardReducer, //reducer do Dashboard que contém o estado do mesmo
	tab: TabReducer,
	billingCycle: BillingCycleReducer,
	form: formReducer, //todos os dados dos forms estarão neste objeto. cada form possui um ID único
	toastr: toastrReducer,
	auth: AuthReducer
})

export default rootReducer