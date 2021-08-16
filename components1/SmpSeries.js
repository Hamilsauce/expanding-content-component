import eventBus from '../services/EventBus.js';
export default {
	template: '#smp-series-template',
	props: {
		series: Object,
	},
	data() {
		return {
			// players: [],
			// id: this.seriesData.id,
			isExpanded: false,
			selectedPlayerId: null,
			collapsed: true,
			childScrollHeight: null
		}

	},
	methods: {
		collapsibleClicked() {
			console.log('slur');
		},
		handleGameCollapsibleClicked(gameHeight) {
			// console.log('contentElement', this.contentElement);
			console.log('heard gsme click in series', this);
			// console.log('gameScrollHeight', gameScrollHeight);
			this.gameHeight = gameHeight



			if (this.gameHeight) {
				this.expandSeries(this.seriesContent, gameHeight)
				// this.seriesContent.style.maxHeight = `${parseInt(this.seriesContent.style.maxHeight) + parseInt(this.gameHeight)}px`;
			} else {
				this.seriesContent.style.maxHeight = `${this.seriesContent.style.maxHeight}px`;
			}
		},

		handleSeriesCollapsibleClicked() {
			// console.log('poop', data);
			this.collapsed = !this.collapsed;
			console.log('childScrollHeight', this.childScrollHeight);
			this.expandSeries(this.seriesContent, null)
			// el.classList.toggle('active');
			// const menubutton = $(el.parentElement, '.series-menu')

			//Todo add this style for menu nuttons
			// menubutton.classList.add('hide')


			// let content = el.nextElementSibling;
			// if (content.style.maxHeight) {
			// if (!this.collapsed) {
			// 	const childContents = [...this.seriesContent.querySelectorAll('.content')];
			// 	console.log('contentchildents');
			// 	childContents.forEach(ch => {
			// 		ch.style.maxHeight = null
			// 		ch.style.zIndex = 0
			// 		ch.classList.add('hide')
			// 	});

			// 	this.seriesContent.style.maxHeight = null;
			// 	this.seriesContent.style.zIndex = 0;
			// } else {
			// 	this.expandSeries(this.seriesContent, this.childScrollHeight)
			// }
		},

		expandSeries(seriesContent, childScrollHeight) {
			seriesContent.style.zIndex = 30;
			if (childScrollHeight) {
				console.log('expand series child scroll');
				this.seriesContent.style.maxHeight = `${parseInt(this.seriesContent.style.maxHeight) + parseInt(this.gameHeight)}px`;
				// seriesContent.style.maxHeight = '100%';
			} else {
				console.log('expand series NO child scroll');
				seriesContent.style.maxHeight = seriesContent.scrollHeight + "px";
			}
		}
	},
	computed: {
		seriesData() {
			return this.series
		},
		seriesContent() {
			return this.$refs.seriesContent;
		},
		games() { return this.seriesData.games },
		styleObject() {
			if (this.collapsed) {
				return {
					maxHeight: null,
					zIndex: 0
				}
			} else {
				if (this.gameHeight) {
					return {
						// maxHeight: parseInt(this.seriesContent.scrollHeight) + "px",
						// maxHeight: '100%',
						maxHeight: `${parseInt(this.seriesContent.style.maxHeight) + parseInt(this.gameHeight) || 0}px`,
						zIndex: 30
					}
				} else {
					return {
						maxHeight: parseInt(this.seriesContent.scrollHeight) + "px"
					}
				}
			}

		}
	},
	watch: {
		styleObject(newVal) {
			console.log('sht watch');
			console.log(newVal);
		}
	},
	filters: {},
	created() {},
	mounted() {
		console.log("series creat3d", this.seriesData);
		console.log('moubt', this);
	},
	mounted() {
		// eventBus.$on('gameCollapsibleClicked', this.handleGameCollapsibleClicked)
	}

}