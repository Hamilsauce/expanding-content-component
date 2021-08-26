export default {
  template: '#smp-add-game-template',
  props: { series: Object, showAddGameModal: Boolean },
  data() {
    return {
      selectedPlayerId: null,
      // showModal: false,
    }
  },
  computed: {
    player() { return this.playerData },
    showModal() { 
      console.log('showAddGameModal', this.showAddGameModal);
      
      return this.showAddGameModal 
      
    },
  },
  methods: {
    handleFormSubmit(newGameData) {
      console.log('newGameData', newGameData);
    },
    handleBackClicked() {
      console.log('back ckicjrd');
      this.showModal = false;
    },
    handleDimmerClicked() {
      console.log('dimmer ckicjrd');
      this.showAddGameModal = false;
    },

  },
  watch: {},
  filters: {},
  created() {
    console.log('modalnmade')
  }
}