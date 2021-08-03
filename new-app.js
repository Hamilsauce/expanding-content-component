import {
  PlayerList
} from './components1/PlayerList.js'
import {
  Game
} from './components1/Game.js'
import SeriesService from './services/series-service.js'
import {
  $,
  $$,
  findRelatedElement
} from './services/utils-service.js'
import {
  store
} from './store/index.js'

const router = new VueRouter({
  routes: [{
      path: '/',
      component: CardView,
      name: 'card-view',
      props: true
    },
    {
      path: '/add-shift-view',
      component: AddShiftView,
      name: 'add-shift-view',
      props: true
    },
  ]
});


const EventBus = new Vue();


const app = new Vue({
  router: router,
  data() {
    return {
      workData: workHistory,
    }
  },
  computed: {
    workHistory() {
      return store.getters.workHistory
    },
    showNav() {
      return store.getters.showNav
    },
    showDeleteModal() {
      return store.getters.showDeleteModal
    }
  },
  methods: {
    handleExportAsJson() {
      exportAsJson(this.workHistory)
    },
    handleExportAsCsv() {
      exportAsCsv(this.workHistory)
    },
  },
  created() {
    store.dispatch('fetchLocalStorageData')
  }
}).$mount('#app')