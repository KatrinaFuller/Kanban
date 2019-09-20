<template>
  <div class="login pt-4">
    <h1 class="title">listKeeper</h1>
    <form v-if="loginForm" @submit.prevent="loginUser">
      <input type="email" v-model="creds.email" placeholder="email" />
      <input type="password" v-model="creds.password" placeholder="password" />
      <button class="btn m-2" type="submit">Login</button>
    </form>
    <form v-else @submit.prevent="register">
      <input type="text" v-model="newUser.name" placeholder="name" />
      <input type="email" v-model="newUser.email" placeholder="email" />
      <input type="password" v-model="newUser.password" placeholder="password" />
      <button class="btn m-2" type="submit">Create Account</button>
    </form>
    <div class="action text" @click="loginForm = !loginForm">
      <p v-if="loginForm">No account? Click here to Register</p>
      <p v-else>Already have an account? Click here to Login</p>
    </div>
  </div>
</template>

<script>
import router from "@/router.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style>
.action {
  cursor: pointer;
}
.login {
  min-height: 100vh;
  background: linear-gradient(
      135deg,
      #c5afbc 21px,
      #f5f5f5 22px,
      #f5f5f5 24px,
      transparent 24px,
      transparent 67px,
      #f5f5f5 67px,
      #f5f5f5 69px,
      transparent 69px
    ),
    linear-gradient(
        225deg,
        #c5afbc 21px,
        #f5f5f5 22px,
        #f5f5f5 24px,
        transparent 24px,
        transparent 67px,
        #f5f5f5 67px,
        #f5f5f5 69px,
        transparent 69px
      )
      0 64px;
  background-color: #c5afbc;
  background-size: 64px 128px;
}
.text {
  color: #424242;
  font-weight: bold;
  font-size: 30px;
  text-shadow: 1px 1px black;
}
.title {
  color: #424242;
  font-weight: bold;
  font-size: 60px;
  text-shadow: 1px 1px black;
}
</style>