import eventBus from '../services/EventBus.js';
export default {
	template: '#smp-series-menu-template',
	props: {},
	data() {
		return {
			showMenu: false
		}
	},
	computed: {
		classObject() {
			return
			if (this.showMenu) {
				hide: false
			} else {
				hide: true
			}
		}
	},
	methods: {
		handleBlur() { 
			console.log('heard blur in menu');
			this.showMenu = false},
		handleSeriesMenuButtonClicked() {
			this.showMenu = !this.showMenu
		}
	},
	watch: {},
	filters: {},
	mounted(){
		eventBus.$on('blur-menu', this.handleBlur);
	}
};