export default {
	template: '#smp-player-template',
	props: { playerData: Object },
	data() {
		return {
			selectedPlayerId: null,
			collapsed: true,
		}
	},
	computed: {
		player() { return this.playerData },
		// styleObject() {
		// 	if (this.collapsed) return {
		// 		maxHeight: null,
		// 		zIndex: 0
		// 	}
		// 	else {
		// 		if (this.gameContent.scrollHeight) return {
		// 			maxHeight: 'fit-content',
		// 			zIndex: 30
		// 		}
		// 		else return { maxHeight: this.gameContent.scrollHeight + "px" }
		// 	}
		// }
	},
	methods: {
	},
	watch: {
		// game(newVal) { console.log(newVal) }
	},
	filters: {}
};