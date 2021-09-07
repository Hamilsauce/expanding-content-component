export default {
  template: '#smp-app-header-template',
  props: { title: String },
  data() {
    return {
      // 	title: null,
      showNewSeries: false,
    }
  },
  computed: {
    // title() { return this.title },
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
  methods: {},
  watch: {
    // game(newVal) { console.log(newVal) }
  },
  filters: {}
};