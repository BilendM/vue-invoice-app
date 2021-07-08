<template>
  <div class="login-view flex">
    <div class="login flex flex-column">
      <h1>Login</h1>
      <form class="login flex flex-column" @submit.prevent="login">
      <input type="email" placeholder="Email" v-model="email">
      <br>
      <input type="password" placeholder="Password" v-model="password">
      <button class="purple login-button" type="submit">Login</button>
      </form>
      <p class="create">Or Create an account <router-link :to="{}">here</router-link></p>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase/firebaseinit.js"
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login() {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
        user => {
          console.log(user.user.uid)
        },
        error => {
          console.log(error);
        }
      )
    }
  }
}
</script>

<style lang="scss" scoped>

.login-view {
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}
  .login {
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 400px;

    h1 {
      color: #FFF;
      margin-bottom: 24px;
    }

    input {
      color: #fff;
      padding: 24px 12px;
      border-radius: 20px;
      background-color: #252945;
      border: none;
      width: 100%;
      &:focus {
        outline: none;
      }
    }

    .login-button {
      margin: 32px 0;
    }

    .create {
      color: #fff;
    }
  }
</style>