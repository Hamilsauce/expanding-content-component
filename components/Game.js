import {
	Player
} from './Player.js'

export class Game {
	constructor(parent, props) {
		this.props = props;
		this.className = 'game-container';
		this.parent = parent;
		this.root = document.createElement('div');
		this.components = {
			players: []
		};
		this.data = {
			id: this.props.id,
			seriesId: this.parent.dataset.series,
			players: this.props.playerRanks,
			isExpanded: false,
			selectedPlayerId: null
		};
	}

	playerSelected(e) {
		this.root.addEventListener('playerSelected', e => {
			this.data.selectedPlayerId = this.data.selectedPlayerId == e.detail.playerId ? null : e.detail.playerId;
			
			this.components.players
				.forEach(pl => {
					pl.selectedPlayerId = this.data.selectedPlayerId
				})
		})
	}

	template(props) {
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
	}

	handleBtnClick(gameBtn) {
		gameBtn.addEventListener('click', e => {
			const seriesContent = e.target.parentElement.parentElement.parentElement;
			const gameContent = e.target.nextElementSibling;
			e.target.classList.add('active')
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
					seriesContent.style.maxHeight = `${seriesContent.scrollHeight}px`;
				}
			}
		})
	}

	createPlayerElement(listEl, player) {
		const pl = new Player(listEl, player);
		this.components.players.push(pl)
		return pl.render()
	}

	render() {
		this.root.classList.add(this.className)
		this.root.dataset.id = this.data.id;
		this.root.dataset.series = this.data.seriesId;
		this.root.insertAdjacentHTML('beforeend', this.template(this.props))

		const list = this.root.querySelector('.player-list')
		const gameBtn = this.root.querySelector('.game-collapsible')

		this.data.players
			.forEach(player => {
				list.appendChild(this.createPlayerElement(list, player))
			})

		this.handleBtnClick(gameBtn)
		this.playerSelected()
		return this.root;
	}
}

{
	Game
}