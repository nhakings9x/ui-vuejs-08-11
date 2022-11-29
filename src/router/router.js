import { createRouter, createWebHistory } from "vue-router";

import Employees from "../components/page/Employees.vue";
import Deposits from "../components/page/Deposits.vue";

const routes = [
    { path: "/", component: Employees },
    { path: "/deposits", component: Deposits },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
