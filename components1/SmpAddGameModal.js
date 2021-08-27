export default {
  template: '#smp-add-game-template',
  props: { selected: Object, showAddGameModal: Boolean },
  data() {
    return {
      newGameName: null,
      newGame: {
        date: null,
        id: null,
        map: null,
        playerRanks: null
        //   {
        //     character: null,
        //     id: null,
        //     name: null,
        //     rank: null,
        //     stars: null,
        //   }
        // ],
        // showModal: false,
      }
    }
  },
  computed: {
    series() {
      console.log('this series data in modal', this.selected);
      return this.selected;
    },
    newGameId() { return this.series.games.length + 1 },
    showModal() { return this.showAddGameModal },
    // newGameName() { return this.showAddGameModal },
  },
  methods: {
    handleFormSubmit() {
      this.newGame.playerRanks = this.newGame.playerRanks || this.selected.players;
      this.newGame.id = this.newGameId
      this.$emit('new-game-created', { seriesId: this.series.id, game: this.newGame })
      // console.log('newGameData', newGame);

    },
    handleBackClicked() { this.$emit('hide-add-game-modal') },
    handleDimmerClicked() { this.$emit('hide-add-game-modal') },

  },
  watch: {
    series(newVal) {
      console.log('watchrd id', `Game ${newVal}`);
      this.newGameName = `Game ${newVal.games.length + 1}`
    }
  },
  filters: {},
  created() {
    console.log('modal made', this)
  }
}