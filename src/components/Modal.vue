<template>
  <div class="modal flex">
    <div class="modal-content">
      <p>Are you sure you want to exit?</p>
      <div class="actions flex">
        <button @click="closeModal" class="purple">Nevermind</button>
        <button @click="closeInvoice" class="red">Close</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  methods: {
    closeModal() {
      this.$store.commit('toggleModal');
    },
    closeInvoice() {
      this.$store.commit('toggleModal');
      this.$store.commit('toggleInvoice');
      if (this.editInvoice) {
        this.$store.commit('editInvoice');
      }
    },
  },
  computed: {
    editInvoice() {
      return this.$store.state.editInvoice;
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  z-index: 100;
  position: fixed;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
  .modal-content {
    border-radius: 20px;
    padding: 48px 92px;
    max-width: 450px;
    background-color: #252945;
    color: #fff;
    p {
      text-align: center;
    }
    .actions {
      margin-top: 24px;
      button {
        flex: 1;
      }
    }
  }
}
</style>