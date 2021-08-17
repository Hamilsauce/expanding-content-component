import eventBus from '../services/EventBus.js';
export default {
	template: '#smp-series-template',
	props: { series: Object },
	data() {
		return {
			collapsed: true,
			gameHeight: '0px',
			newGame: {
				id: null,
				map: null,
				date: null,
				winner: null,
				playerRanks: [
					{
						id: null,
						name: null,
						rank: null,
						stars: null,
						character: null,
					},
				]
			},
		}
	},
	methods: {
		handlePlayersClicked() {
			console.log('Add player list when clicked');
		},
		handleMenuOptionClicked(action) {
			console.log('mebu click heard innsrries', action);
			if (action === 'add-game') {
				this.games.push({
					id: this.games.length + 1,
					map: null,
					date: null,
					winner: null,
					playerRanks: [
						{
							id: null,
							name: null,
							rank: null,
							stars: null,
							character: null,
						},
					]
				});
				console.log('gsmes after push', this.games);
			}
		},

		handleGameCollapsibleClicked(gameHeight) {
			this.gameHeight = gameHeight
			if (this.gameHeight) this.expandSeries(this.seriesContent, gameHeight)
			else this.seriesContent.style.maxHeight = `${this.seriesContent.style.maxHeight}px`;
		},

		handleSeriesCollapsibleClicked() {
			this.collapsed = !this.collapsed;
			this.expandSeries(this.seriesContent, null);
		},

		expandSeries(seriesContent, childScrollHeight) {
			seriesContent.style.zIndex = 30;
			if (childScrollHeight != null) this.seriesContent.style.maxHeight = `${parseInt(this.seriesContent.style.maxHeight) + parseInt(this.gameHeight)}px`;
			else seriesContent.style.maxHeight = seriesContent.scrollHeight + "px";
		}
	},
	computed: {
		seriesData() { return this.series },
		seriesContent() { return this.$refs.seriesContent },
		games() { return this.seriesData.games },
		styleObject() {
			if (this.collapsed) {
				return {
					maxHeight: null,
					zIndex: 500
				}
			} else {
				if (this.gameHeight != null) {
					return {
						maxHeight: `${parseInt(this.seriesContent.style.maxHeight) + parseInt(this.gameHeight) || 40}px`,
						zIndex: 500
					}
				} else return { maxHeight: parseInt(this.seriesContent.scrollHeight) + "px" }
			}
		}
	},
	watch: {
		styleObject(newVal) { console.log('series style obk', newVal) },
		games(newVal) {
			const gameHeight = '40px'
			this.seriesContent.style.maxHeight =`${parseInt(this.seriesContent.style.maxHeight) + parseInt(gameHeight) || 40}px`;
		}
	},
	filters: {},
	created() {},
	mounted() {},
	mounted() {}
}