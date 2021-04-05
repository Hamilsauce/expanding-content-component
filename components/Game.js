import {
	Player
} from './Player.js'

export class Game {
	constructor(parent, props) {
		this.className = 'game-container';
		this.parent = parent;
		// this.rootElement = root;
		this.root = document.createElement('div');
		this.props = props;
		this.data = {
			id: this.props.id,
			seriesId: this.parent.dataset.series,
			players: this.props.playerRanks,
			isExpanded: false

		};
	}

	template(props) {
		// <div class="game-container" data-game="${this.data.id}" data-series="${this.data.seriesId}">
		return `
				<button class="collapsible game-collapsible" data-game="1" data-series="1">Open Game1</button>
				<div class="content game-content hide">
					<div class="game-details">
						<div class="game-map-name" data-game="1" data-series="1">
							Map: Fruit Islands
						</div>
						<div class="game-date" data-game="1" data-series="1">
							03/20/2021
						</div>
					</div>
			<!-- PlayerList Component -->
					<div class="player-list">
			<!-- Player Component -->
			
					</div>
				</div>
		`;
		// </div>
	}

	handleBtnClick(gameBtn) {
		gameBtn.addEventListener('click', e => {
			e.target.classList.add('active')
			const seriesContent = e.target.parentElement.parentElement.parentElement;
			const gameContent = e.target.nextElementSibling;
			gameBtn.classList.toggle("active");
			gameContent.classList.toggle('hide');

			const menubutton = seriesContent.querySelector('.series-menu');
			menubutton.classList.add('hide')

			let gameHeight = parseInt(gameContent.style.maxHeight.replace('px', ''))
			let seriesHeight = parseInt(seriesContent.style.maxHeight.replace('px', ''))

			if (gameHeight) {
				gameContent.style.maxHeight = 0; // 1) set it zero to reset series height
				gameContent.style.maxHeight = null; // 2) Set it null so it passes if condition
			} else {
				gameContent.style.maxHeight = gameContent.scrollHeight + "px";
				gameContent.style.zIndex = 30;
				seriesContent.style.zIndex = 30;

				if (gameContent.scrollHeight) {
					seriesContent.style.maxHeight = `${parseInt(seriesContent.style.maxHeight) + parseInt(gameContent.scrollHeight)}px`;
				} else {
					seriesContent.style.maxHeight = seriesContent.scrollHeight + "px";
				}
			}
		})
	}
	
	createPlayerElement(listEl, player) {
		const pl = new Player(listEl, player).render()
		return pl;
	}

	render() {
		console.log('this.props');
		console.log(this.props);
		this.root.classList.add(this.className)
		this.root.dataset.id = this.data.id;
		this.root.dataset.series = this.data.seriesId;
		this.root.insertAdjacentHTML('beforeend', this.template(this.props))

		let list = this.root.querySelector('.player-list')
		
		this.data.players
			.forEach(player => {
				list.appendChild(this.createPlayerElement(list, player))
			})
		
		const gameBtn = this.root.querySelector('.game-collapsible')
		this.handleBtnClick(gameBtn)
		return this.root;
	}
}

{
	Game
}