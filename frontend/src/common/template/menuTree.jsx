import React, { Component } from 'react'

export default class MenuTree extends Component {

	constructor(props) {
		super(props)
		this.state = {
			icon: 'fa-angle-left'
		}
	}

	toggleIcon() {
		const left = this.state.icon == 'fa-angle-left'
		this.setState({ icon: left ? 'fa-angle-down' : 'fa-angle-left' })
	}

	render() {
		return (
			<li className='treeview' ref="menu">
				<a href={this.props.path} onClick={() => this.toggleIcon()}>
					<i className={`fa fa-${this.props.icon}`}></i> <span>{this.props.label}</span>
					<i className={`fa ${this.state.icon} pull-right`}></i>
				</a>
				<ul className='treeview-menu'>
					{this.props.children}
				</ul>
			</li>
		)
	}
}