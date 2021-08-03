export class GameListWC extends HTMLElement {
	constructor() {
		super();
		const template = document.getElementById('smp-game-list');
		this.root = template.content.firstElementChild.cloneNode(true);
		this.attachShadow({ mode: 'open' });
		this._data;
		console.log(this);
		this.shadowRoot.appendChild(this.root);
		this.root.addEventListener('click', this.handleBtnClick, false);
		this.root.style.backgroundColor = 'blue';
	
		this.data.games.forEach(game => {
		console.log(game);
			const newGame = document.createElement('div');
			newGame.classList.add('smp-game-container');
		
			const header = document.createElement('div');
			newGame.classList.add('smp-game-header');
			newGame.appendChild(header)
			this.root.appendChild(newGame)
			// this.createPlayerElement(this.root, player)
		})
		this.bindData()
		//.bind(this)
	}
	get poop() { return this.getAttribute('poop') }

	bindData() {
		const collapsible = this.root.querySelector('.game-collapsible');
		const gameMapElement = this.root.querySelector('.game-map-name');
		const gameDateElement = this.root.querySelector('.game-date');

		collapsible.textContent = `Game ${this.id}`
		gameMapElement.textContent = this.mapName
		gameDateElement.textContent = this.date
	}

	get data() { return this._data };
	set data(newData) { this._data = newData };

	get mapName() { return this.getAttribute('map') };
	get winner() { return this.getAttribute('winner') };
	get date() { return this.getAttribute('date') };
	get id() { return this.getAttribute('id') };

	// playerSelected(e) {
	// 	this.root.addEventListener('playerSelected', e => {
	// 		this.data.selectedPlayerId =
	// 			this.data.selectedPlayerId == e.detail.playerId ?
	// 			null :
	// 			e.detail.playerId;
	// 		this.components.players
	// 			.forEach(pl => { pl.selectedPlayerId = this.data.selectedPlayerId })
	// 	})
	// }


	createGame(gameData) {
		// seriesArray[0].games
		// const gameList = $(document, '.game-list')

		const template = document.getElementById('smp-game-list');
		const gameTemplate = template.content.firstElementChild.cloneNode(true);
		const collapsible = gameTemplate.querySelector('.collapsible');

		gameTemplate.data = gameData;

		seriesData.games
			.forEach(game => {
				// const newGame = new Game($(document, '.game-list'), game)

				// collapsible.addEventListener('click', handleBtnClick, false);


				newGame.parent = gameList;
				newGame.props = game;
				console.log('ng props', newGame.props);
				newGame.id = game.id;
				newGame.mapName = game.map;
				newGame.setAttribute('map-name', game.map)
				newGame.dataset.shit = 'true';

				newGame.querySelector('.game-collapsible').textContent = `Game ${newGame.id}`;
				newGame.querySelector('.game-map-name').textContent = `Game ${newGame.mapName}`;
				console.log('ngame', newGame);

				game.playerRanks.forEach(player => {
					// newGame.createPlayerElement(newGame.parent, player)
				})
				// console.log('g l', $(document, '.game-list'));
				// $(document, '.game-list').appendChild(newGame)
				gameList.appendChild(newGame)
				$$(document, '.player-container')
					.forEach((pl, i, pls) => {})
			})
	}



	handleBtnClick(e) {
		const gameBtn = e.target;
		// gameBtn.addEventListener('click', e => {
		console.log('clicker');
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
		// })
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
		// this.playerSelected()

		return this.root;
	}

	connectedCallback() {
		console.log('connect');
		const collapsible = this.root.querySelector('.collapsible');

		collapsible.addEventListener('click', this.handleBtnClick, false);

		// browser calls this method when the element is added to the document
		// (can be called many times if an element is repeatedly added/removed)
	}

	disconnectedCallback() {
		// browser calls this method when the element is removed from the document
		// (can be called many times if an element is repeatedly added/removed)
	}

	static get observedAttributes() {
		return [ /* array of attribute names to monitor for changes */ ];
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// called when one of attributes listed above is modified
	}

	adoptedCallback() {
		// called when the element is moved to a new document
		// (happens in document.adoptNode, very rarely used)
	}

	// there can be other element methods and properties

}
customElements.define('smp-game-list', GameListWC);
// console.log('win',window.customElements.get('smp-game')); 
{ GameListWC }