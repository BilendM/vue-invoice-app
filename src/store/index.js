import { createStore } from 'vuex'

export default createStore({
  state: {
    invoiceModal: false,
    modalActive: false
  },
  mutations: {
    toggleInvoice(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    toggleModal(state) {
      state.modalActive = !state.modalActive;
    }
  },
  actions: {
  },
  modules: {
  }
})
