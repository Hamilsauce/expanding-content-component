import { eventBus } from '../services/EventBus.js';
export default {
	template: '#smp-game-template',
	props: {
		gameData: Object,
	},
	data() {
		return {
			// game: this.gameData,
			// players: this.gameData.players,
			// id: this.gameData.id,
			// seriesId: this.gameData.series,
			isExpanded: false,
			selectedPlayerId: null,
			collapsed: true,

		}
	},
	computed: {
		game() {
			// console.log('gamedata', this.gameData);
			return this.gameData;
		},
		players() {
			return this.gameData.playerRanks;
		},
		gameContent() {
			return this.$refs.gameContent;
		},
		styleObject() {
			if (this.collapsed) {
				return {
					maxHeight: null,
					zIndex: 0
				}
			} else {
				if (this.gameContent.scrollHeight) {
					console.log('maxheight game', this.gameContent.style.maxHeight);
					return {
						maxHeight: 'fit-content',
						// maxHeight: `${parseInt(this.gameContent.style.maxHeight)}px`,
						zIndex: 30
					}
				} else {
					return {
						maxHeight: this.gameContent.scrollHeight + "px"
					}
				}
			}
		}
	},
	methods: {

		handleCollapsibleClicked() {
			this.collapsed = !this.collapsed
			// eventBus.$emit('gameCollapsibleClicked')
			if (this.collapsed) {
				this.gameContent.style.maxHeight = null;
			} else {
				this.gameContent.style.maxHeight = this.gameContent.scrollHeight + "px";
			}


			let gameMaxHeight = null

			if (!this.collapsed) {
				gameMaxHeight = parseInt(this.gameContent.style.maxHeight.replace('px', ''));
			} else {

			}

			console.log('clicker', this);
			this.$emit('game-collapsible-clicked', gameMaxHeight)
			// const gameContent = e.target.nextElementSibling;
			// gameBtn.classList.toggle('active');
			// gameContent.classList.toggle('hide');

			// const menubutton = seriesContent.querySelector('.series-menu');
			// menubutton.classList.add('hide')

			// let gameHeight = parseInt(gameContent.style.maxHeight.replace('px', ''))
			// let seriesHeight = parseInt(seriesContent.style.maxHeight.replace('px', ''))

			// if (gameHeight) {
			// 	gameContent.style.maxHeight = 0; // 1) set it zero to reset series height
			// 	gameContent.style.maxHeight = null; // 2) Set it null so it passes if condition
			// } else {
			// 	gameContent.style.maxHeight = gameContent.scrollHeight + "px";
			// 	gameContent.style.zIndex = 30;
			// 	// seriesContent.style.zIndex = 30;




			// 	//TODO MOVE THIS TO SERIES

			// 	// if (gameContent.scrollHeight) {
			// 	// 	seriesContent.style.maxHeight = `${parseInt(seriesContent.style.maxHeight) + parseInt(gameContent.scrollHeight)}px`;
			// 	// } else {
			// 	// 	seriesContent.style.maxHeight = `${seriesContent.scrollHeight}px`;
			// 	// }
			// }
		}
	},
	watch: {
		game(newVal) {
			// this.createGame(newVal)
			console.log('gsme watch');
			console.log(newVal);
		}
	},
	filters: {}
};

/*
Old Game
*/

// class Game {
// 	constructor(parent, props) {
// 		this.props = props;
// 		this.className = 'game-container';
// 		this.parent = parent;
// 		// this.root = document.createElement('div');
// 		// this.components = {
// 		// 	players: []
// 		// }
// 		this._data = {
// 			// id: this.props.id,
// 			players: this.props.playerRanks,
// 			seriesId: this.parent.dataset.series,
// 			isExpanded: false,
// 			selectedPlayerId: null
// 		}
// 	}

// 	get data() { return this._data }

// 	playerSelected(e) {
// 		this.root.addEventListener('playerSelected', e => {
// 			this.data.selectedPlayerId =
// 				this.data.selectedPlayerId == e.detail.playerId ?
// 				null :
// 				e.detail.playerId;
// 			this.components.players
// 				.forEach(pl => { pl.selectedPlayerId = this.data.selectedPlayerId })
// 		})
// 	}

// 	handleBtnClick(gameBtn) {
// 		gameBtn.addEventListener('click', e => {
// 			const seriesContent = e.target.parentElement.parentElement.parentElement;
// 			const gameContent = e.target.nextElementSibling;
// 			gameBtn.classList.toggle('active');
// 			gameContent.classList.toggle('hide');

// 			const menubutton = seriesContent.querySelector('.series-menu');
// 			menubutton.classList.add('hide')

// 			let gameHeight = parseInt(gameContent.style.maxHeight.replace('px', ''))
// 			let seriesHeight = parseInt(seriesContent.style.maxHeight.replace('px', ''))

// 			if (gameHeight) {
// 				gameContent.style.maxHeight = 0; // 1) set it zero to reset series height
// 				gameContent.style.maxHeight = null; // 2) Set it null so it passes if condition
// 			} else {
// 				gameContent.style.maxHeight = gameContent.scrollHeight + "px";
// 				gameContent.style.zIndex = 30;
// 				seriesContent.style.zIndex = 30;

// 				if (gameContent.scrollHeight) {
// 					seriesContent.style.maxHeight = `${parseInt(seriesContent.style.maxHeight) + parseInt(gameContent.scrollHeight)}px`;
// 				} else {
// 					seriesContent.style.maxHeight = `${seriesContent.scrollHeight}px`;
// 				}
// 			}
// 		})
// 	}

// 	createPlayerElement(listEl, player) {
// 		const pl = new Player(listEl, player);
// 		this.components.players.push(pl)
// 		return pl.render()
// 	}

// 	render() {
// 		this.root.classList.add(this.className)
// 		this.root.dataset.id = this.data.id;
// 		this.root.dataset.series = this.data.seriesId;
// 		this.root.insertAdjacentHTML('beforeend', this.template(this.props))

// 		const list = this.root.querySelector('.player-list')
// 		const gameBtn = this.root.querySelector('.game-collapsible')

// 		this.data.players
// 			.forEach(player => {
// 				list.appendChild(this.createPlayerElement(list, player))
// 			})

// 		this.handleBtnClick(gameBtn)
// 		this.playerSelected()
// 		return this.root;
// 	}

// 	template(props) {
// 		return `
// 				<div class="collapsible game-collapsible" data-game="${this.data.id}" data-series="${this.data.seriesId}">Game ${this.data.id}</div>
// 				<div class="content game-content hide">
// 					<div class="game-details">
// 						<div class="game-map-name" data-game="${this.data.id}" data-series="${this.data.seriesId}">
// 							Map: ${this.props.map}
// 						</div>
// 						<div class="game-date" data-game="${this.data.id}" data-series="${this.data.seriesId}">
// 							${this.props.date}
// 						</div>
// 					</div>
// 						<!-- PlayerList Component -->
// 					<div class="player-list">
// 						<!-- Player Component -->
// 					</div>
// 				</div>
// 			`;
// 	}
// }


//	computed: {
// refName() {
// 	return `item${this.shift.id}`
// },
// cardRef() {
// 	return this.$refs[this.refName]
// },
// isSelected() {
// 	return this.selectedCardId == this.shiftData.id ? true : false
// },
// editMode() {
// 	return this.editCardId == this.shiftData.id && this.isSelected ? true : false
// },
//	},



//	methods: {
// emitCardSelected() {
// 	store.dispatch('handleSelectedCard', {
// 		cardId: this.shiftData.id,
// 		cardRef: this.cardRef
// 	})
// },
// deleteCard() {
// 	store.commit('toggleDeleteModal')
// },
// toggleEdit() {
// 	this.editMode && this.isSelected ? this.$emit('toggle-edit', this.shift.id) : this.$emit('toggle-edit', this.shiftData.id);
// },
// saveEdit() {
// 	store.commit('saveCardEdit', this.newShiftData);

// 	this.toggleEdit()

// 	// this.$emit('save-edit', this.newShiftData)
// },
// cancelEditCard() {
// 	this.$emit('cancel-edit', this.shiftData.id)
// },
//	},