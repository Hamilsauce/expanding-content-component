import eventBus from '../services/EventBus.js';
export default {
	template: '#smp-game-template',
	props: { gameData: Object },
	data() {
		return {
			selectedPlayerId: null,
			collapsed: true,
		}
	},
	computed: {
		game() { return this.gameData },
		players() { return this.gameData.playerRanks },
		gameContent() { return this.$refs.gameContent },
		gameRoot() { return this.$refs.gameRoot },
		hideClasses() {
			if (this.editTitleMode) return { hide: false }
			else return { hide: true };
		},
		styleObject() {
			if (this.collapsed) return {
				maxHeight: null,
				zIndex: 0
			}
			else {
				if (this.gameContent.style.maxHeight) return {
					maxHeight: '100%',
					zIndex: 30
				}
				else return { maxHeight: '100%' }
				// else return { maxHeight: this.gameContent.scrollHeight + "px" }
			}
		}
	},
	methods: {
		handleCollapsibleClicked() {
			this.collapsed = !this.collapsed
			if (this.collapsed) this.gameContent.style.maxHeight = null;
			else this.gameContent.style.maxHeight = this.gameContent.scrollHeight + "px";

			let gameMaxHeight = null
			if (!this.collapsed) gameMaxHeight = parseInt(this.gameContent.style.maxHeight.replace('px', ''));

			this.$emit('game-collapsible-clicked', gameMaxHeight)
		}
	},
	watch: {
		// game(newVal) { console.log(newVal) }
	},
	filters: {}
};