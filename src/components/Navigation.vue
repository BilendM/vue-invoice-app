<template>
  <header class="flex">
    <div class="branding flex">
      <img src="@/assets/file-invoice-dollar-solid.png" alt="" />
    </div>
    <div v-if="isLoggedIn" @click="logout" class="branding flex last">
      <img src="@/assets/logout.png" alt="" />
    </div>
  </header>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "navigation",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    async logout() {
      try {
        await firebase.auth().signOut();
        await this.$store.commit("clearInvoiceData");
        this.$router.push({ name: "Login" });
      } catch (err) {
        console.log(err);
      }
    },
  },
  created() {
    var _this = this;
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        _this.isLoggedIn = true;
      } else {
        _this.isLoggedIn = false;
      }
    });
  },
};
</script>

<style lang="scss" scoped>
header {
  z-index: 99;
  flex-direction: row;
  background-color: #1e2139;
  justify-content: space-between;
  @media (min-width: 900px) {
    min-height: 100%;
    min-width: 90px;
    flex-direction: column;
    border-radius: 0 20px 20px 0;
    justify-content: space-between;
  }
  .branding {
    border-radius: 0 20px 20px 0;
    background-color: #7c5dfa;
    justify-content: center;
    padding: 24px;
    &.last {
      cursor: pointer;
      border-radius: 20px 0 0 20px;
      @media (min-width: 900px) {
        border-radius: 0 20px 20px 0;
      }
    }
    @media (min-width: 900px) {
      width: 100%;
    }
    img {
      width: auto;
      height: 30px;
    }
  }
}
</style>