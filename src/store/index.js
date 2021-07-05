import { createStore } from 'vuex'

export default createStore({
  state: {
    invoiceModal: false
  },
  mutations: {
    toggleInvoice(state) {
      state.invoiceModal = !state.invoiceModal;
    }
  },
  actions: {
  },
  modules: {
  }
})
