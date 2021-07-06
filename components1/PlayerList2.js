import {
	Player
} from './Player.js'

export class PlayerList {
	constructor(elem, props) {
		this.rootElement = elem;
		this.props = props;
		this.data = {
			heading: 'My Todos',
			todos: ['Swim', 'Climb', 'Jump', 'Play']
		}
	}

	template(listEl, props) {
		props
			.forEach((prop, i) => {
				const p = document.createElement('div')
				listEl.appendChild(new Player(p, prop).render());
			})
		return listEl;
	}

	render() {
		console.log('this.props');
		console.log(this.props);
		this.template(this.rootElement, this.props)
	}
}

{
	PlayerList
}