// import { $, $$, findRelatedElement } from '../services/utils-service.js';
import Ham from 'https://hamilsauce.github.io/hamhelper/hamhelper1.0.0.js';
import eventBus from '../services/EventBus.js';
export default {
  template: '#smp-series-template',
  props: { seriesData: Object },
  data() {
    return {
      actionLabels: ['add-game', 'edit-series', 'edit-series-title'],
      editTitleMode: false,
      actionMap: new Map(),
      seriesCollapsed: true,
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
    handleGameCollapsibleClicked({ childMaxHeight }) {
      this.contentWrapper.style.maxHeight = `${parseInt(this.seriesContent.scrollHeight) + parseInt(childMaxHeight)}px`;
      this.seriesContent.style.maxHeight = `${parseInt(this.seriesContent.scrollHeight) + parseInt(childMaxHeight)}px`;
    },
    
    handleSeriesCollapsibleClicked() {
      this.seriesCollapsed = !this.seriesCollapsed;
      this.seriesCollapsible.classList.toggle("active");

      // if (this.seriesContent.style.maxHeight) {
      if (this.seriesCollapsed) {
        const childContents = [...this.seriesContent.querySelectorAll('.content-wrapper')];
        const childColls = [...this.seriesContent.querySelectorAll('.collapsible')];
        this.contentWrapper.style.maxHeight = null;
        childContents.forEach(ch => ch.style.maxHeight = null);
        childColls.forEach(ch => ch.classList.remove("active"));
      } else {
        this.contentWrapper.style.maxHeight = `${this.seriesContent.scrollHeight}px`
        this.seriesContent.style.maxHeight = `${this.seriesContent.scrollHeight}px`
      };
    },

    handlePlayersClicked() {
      // console.log('Add player list when clicked');
    },

    mapSeriesActions(action) {
      console.log('e, act', [action]);
      if (action === 'add-game') {
        this.$emit('add-game', this.series.id)
        // this.showAddGameModal = true;
      }
      else if (action === 'edit-series-title') {
        this.editSeriesName()
        this.editTitleMode = true;
      }
      else if (action === 'delete-series') {
        this.$emit('delete-series', this.series.id)
      }
    },

    submitSeriesTitleEdit() {
      const targ = this.$refs.seriesCollapsible
      const title = Ham.qs('.series-title', targ)
      title.contentEditable = false;
      this.editTitleMode = false;
    },

    editSeriesName() {
      const title = Ham.qs('.series-title', this.seriesCollapsible)
      const submitButton = $('.submit-series-name', this.seriesCollapsible)

      title.contentEditable = true;
      this.editTitleMode = true
      title.focus();
      //TODO Move this Select all text to more gloval spot
      let sel = window.getSelection();
      if (sel.toString() == '') { //no text selection
        window.setTimeout(() => {
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
    series() { return this.seriesData },
    seriesContent() { return this.$refs.seriesContent },
    contentWrapper() { return this.$refs.contentWrapper },
    seriesCollapsible() { return this.$refs.seriesCollapsible },
    games() { return this.series.games },
    collapsibleEditClass() { return this.editTitleMode ? { editing: true } : { editing: false } },
    titleButtonHideClass() { return this.editTitleMode ? { hide: false } : { hide: true } },
    styleObject() {}
  },
  watch: {
    // styleObject(newVal) { console.log('series style obk', newVal) },
    games(newVal) {
      console.log('games', newVal);
      const gameHeight = '40px'
      this.seriesContent.style.maxHeight = `${parseInt(this.seriesContent.style.maxHeight) + parseInt(gameHeight) || 40}px`;
    }
  },
  filters: {},
  created() {
    console.log('create', this);
  },
  mounted() {
    console.log('mount', this);

  }
}