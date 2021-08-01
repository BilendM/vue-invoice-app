import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";

export const actions = {
    async getInvoices({state, commit}, payload) {
      const getData = firebase.firestore().collection('invoices').where("createdBy", "==", payload);
      const results = await getData.get();
      results.forEach(doc => {
        if (!state.invoiceData.some(invoice => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };
          commit('setInvoiceData', data)
        }
      });
      commit('invoicesLoaded');
    },
    async updateInvoice({commit, dispatch}, {docId, routeId}) {
      commit('deleteInvoice', docId);
      await dispatch('getInvoices');
      commit('toggleInvoice');
      commit('editInvoice');
      commit('setCurrentInvoice', routeId);
    },
    async deleteInvoice({commit}, docId) {
      const getInvoice = firebase.firestore().collection('invoices').doc(docId);
      await getInvoice.delete();
      commit('deleteInvoice', docId)
    },
    async updateStatusToPaid({commit}, docId){
      const getInvoice = firebase.firestore().collection('invoices').doc(docId);
      await getInvoice.update({
        invoicePaid: true,
        invoicePending: false
      });
      commit('updateStatusToPaid', docId);
    },
    async updateStatusToPending({commit}, docId){
      const getInvoice = firebase.firestore().collection('invoices').doc(docId);
      await getInvoice.update({
        invoicePending: true,
        invoicePaid: false,
        invoiceDraft: false
      });
      commit('updateStatusToPending', docId);
    }
  }