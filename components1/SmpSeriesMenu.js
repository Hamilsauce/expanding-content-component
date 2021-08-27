import eventBus from '../services/EventBus.js';
export default {
	template: '#smp-series-menu-template',
	props: {seriesId: Number},
	data() {
		return { showMenu: false }
	},
	computed: {
		classObject() { return { hide: !this.showMenu } }
	},
	methods: {
		handleBlur() { this.showMenu = false },

		seriesMenuToggleClicked() { this.showMenu = !this.showMenu },
	
		handleMenuOptionClicked(action) { 
		  this.showMenu = false 
		  this.$emit('series-menu-option-clicked', action) },

		editSeriesTitleClicked(e) {
			this.handleMenuOptionClicked('edit-series-title', e)
		},
		
		deleteSeriesClicked() {
			this.handleMenuOptionClicked('delete-series')
		},
		
		addGameClicked() {
			this.handleMenuOptionClicked('add-game')
		},
	},
	watch: {},
	filters: {},
	mounted() {
	 // console.log('series menu', this)
	  eventBus.$on('blur-menu', this.handleBlur) }
};




// $(document, '.delete-series-button')
// 	.addEventListener('click', e => {
// 		const content = [...$$(document, '.series-container')]
// 			.find(cont => {
// 				return e.target.dataset.series == cont.dataset.series
// 			})
// 		content.remove()
// 	});

// //TODO When a new game is added, recalculate series height!
// $(document, '.add-game-button')
// 	.addEventListener('click', e => {
// 		const content = [...$$(document, '.series-content')]
// 			.find(cont => {
// 				return e.target.dataset.series == cont.dataset.series
// 			})

// 		e.target.parentElement.classList.add('hide')
// 		const gameList = $(document, '.game-list')
// 		const gameContainer = document.createElement('div');

// 		gameContainer.innerText = 'new container'
// 		gameList.appendChild(gameContainer)
// 		expandSeries(content)
// 	});

// $(document, '.edit-series-button')
// 	.addEventListener('click', e => {
// 		const targ = e.target
// 		const menuList = targ.parentElement;
// 		const seriesBtn = [...$$(document, '.series-collapsible')]
// 			.find(btn => {
// 				return menuList.dataset.series == btn.dataset.series
// 			});

// 		menuList.classList.add('hide');

// 		const title = $(seriesBtn, '.series-title')
// 		title.classList.add('editing')
// 		title.contentEditable = true;
// 		title.dataset.editing = 'true'
// 		seriesBtn.classList.add('editing')
// 		title.focus()

// 		const submitButton = $(seriesBtn, '.submit-series-name')
// 		submitButton.classList.remove('hide')

// 		let sel = window.getSelection();
// 		if (sel.toString() == '') { //no text selection
// 			window.setTimeout(function() {
// 				let range = document.createRange(); //range object
// 				range.selectNodeContents(title); //sets Range
// 				sel.removeAllRanges(); //remove all ranges from selection
// 				sel.addRange(range); //add Range to a Selection.
// 			}, 100);
// 		}
// 	});