import { $, $$, findRelatedElement } from '../services/utils-service.js';
import eventBus from '../services/EventBus.js';
export default {
  template: '#smp-series-template',
  props: { series: Object },
  data() {
    return {
      actionLabels: ['add-game', 'edit-series', 'edit-series-title'],
      editTitleMode: false,
      actionMap: new Map(),
      collapsed: true,
      gameHeight: '0px',
      newGame: {
        id: null,
        map: null,
        date: null,
        winner: null,
        playerRanks: []
      },
    }
  },
  methods: {

    handlePlayersClicked() {
      console.log('Add player list when clicked');
    },

    mapSeriesActions(action) {
      console.log('e, act', [action]);
      if (action === 'add-game') {
        this.$emit('add-game', this.seriesData.id)
        // this.showAddGameModal = true;
      }
      else if (action === 'edit-series-title') {
        this.editSeriesName()
        this.editTitleMode = true;
      }
      else if (action === 'delete-series') {
        this.$emit('delete-series', this.seriesData.id)
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
    submitSeriesTitleEdit() {
      // 	console.log('submit');
      const targ = this.$refs.seriesCollapsible
      const title = $(targ, '.series-title')
      title.contentEditable = false;
      this.editTitleMode = false;
    },

    expandSeries(seriesContent, childScrollHeight) {
      seriesContent.style.zIndex = 30;
      if (childScrollHeight != null) this.seriesContent.style.maxHeight = `${parseInt(this.seriesContent.style.maxHeight) + parseInt(this.gameHeight)}px`;
      else seriesContent.style.maxHeight = seriesContent.scrollHeight + "px";
    },



    editSeriesName() {
      const targ = this.$refs.seriesCollapsible
      // 	console.log(targ);

      const title = $(targ, '.series-title')
      title.contentEditable = true;
      this.editTitleMode = true
      title.focus()

      const submitButton = $(targ, '.submit-series-name')
      let sel = window.getSelection();

      if (sel.toString() == '') { //no text selection
        window.setTimeout(function() {
          let range = document.createRange(); //range object
          range.selectNodeContents(title); //sets Range
          sel.removeAllRanges(); //remove all ranges from selection
          sel.addRange(range); //add Range to a Selection.
        }, 100);
      }
    },
    editSeries() {}
  },
  computed: {
    seriesData() { return this.series },
    seriesContent() { return this.$refs.seriesContent },
    seriesCollapsible() { return this.$refs.seriesCollapsible },
    games() { return this.seriesData.games },
    collapsibleClasses() {
      const classes = {};

      if (this.editTitleMode) classes.editing = true;
      else classes.editing = false;

      if (this.collapsed) classes.active = false;
      else classes.active = true;

      return classes;
    },

    hideClasses() {
      if (this.editTitleMode) return { hide: false }
      else return { hide: true };
    },

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
      this.seriesContent.style.maxHeight = `${parseInt(this.seriesContent.style.maxHeight) + parseInt(gameHeight) || 40}px`;
    }
  },
  filters: {},
  created() {},
  mounted() {},
  mounted() {}
}