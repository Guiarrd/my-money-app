import React, { Component } from 'react'

import Grid from '../common/layout/grid'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'

export default ({credit, debt}) => ( //componente funcional sempre recebe props por padrão. em vez de receber props e fazer o operador destructuring, dá pra fazer isso direto no parâmetro
	<Grid cols='12'>
		<fieldset>
			<legend>Resumo</legend>
			<Row>
				<ValueBox cols='12 4' color='green' icon='bank' value={`R$ ${credit.toFixed(2)}`} text='Total de Créditos' />
				<ValueBox cols='12 4' color='red' icon='credit-card' value={`R$ ${debt.toFixed(2)}`} text='Total de Débitos' />
				<ValueBox cols='12 4' color='blue' icon='money' value={`R$ ${(credit - debt).toFixed(2)}`} text='Valor Consolidado' />
			</Row>
		</fieldset>
	</Grid>
)