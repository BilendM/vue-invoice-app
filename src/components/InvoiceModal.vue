<template>
  <div @click="checkClick" ref="invoiceWrap" class="invoice-wrap flex flex-column">
    <form @submit.prevent="submitForm" class="invoice-content">
      <h1>New Invoice</h1>
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
          <label for="paymentTerms">Payment Terms</label>
          <select required type="text" id="paymentTerms" v-model="paymentTerms">
            <option value="30">Net 30 Days</option>
            <option value="60">Net 60 Days</option>
          </select>
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
              <td class="item-name">Item Name</td>
              <td class="qty">Qty</td>
              <td class="price">Price</td>
              <td class="total">Total</td>
            </tr>
          </table>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'invoiceModal',
  data() {
    return {
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
      paymentTerms: null,
      paymentDueDateUnix: null,
      paymentDueDate: null,
      productDescription: null,
      invoicePending: null,
      invoiceDraft: null,
      invoiceItemList: [],
      invoiceTotal: 0,
    }
  }
}
</script>

<style>

</style>