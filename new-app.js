// import difrom './components1/PlayerList.js';
import { PlayerList } from './components1/PlayerList.js';
import { Game } from './components1/Game.js';
import { SeriesService, CharacterService } from './services/services.js';
import { $, $$, findRelatedElement } from './services/utils-service.js';
import { store } from './store/index.js';

import eventBus  from './services/EventBus.js';
import SmpSeries from './components1/SmpSeries.js';
import SmpSeriesMenu from './components1/SmpSeriesMenu.js';
import SmpGame from './components1/SmpGame.js';
// import SmpSeriesList from './components1/SmpSeriesList.js';
// import Series from './components/Series.js';

const smpGame = Vue.component('smp-game', SmpGame);
const smpSeries = Vue.component('smp-series', SmpSeries);
const smpSeriesMenu = Vue.component('smp-series-menu', SmpSeriesMenu);
// const smpSeriesList = Vue.component('smp-series-list', SmpSeriesList);
// const CardView = Vue.component('card-view', cardView)


// const router = new VueRouter({
// 	routes: [{
// 			path: '/',
// 			component: CardView,
// 			name: 'card-view',
// 			props: true
//     },
// 		{
// 			path: '/add-shift-view',
// 			component: AddShiftView,
// 			name: 'add-shift-view',
// 			props: true
//     },
//   ]
// });
const addSeries = async () => {
	const response = await fetch("http://localhost:3000/",
	{
		method: 'POST',
		headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
		body: `{ "Id": 78912, "Customer": "Jason Sweet", "Quantity": 1, "Price": 18.00 }`,
	});
	response.json().then(data => { console.log(data); });
};


// addSeries()


// const EventBus = new Vue();
// console.log('ebus', eventBus);
const app = new Vue({
	// router: router,
	data() {
		return {
			seriesDataUrl: './data/app-data.json',
			characterDataUrl: './data/character-data.json',
			seriesList: null,
			characterData: null
		}
	},
	computed: {
		s1Games() {
			return seriesList[0].games;
		},
		series() {
			return this.seriesList;
		},
		charData() {},
		showNav() {
			// return store.getters.showNav
		},
		showDeleteModal() {
			// return store.getters.showDeleteModal
		}
	},
	methods: {
		async init() {
			const appData = await SeriesService.fetchSeriesJson(this.seriesDataUrl);
			this.seriesList = appData.series;
			this.characterData = appData.series;
		},
		handleMenuBlur(e) {
			console.log('ckick app', e);
			if (e.target.classList.contains('series-menu-button')) return;
			// seriesMenus.forEach(m => m.classList.add('hide'));
			eventBus.$emit('blur-menu');
		},
	},
	created() {
		this.init();
		console.log('tjis', this);
	}
}).$mount('#app')