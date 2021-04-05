export class Player {
	constructor(parent, props) {
		this.className = 'player-container';
		this.root = document.createElement('div');
		this.props = props;
		this.data = {
			isSelected: false,
			heading: 'My Todos',
			todos: ['Swim', 'Climb', 'Jump', 'Play']
		}
	}

	template(props) {
		return `
			<div class="player-name">Player: ${props.name}</div>
			<div class="player-character-name">Character: ${props.character}</div>
			<div class="player-rank">Rank: ${props.rank}</div>
			<div class="player-stars">Stars: ${props.stars}</div>
		`;
	}

	handleClick() {
		this.root.addEventListener('click', e => {

			this.data.isSelected = !this.data.isSelected;
console.log(this.data.isSelected);
			if (this.data.isSelected) {
				this.root.classList.add('active')
			} else {
				this.root.classList.remove('active')

			}
		})
	}

	render() {
		// const root = this.rootElement;
		const playerHTML = this.template(this.props)
		this.root.classList.add(this.className)
		this.root.dataset.playerName = this.props.name
		this.root.insertAdjacentHTML('beforeend', playerHTML)
		this.handleClick();
		// this.rootElement.dataset.gameId = prop.id
		// console.log(this.props);
		// this.root.innerHTML = playerHTML
		return this.root;
	}
}

{
	Player
}