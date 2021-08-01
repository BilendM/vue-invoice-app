<template>
  <div class="login-view flex">
    <div class="login flex flex-column">
      <h1>Register</h1>
      <form class="login flex flex-column" @submit.prevent="register">
        <input type="email" placeholder="Email" v-model="email" />
        <br />
        <input type="text" placeholder="Username" v-model="username" />
        <br />
        <input type="password" placeholder="Password" v-model="password" />
        <button class="purple login-button" type="submit">Register</button>
      </form>
      <p class="create">
        Already have an account? Sign in here
        <router-link :to="{ name: 'Login' }">here</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
export default {
  name: "register",
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        const createUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        const result = await createUser;
        const db = await firebase.firestore();
        const collection = db.collection("users").doc(result.user.uid);
        await collection.set({
          email: this.email,
          username: this.username,
        });
        await this.$router.push({ name: "Login" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
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
    color: #fff;
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
}
</style>