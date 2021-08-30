// import eventBus from '../services/EventBus.js';
export default {
  template: '#smp-game-template',
  props: { gameData: Object, seriesCollapsed: Boolean },
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
    contentWrapper() { return this.$refs.contentWrapper },
    collapsible() { return this.$refs.gameCollapsible },
    gameRoot() { return this.$refs.gameRoot },
    classObject() {},
    styleObject() {}
  },
  methods: {
    calculateContentHeight() {
      if (this.collapsed) this.contentWrapper.style.maxHeight = null;
      else {
        this.gameContent.style.maxHeight = this.gameContent.scrollHeight + "px";
        this.contentWrapper.style.maxHeight = this.contentWrapper.scrollHeight + "px";
      }
    },
    
    handleGameCollapsibleClicked() {
      this.collapsed = !this.collapsed
      this.collapsible.classList.toggle("active");

      this.calculateContentHeight();
      this.$emit('game-collapsible-clicked', { childMaxHeight: this.contentWrapper.style.maxHeight })
    },
  },
  watch: {
    seriesCollapsed(newValue) {
      // console.log('swries collapsed watchrr', [newValue, this.seriesCollapsed]);
    if (newValue === true) {
      this.collapsed = newValue;
      this.calculateContentHeight();
    }
      // this.seriesCollapsed = newValue !== this ? newValue : this.seriesCollapsed;
      // this.collapsed = newValue;

    }
    // // game(newVal) { console.log(newVal) }
  },
  filters: {}
};