// import difrom './components1/PlayerList.js';
// import { PlayerList } from './components1/PlayerList.js';
import { SeriesService, CharacterService } from './services/services.js';
import { $, $$, findRelatedElement } from './services/utils-service.js';
import { store } from './store/index.js';

import eventBus from './services/EventBus.js';
import SmpSeries from './components1/SmpSeries.js';
import SmpSeriesMenu from './components1/SmpSeriesMenu.js';
import SmpGame from './components1/SmpGame.js';
import SmpPlayer from './components1/SmpPlayer.js';

const smpGame = Vue.component('smp-game', SmpGame);
const smpSeries = Vue.component('smp-series', SmpSeries);
const smpPlayer = Vue.component('smp-player', SmpPlayer);
const smpSeriesMenu = Vue.component('smp-series-menu', SmpSeriesMenu);

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
		series() { return this.seriesList },
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
			if (e.target.classList.contains('series-menu-button')) return;
			else eventBus.$emit('blur-menu');
		},
	},
	created() {
		this.init();
	}
}).$mount('#app')