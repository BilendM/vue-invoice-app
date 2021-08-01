<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="invoice-content">
      <Loading v-show="loading == true"/>
      <h1 v-if="!editInvoice">New Invoice</h1>
      <h1 v-else>Edit Invoice</h1>
      <div class="bill-from flex flex-column">
        <h4>Bill From</h4>
        <div class="input flex flex-column">
          <label for="billerStreetAddress">Street Address</label>
          <input required type="text" id="billerStreetAddress" v-model="billerStreetAddress"/>
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="billerCity">City</label>
            <input required type="text" id="billerCity" v-model="billerCity"/>
          </div>
          <div class="input flex flex-column">
            <label for="billerZipCode">Zip Code</label>
            <input required type="text" id="billerZipCode" v-model="billerZipCode"/>
          </div>
          <div class="input flex flex-column">
            <label for="billerCountry">Country</label>
            <input required type="text" id="billerCountry" v-model="billerCountry"/>
          </div>
        </div>
      </div>
      <div class="bill-to flex flex-column">
        <h4>Bill To</h4>
        <div class="input flex flex-column">
          <label for="clientName">Client Name</label>
          <input required type="text" id="clientName" v-model="clientName"/>
        </div>
        <div class="input flex flex-column">
          <label for="clientEmail">Client Email</label>
          <input required type="text" id="clientEmail" v-model="clientEmail"/>
        </div>
        <div class="input flex flex-column">
          <label for="clientStreetAddress">Client Street Address</label>
          <input required type="text" id="clientStreetAddress" v-model="clientStreetAddress"/>
        </div>
        <div class="location-details flex">
          <div class="input flex flex-column">
            <label for="clientCity">Client City</label>
            <input required type="text" id="clientCity" v-model="clientCity"/>
          </div>
          <div class="input flex flex-column">
            <label for="clientZipCode">Client Zip Code</label>
            <input required type="text" id="clientZipCode" v-model="clientZipCode"/>
          </div>
          <div class="input flex flex-column">
            <label for="clientCountry">Client Country</label>
            <input required type="text" id="clientCountry" v-model="clientCountry"/>
          </div>
        </div>
      </div>
      <div class="invoice-work flex flex-column">
        <div class="payment flex">
          <div class="input flex flex-column">
            <label for="invoiceDate">Invoice Date</label>
            <input disabled type="text" id="invoiceDate" v-model="invoiceDate"/>
          </div>
          <div class="input flex flex-column">
            <label for="paymentDueDate">Payment Due</label>
            <input required type="text" id="paymentDueDate" v-model="paymentDueDate"/>
          </div>
        </div>
        <div class="input flex flex-column">
          <label for="paymentTerms">Payment Terms (In Days)</label>
          <input required type="number" id="paymentTerms" v-model="paymentTerms"/>
        </div>
        <div class="input flex flex-column">
          <label for="productDescription">Product Description</label>
          <input required type="text" id="productDescription" v-model="productDescription"/>
        </div>
        <div class="work-items">
          <h3>Item List</h3>
          <table class="item-list">
            <tr class="table-heading flex">
              <th class="item-name">Item Name</th>
              <th class="qty">Qty</th>
              <th class="price">Price</th>
              <th class="total">Total</th>
            </tr>
            <tr class="table-items flex" v-for="(item, index) in invoiceItemList" :key="index">
              <td class="item-name"><input type="text" v-model="item.itemName"></td>
              <td class="qty"><input type="text" v-model="item.qty"></td>
              <td class="price"><input type="text" v-model="item.price"></td>
              <td class="total flex">${{ item.total = item.qty * item.price }}</td>
              <img @click="deleteInvoiceItem(item.id)" src="@/assets/icon-delete.svg" alt=""/>
            </tr>
          </table>
          <div @click="addNewInvoiceItem" class="flex button">
            <img src="@/assets/icon-plus.svg" alt=""/>
            Add New Item
          </div>
        </div>
      </div>
      <div class="save flex">
        <div class="left">
          <button type="button" @click="closeInvoice" class="red">Cancel</button>
        </div>
        <div class="right flex">
          <button v-if="!editInvoice" type="submit" @click="saveDraft" class="dark-purple">Save Draft</button>
          <button v-if="!editInvoice" type="submit" @click="publishInvoice" class="purple">Create Invoice</button>
          <button v-if="editInvoice" type="submit" class="purple">Update Invoice</button>
        </div>
      </div>
      {{createdBy}}
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/firestore";
import "firebase/auth";
import Loading from '@/components/Loading';
import {uid} from 'uid';
export default {
  name: 'invoiceModal',
  data() {
    return {
      loading: false,
      dateOptions: {year: "numeric", month: "short", day: "numeric" },
      docId: null,
      billerStreetAddress: null,
      billerCity: null,
      billerZipCode: null,
      billerCountry: null,
      clientName: null,
      clientEmail: null,
      clientStreetAddress: null,
      clientCity: null,
      clientZipCode: null,
      clientCountry: null,
      invoiceDateUnix: null,
      invoiceDate: null,
      paymentTerms: 0,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
      createdBy: firebase.auth().currentUser.uid
    }
  },
  components: {
    Loading
  },
  created() {
    if (!this.editInvoice) {
      this.invoiceDateUnix = Date.now();
      this.invoiceDate = new Date(this.invoiceDateUnix).toLocaleDateString('en-us', this.dateOptions);
    }
    if (this.editInvoice) {
      const editingInvoice = this.currentInvoice[0];
      this.docId = editingInvoice.docId;
      this.billerStreetAddress = editingInvoice.billerStreetAddress;
      this.billerCity = editingInvoice.billerCity;
      this.billerZipCode = editingInvoice.billerZipCode;
      this.billerCountry = editingInvoice.billerCountry;
      this.clientName = editingInvoice.clientName;
      this.clientEmail = editingInvoice.clientEmail;
      this.clientStreetAddress = editingInvoice.clientStreetAddress;
      this.clientCity = editingInvoice.clientCity;
      this.clientZipCode = editingInvoice.clientZipCode;
      this.clientCountry = editingInvoice.clientCountry;
      this.invoiceDateUnix = editingInvoice.invoiceDateUnix;
      this.invoiceDate = editingInvoice.invoiceDate;
      this.paymentTerms = editingInvoice.paymentTerms;
      this.paymentDueDateUnix = editingInvoice.paymentDueDateUnix;
      this.paymentDueDate = editingInvoice.paymentDueDate;
      this.productDescription = editingInvoice.productDescription;
      this.invoicePending = editingInvoice.invoicePending;
      this.invoiceDraft = editingInvoice.invoiceDraft;
      this.invoiceItemList = editingInvoice.invoiceItemList;
      this.invoiceTotal = editingInvoice.invoiceTotal;
      this.createdBy = firebase.auth().currentUser.uid

    }
  },
  methods: {
    checkClick(e) {
      if (e.target === this.$refs.invoiceWrap) {
        this.$store.commit('toggleModal');
      }
    },
    closeInvoice() {
      this.$store.commit('toggleInvoice');
      if (this.editInvoice) {
          this.$store.commit('editInvoice');
      }
    },
    addNewInvoiceItem() {
      this.invoiceItemList.push({
        id: uid(),
        itemName: "",
        qty: "",
        price: 0,
        total: 0
      })
    },
    deleteInvoiceItem(id) {
      this.invoiceItemList = this.invoiceItemList.filter(item => item.id !== id)
    },
    calInvoiceTotal() {
      this.invoiceTotal = 0;
      this.invoiceItemList.forEach(item => {
        this.invoiceTotal += item.total;
      });
    },
    publishInvoice() {
      this.invoicePending = true;
    },
    saveDraft() {
      this.invoiceDraft = true;
    },
    async uploadInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("Please fill out work Items");
        return;
      }
      this.loading = true;
      this.calInvoiceTotal();
      const databseRef = firebase.firestore().collection('invoices').doc();
      await databseRef.set({
        invoiceId: uid(6),
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        invoiceDate: this.invoiceDate,
        invoiceDateUnix: this.invoiceDateUnix,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        invoicePending: this.invoicePending,
        invoiceDraft: this.invoiceDraft,
        createdBy: firebase.auth().currentUser.uid,
        invoicePaid: null,
      });
      this.loading = false;
      this.$store.commit('toggleInvoice');
      this.$store.dispatch('getInvoices');
    },
    async updateInvoice() {
      if (this.invoiceItemList.length <= 0) {
        alert("Please fill out work Items");
        return;
      }
      this.loading = true;
      this.calInvoiceTotal();
      const databseRef = firebase.firestore().collection('invoices').doc(this.docId);
      await databseRef.update({
        billerStreetAddress: this.billerStreetAddress,
        billerCity: this.billerCity,
        billerZipCode: this.billerZipCode,
        billerCountry: this.billerCountry,
        clientName: this.clientName,
        clientEmail: this.clientEmail,
        clientStreetAddress: this.clientStreetAddress,
        clientCity: this.clientCity,
        clientZipCode: this.clientZipCode,
        clientCountry: this.clientCountry,
        paymentTerms: this.paymentTerms,
        paymentDueDate: this.paymentDueDate,
        paymentDueDateUnix: this.paymentDueDateUnix,
        productDescription: this.productDescription,
        invoiceItemList: this.invoiceItemList,
        invoiceTotal: this.invoiceTotal,
        createdBy: firebase.auth().currentUser.uid
      });
      this.loading = false;
      const data = {
        docId: this.docId,
        routeId: this.$route.params.invoiceId
      }
      this.$store.dispatch('updateInvoice', data);
    },
    submitForm() {
      if (this.editInvoice) {
        this.updateInvoice();
        return
      } else {
        this.uploadInvoice();
      }
    },
  },
  computed: {
    editInvoice() {
      return this.$store.state.editInvoice;
    },
    currentInvoice() {
      return this.$store.state.currentInvoice;
    }
  },
  watch: {
    paymentTerms() {
      const futureDate = new Date();
      this.paymentDueDateUnix = futureDate.setDate(futureDate.getDate() + parseInt(this.paymentTerms));
      this.paymentDueDate = new Date(this.paymentDueDateUnix).toLocaleDateString('en-us', this.dateOptions);
    }
  }
}
</script>

<style lang="scss" scoped>
.invoice-wrap {
  position: fixed;
  top: 0;
  left: 0;
  background-color: transparent;
  width: 100%;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  @media(min-width: 900px) {
    left: 90px;
  }

  .invoice-content {
    position: relative;
    padding: 56px;
    max-width: 700px;
    width: 100%;
    background-color: #141625;
    color: #fff;
    box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    h1 {
      margin-block: 48px;
      color: #fff;
    }
    h3 {
      margin-bottom: 16px;
      font-size: 18px;
      color: #777f98;
    }
    h4 {
      color: #7c5dfa;
      font-size: 12px;
      margin-bottom: 24px;
    }
    // Bill to and Bill from
    .bill-to,
    .bill-from {
      margin-bottom: 48px;

      .location-details {
        gap: 16px;

        div {
          flex: 1;
        }
      }
    }

    // Invoice Work
    .invoice-work {
      .payment {
        gap: 24px;
        div {
          flex: 1
        }
        #paymentTerms {
          padding-right: 20px;
        }
      }

      .work-items {
        .item-list {
          width: 100%;

          // Item Table
          .table-heading,
          .table-items {
            gap: 16px;
            font-size: 12px;

            .item-name {
              flex-basis: 50%;
            }

            .qty {
              flex-basis: 10%;
            }

            .price {
              flex-basis: 20%;
            }

            .total {
              flex-basis: 20%;
              align-self: center;
            }
          }

          .table-heading {
            margin-bottom: 16px;
            th {
              text-align: left;
            }
          }

          .table-items {
            position: relative;
            margin-bottom: 24px;

            img {
              position: absolute;
              top: 15px;
              right: 0;
              width: 12px;
              height: 16px;
            }
          }
        }
        .button {
          color: #fff;
          background-color: #252945;
          align-items: center;
          justify-content: center;
          width: 100%;

          img {
            margin-right: 4px;
          }
        }
      }
    }
    .save {
        margin-top: 60px;

        div {
          flex: 1;
        }

        .right {
          justify-content: flex-end;
        }
      }
  }

  .input {
    margin-bottom: 24px;
  }
  label {
    font-size: 12px;
    margin-bottom: 6px;
  }
  input,
  select {
    width: 100%;
    background-color: #1e2139;
    color: #fff;
    border-radius: 4px;
    padding: 12px 8px;
    border: none;

    &:focus {
      outline: none;
    }
  }
}
</style>