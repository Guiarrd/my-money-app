import React, { Component } from 'react' //importar Component para criar componentes de classe
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux' //método para 'ligar' as action ao componente atual

import { getSummary } from './dashboardActions'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import ValueBox from '../common/widget/valueBox'
import Row from '../common/layout/row'

class Dashboard extends Component {

	componentWillMount() { //método de ciclo de vida do componente chamado quando o componente é exibido na tela (tipo document.ready)
		this.props.getSummary()
	}

	render() { //método que todo componente classe deve obrigatoriamente ter
		const { credit, debt } = this.props.summary

		return (
			<div>
				<ContentHeader title='Dashboard' small='Versão 1.0' />
				<Content>
					<Row>
						<ValueBox cols='12 4' color='green' icon='bank' value={`R$ ${credit.toFixed(2)}`} text='Total de Créditos' />
						<ValueBox cols='12 4' color='red' icon='credit-card' value={`R$ ${debt.toFixed(2)}`} text='Total de Débitos' />
						<ValueBox cols='12 4' color='blue' icon='money' value={`R$ ${(credit - debt).toFixed(2)}`} text='Valor Consolidado' />
					</Row>
				</Content>
			</div>
		)
	}
}

//função para mapear as propriedades e adicioná-las ao estado. recebe uma função que tem state como parametro que retorna o atributo do reducer
const mapStateToProps = state => ({summary: state.dashboard.summary}) //pega os atributos criados no arquivo reducers
const mapDispatchToProps = dispatch => bindActionCreators({getSummary}, dispatch) //linka os action creators ao dispatch para disparar as actions pros reducers
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard) //exporta a conexão entre o mapStateToprops, mapDispatchToProps e a classe Dashboard via padrão decorator