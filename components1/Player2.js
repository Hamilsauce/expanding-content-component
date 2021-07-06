export class Player {
	constructor(elem, props) {
		this.selector = 'player-container';
		this.rootElement = elem;
		this.props = props;
		this.data = {
			heading: 'My Todos',
			todos: ['Swim', 'Climb', 'Jump', 'Play']
		}
	}

	template(props) {
		return `
		<div class="player-container" data-player-name="${props.name}">
			<div class="player-name">Player: ${props.name}</div>
			<div class="player-character-name">Character: ${props.character}</div>
			<div class="player-rank">Rank: ${props.rank}</div>
			<div class="player-stars">Stars: ${props.stars}</div>
		</div>
		`;
	}
	
	handleClick() {
		
	}

	render() {
		// const root = this.rootElement;
		const playerHTML = this.template(this.props)
		// this.rootElement.classList.add(this.selector)
		// this.rootElement.dataset.gameId = prop.id
		console.log(this.props);
		// this.rootElement.dataset.playerName = this.props.name
		// this.rootElement.innerHTML = playerHTML
		return playerHTML;
		// return this.rootElement;
	}
}

{
	Player
}