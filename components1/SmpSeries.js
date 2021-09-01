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
    calculateContentHeight() {
      if (this.seriesCollapsed) {
        const childContents = [...this.seriesContent.querySelectorAll('.content-wrapper')];
        const childColls = [...this.seriesContent.querySelectorAll('.collapsible')];
        this.contentWrapper.style.maxHeight = null;
        childContents.forEach(ch => ch.style.maxHeight = null);
        childColls.forEach(ch => ch.classList.remove("active"));
      } else {
        this.contentWrapper.style.maxHeight = `${this.seriesContent.scrollHeight}px`
        this.seriesContent.style.maxHeight = `${this.seriesContent.scrollHeight}px`
      }
    },
    
    handleGameCollapsibleClicked({ childMaxHeight }) {
      this.contentWrapper.style.maxHeight = `${parseInt(this.seriesContent.scrollHeight) + parseInt(childMaxHeight)}px`;
      this.seriesContent.style.maxHeight = `${parseInt(this.seriesContent.scrollHeight) + parseInt(childMaxHeight)}px`;
    },

    handleSeriesCollapsibleClicked() {
      this.seriesCollapsed = !this.seriesCollapsed;
      this.seriesCollapsible.classList.toggle("active");

      this.calculateContentHeight();
    },

    handlePlayersClicked() {},

    mapSeriesActions(action) {
      console.log('e, act', [action]);
      if (action === 'add-game') this.$emit('add-game', this.series.id)
      else if (action === 'delete-series') this.$emit('delete-series', this.series.id)
      else if (action === 'edit-series-title') {
        this.editSeriesName()
        this.editTitleMode = true;
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
      const submitButton = Ham.qs('.submit-series-name', this.seriesCollapsible)

      title.contentEditable = true;
      this.editTitleMode = true
      title.focus();

      //TODO Move this Select all text to more gloval spot
      let sel = window.getSelection();
      if (sel.toString() == '') {
        window.setTimeout(() => {
          let range = document.createRange();
          range.selectNodeContents(title);
          sel.removeAllRanges();
          sel.addRange(range);
        }, 100);
      }
    },
    editSeries() {}
  },
  computed: {
    series() { return this.seriesData },
    games() { return this.series.games },
    seriesCollapsible() { return this.$refs.seriesCollapsible },
    collapsibleEditClass() { return this.editTitleMode ? { editing: true } : { editing: false } },
    seriesContent() { return this.$refs.seriesContent },
    contentWrapper() { return this.$refs.contentWrapper },
    titleButtonHideClass() { return this.editTitleMode ? { hide: false } : { hide: true } },
    styleObject() {}
  },
  watch: {
    games(newVal, oldVal) {
         this.contentWrapper.style.maxHeight = `${parseInt(this.seriesContent.scrollHeight) + 55}px`;
         this.seriesContent.style.maxHeight = `${parseInt(this.seriesContent.scrollHeight) + 55}px`;
    }
  },
  filters: {},
  created() {},
  mounted() {}
}