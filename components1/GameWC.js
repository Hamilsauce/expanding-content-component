import {
	Player
} from './Player.js'

export class GameWC extends HTMLElement {
	constructor(parent, props) {
		super();
		console.log('props');
		let template = document.getElementById('smp-game');
		let root = template.content.firstElementChild.cloneNode(true);

		this.props = props;
		this.parent = parent;
		console.log('suck', props);

		// this._data = {
		// 	id: this.props.id,
		// 	seriesId: this.parent.dataset.series,
		// 	players: this.props.playerRanks,
		// 	isExpanded: false,
		// 	selectedPlayerId: null
		// }
		const collapsible = document.querySelector('.game-collapsible');
		console.log('col', collapsible);
		collapsible.textContent = `Game ${this._data.id}`

		this.bindData()

		const shadowRoot = this.attachShadow({ mode: 'open' }).appendChild(root.cloneNode(true));
	}

	get data() { return this._data }

	bindData() {
		const collapsible = document.querySelector('.game-collapsible');
		// console.log('col', collapsible);
		collapsible.textContent = `Game ${this._data.id}`
	}

	playerSelected(e) {
		this.root.addEventListener('playerSelected', e => {
			this.data.selectedPlayerId =
				this.data.selectedPlayerId == e.detail.playerId ?
				null :
				e.detail.playerId;
			this.components.players
				.forEach(pl => { pl.selectedPlayerId = this.data.selectedPlayerId })
		})
	}

	handleBtnClick(gameBtn) {
		gameBtn.addEventListener('click', e => {
			const seriesContent = e.target.parentElement.parentElement.parentElement;
			const gameContent = e.target.nextElementSibling;
			gameBtn.classList.toggle('active');
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

// customElements.define('my-paragraph',);

{ GameWC }