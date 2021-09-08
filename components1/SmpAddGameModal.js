export default {
  template: '#smp-add-game-template',
  props: { selected: Object, showAddGameModal: Boolean },
  data() {
    return {
      newGameName: null,
      newGame: {
        name: null,
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
    series() { return this.selected },
    newGameId() { return this.series.games.length + 1 },
    showModal() { return this.showAddGameModal },
  },
  methods: {
    handleFormSubmit() {
      this.newGame.playerRanks = this.newGame.playerRanks || this.selected.players;
      this.newGame.id = this.newGameId
      this.$emit('new-game-created', { seriesId: this.series.id, game: { ...this.newGame, id: this.newGameId, playerRanks: this.newGame.playerRanks || this.selected.players } })
      this.newGame = {};
    },
    handleBackClicked() { this.$emit('hide-add-game-modal') },
    handleDimmerClicked() { this.$emit('hide-add-game-modal') },
  },
  watch: {
    series(newVal) { this.newGameName = `Game ${newVal.games.length + 1}` }
  },
  filters: {},
  created() {}
}