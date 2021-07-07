<template>
  <router-link class="invoice flex" :to="{name: 'Invoice', params: {invoiceId: invoice.invoiceId}}">
    <div class="left flex">
      <span class="tracking-number">#{{ invoice.invoiceId }}</span>
      <span class="due-date">{{ invoice.paymentDueDate }}</span>
      <span class="person">{{ invoice.clientName }}</span>
    </div>
    <div class="right flex">
      <span class="price">${{ invoice.invoiceTotal }}</span>
      <div class="status-button flex" :class="{paid : invoice.invoicePaid, draft: invoice.invoiceDraft, pending: invoice.invoicePending}">
        <span v-if="invoice.invoicePaid">Paid</span>
        <span v-if="invoice.invoiceDraft">Draft</span>
        <span v-if="invoice.invoicePending">Pending</span>
      </div>
      <div class="icon">
        <img src="@/assets/icon-arrow-right.svg" alt="">
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: 'invoice',
  props: ['invoice']
}
</script>

<style lang="scss" scoped>
  .invoice {
    text-decoration: none;
    cursor: pointer;
    gap: 16px;
    margin-bottom: 16px;
    color: #fff;
    border-radius: 20px;
    padding: 28px 32px;
    background-color: #1e2139;
    align-items: center;
    box-shadow: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      box-shadow: 10px 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    span {
      font-size: 13px;
    }

    .left {
      align-items: center;
      flex-basis: 60%;
      gap: 16px;

      span {
        flex: 1;
      }

      .tracking-number {
        text-transform: uppercase;
      }
    }

    .right {
      gap: 16px;
      flex-basis: 60%;
      align-items: center;

      .price {
        flex: 1;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
</style>