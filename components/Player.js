export class Player {
	constructor(parent, props) {
		this.className = 'player-container';
		this.root = document.createElement('div');
		this.props = props;
		this._isSelected = false;
		this.count = 0
		this.data = {
			isSelected: false,
		}
	}
	
	set isSelected(val) {
		this.data.isSelected = val
		if (this.isSelected == true) {
			this.root.classList.add('active')
		} else {
			this.root.classList.remove('active')
		
		}
	}
	
	get isSelected() {
		return this.data.isSelected;
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
// e.path.contains()
			this.isSelected = !this.isSelected;
			// console.log(this.isSelected);
		})
	}

	render() {
		// const root = this.rootElement;
		const playerHTML = this.template(this.props)
		this.root.classList.add(this.className)
		this.root.dataset.playerName = this.props.name
		this.root.dataset.id = this.props.id
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