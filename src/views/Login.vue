<template>
  <div class="login-view flex">
    <div class="login flex flex-column">
      <h1>Login</h1>
      <form class="login flex flex-column" @submit.prevent="login">
      <input type="email" placeholder="Email" v-model="email">
      <br>
      <input type="password" placeholder="Password" v-model="password">
      <p class="error-message" v-if="errMsg"> {{ errMsg }} </p>
      <button class="purple login-button" type="submit">Login</button>
      </form>
      <p class="create">Or Create an account <router-link :to="{name: 'Register'}">here</router-link></p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app"
import "firebase/auth";
export default {
  name: 'login',
  data() {
    return {
      email: '',
      password: '',
      errMsg: '' 
    }
  },
  methods: {
    async login() {
      try {
        await firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        await this.$router.push({name: 'Home'})
      } catch (error) {
        switch (error.code) {
        case 'auth/invalid-email':
            this.errMsg = 'Invalid email'
            break
        case 'auth/user-not-found':
            this.errMsg = 'No account with that email was found'
            break
        case 'auth/wrong-password':
            this.errMsg = 'Incorrect password'
            break  
        default:
            this.errMsg = 'Email or password was incorrect'
            break
      }
      }
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
    a {
      color: #7c5dfa;
      text-decoration: none;
    }
    .error-message {
      color: white;
      border: 1px solid #252945;
      border-radius: 10px;
      padding: 0.5em;
      margin-top: 30px;
    }
  }
</style>