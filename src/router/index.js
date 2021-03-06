import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Invoice from "../views/Invoice.vue"
import Login from "../views/Login.vue"
import Register from "../views/Register.vue"

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/invoice/:invoiceId",
    name: "Invoice",
    component: Invoice
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
