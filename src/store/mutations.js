export const mutations = {
    toggleInvoice(state) {
      state.invoiceModal = !state.invoiceModal;
    },
    toggleModal(state) {
      state.modalActive = !state.modalActive;
    },
    setInvoiceData(state, payload) {
      state.invoiceData.push(payload);
    },
    invoicesLoaded(state) {
      state.invoicesLoaded = true;
    },
    setCurrentInvoice(state, payload) {
      state.currentInvoice = state.invoiceData.filter(invoice => {
        return invoice.invoiceId === payload
      });
    },
    editInvoice(state) {
      state.editInvoice = !state.editInvoice;
    },
    deleteInvoice(state, payload) {
      state.invoiceData = state.invoiceData.filter(invoice => invoice.docId !== payload)
    },
    updateStatusToPaid(state, payload) {
      state.invoiceData.forEach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePaid = true;
          invoice.invoicePending = false;
        }
      })
    },
    updateStatusToPending(state, payload) {
      state.invoiceData.forEach(invoice => {
        if (invoice.docId === payload) {
          invoice.invoicePending = true;
          invoice.invoicePaid = false;
          invoice.invoiceDraft = false;
        }
      })
    },
    clearInvoiceData(state){
      state.invoiceData = []
    }
  }