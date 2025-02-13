import { createMemoryHistory, createRouter } from "vue-router";
import SignUpView from "../view/SignUpView.vue";
import LoginView from "../view/LoginView.vue";
import Home from "../view/Home/index.vue"

const routes = [
  { path: "/", component: SignUpView },
  {
    path: "/login",
    component: LoginView,
  },
  {
    path: "/home",
    component: Home,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;
