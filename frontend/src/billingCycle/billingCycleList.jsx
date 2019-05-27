import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { getList, showUpdate, showDelete } from './billingCycleActions'

class BillingCycleList extends Component {

	componentWillMount() { //método de ciclo de vida do componente chamado quando o componente é exibido na tela (tipo document.ready)
		this.props.getList()
	}

	renderRows() {
		const list = this.props.list || []
		return list.map(bc => (
			<tr key={bc._id}>
				<td>{bc.name}</td>
				<td>{bc.month}</td>
				<td>{bc.year}</td>
				<td>
					<button className='btn btn-warning' onClick={() => this.props.showUpdate(bc)}>
						<i className='fa fa-pencil'></i>
					</button>

					<button className='btn btn-danger' onClick={() => this.props.showDelete(bc)}> {/* TODO Refatorar para componente reusavel */} 
						<i className='fa fa-trash-o'></i>
					</button>
				</td>
			</tr>
		))
	}

	render() {
		return (
			<div>
				<table className='table'>
					<thead>
						<tr>
							<th>Nome</th>
							<th>Mês</th>
							<th>Ano</th>
							<th className='table-actions'>Ações</th>
						</tr>
					</thead>
					<tbody>
						{this.renderRows()}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = state => ({list: state.billingCycle.list}) //state é a concatenação de todos os reducers
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch) //linka os action creators ao dispatch para disparar as actions pros reducers
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)