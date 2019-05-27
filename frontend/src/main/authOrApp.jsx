import '../common/template/dependencies'
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import App from './app'
import Auth from '../auth/auth'
import { validateToken } from '../auth/authActions'

class AuthOrApp extends Component {

	componentWillMount() {
		if(this.props.auth.user) {
			this.props.validateToken(this.props.auth.user.token)
		}
	}

	render() {
		const { user, validToken } = this.props.auth
		
		if(user && validToken) { //se o token estiver válido e for um user logado e existente
			axios.defaults.headers.common['authorization'] = user.token //mandar para todas as requisições feitas pelo axios o token
			return <App>{this.props.children}</App> //chama o app
		} else if(!user && !validToken) { //senao
			return <Auth /> //redireciona pra tela de autenticação
		} else {
			return false
		}
	}
}

const mapStateToProps = state => ({ auth: state.auth })
const mapDispatchToProps = dispatch => bindActionCreators({ validateToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthOrApp)