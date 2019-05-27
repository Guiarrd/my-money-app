import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { reduxForm, Field, formValueSelector } from 'redux-form' //reduxForm é tipo o método connect do react-redux. quem controla o estado do form é o redux-form. se quiser abstrair algum dado do from, tem que usar algum action creator do redux-form
import labelAndInput from '../common/form/labelAndInput'
import { init } from './billingCycleActions'
import ItemList from './itemList'
import Summary from './summary'

class BillingCycleForm extends Component {

	calculateSummary() {
		const sum = (t, v) => t + v //função para somar valores. t = total e v = valor. os valores somados vão acumulando no t
		return {
			sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum), // o '+' converte o valor que é uma string em um valor numérico. O map transformar o array de objetos credits em um array de valores de créditos. A função reduce() vai reduzir este array em um único elemento, que é o somatório de todos os créditos
			sumOfDebts: this.props.debts.map(d => +d.value || 0).reduce(sum)
		}
	}

	render() {
		const { handleSubmit, readOnly, credits, debts } = this.props //ao decorar a classe com reduxForm, o redux-form adiciona alguns elementos ao props
		const { sumOfCredits, sumOfDebts } = this.calculateSummary()
		return (
			<form role='form' onSubmit={handleSubmit}>
				<div className='box-body'>
					<Field name='name' component={labelAndInput} label='Nome' cols='12 4' placeholder='Informe o nome' readOnly={readOnly} />
					<Field name='month' component={labelAndInput} type='number' label='Mês' cols='12 4' placeholder='Informe o mês' readOnly={readOnly} />
					<Field name='year' component={labelAndInput} type='number' label='Ano' cols='12 4' placeholder='Informe o ano' readOnly={readOnly} />
					<Summary credit={sumOfCredits} debt={sumOfDebts} />
					<ItemList cols='12 6' list={credits} readOnly={readOnly} field='credits' legend='Créditos' />
					<ItemList cols='12 6' list={debts} readOnly={readOnly} field='debts' legend='Débitos' showStatus={true} />
				</div>
				<div className='box-footer'>
					<button type='submit' className={`btn btn-${this.props.submitClass}`}>
						{this.props.submitLabel}
					</button>
					
					<button type='button' className='btn btn-default ml-2' onClick={this.props.init}>Cancelar</button>
				</div>
			</form>
		)
	}
}

//retornar o mesmo componente de classe, só que decorado com redux-form
BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm) //passando o id do formulário para o atributo form, que deve ser o que está nos reducers. destroyOnUnmount: false para impedir que o form seja destruido quando eu troco de action. Esta estratégia só está sendo usada pq estou reusando o mesmo form e pq mais pra frente vou trabalhar com form dinâmico
const selector = formValueSelector('billingCycleForm') //método do redux-form pra pegar valores que estão no form. retorna um array
const mapStateToProps = state => ({
	credits: selector(state, 'credits'), 
	debts: selector(state, 'debts')
}) //passar o atributo selector para o estado através do mapStateToProps para que a aplicação possa usá-lo
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm) //decorando mais uma vez o BillingCycleForm, mas agora junto com o redux