import ViewName from './views/view-name';
import auth from "./auth";
import { createRouter, createWebHashHistory } from "vue-router";

import Home from "./views/home-page";
import Profile from "./views/profile-page";
import Tasks from "./views/tasks-page";
import defaultLayout from "./layouts/side-nav-inner-toolbar.vue";
import simpleLayout from "./layouts/single-card";
import DataGrid from './views/data-grid.vue';
import DataGrid2 from './views/data-grid2.vue';
import ResultPage from './views/ResultPage.vue';
import FormPage from './views/FormPage.vue';
import ParentformPage from './views/parentform-page.vue';

function loadView(view) {
  return () => import (/* webpackChunkName: "login" */ `./views/${view}.vue`)
}

const router = new createRouter({
  routes: [
    {
      path: "/home",
      name: "home",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Home
    },
    {
      path: "/profile",
      name: "profile",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Profile
    },
    {
      path: "/tasks",
      name: "tasks",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: Tasks
    },
    {
      path: "/login-form",
      name: "login-form",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Sign In"
      },
      component: loadView("login-form")
    },
    {
      path: "/reset-password",
      name: "reset-password",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Reset Password",
        description: "Please enter the email address that you used to register, and we will send you a link to reset your password via Email."
      },
      component: loadView("reset-password-form")
    },
    {
      path: "/create-account",
      name: "create-account",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Sign Up"
      },
      component: loadView("create-account-form"),
    },
    {
      path: "/change-password/:recoveryCode",
      name: "change-password",
      meta: {
        requiresAuth: false,
        layout: simpleLayout,
        title: "Change Password"
      },
      component: loadView("change-password-form")
    },
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/recovery",
      redirect: "/home"
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/home"
    }, 
    {
      path: "/view-name",
      name: "view-name",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: ViewName
    },
    {
      path: "/data-grid",
      name: "data-grid",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: DataGrid
    },
    {
      path: "/data-grid2",
      name: "data-grid2",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: DataGrid2
    },
    {
      path: "/FormPage",
      name: "FormPage",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: FormPage
    },
    {
      path: "/ResultPage",
      name: "ResultPage",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: ResultPage
    },
    {
      path: "/parentform-page",
      name: "ParentFormPage",
      meta: {
        requiresAuth: true,
        layout: defaultLayout
      },
      component: ParentformPage
    }
  ],
  history: createWebHashHistory()
});

router.beforeEach((to, from, next) => {

  if (to.name === "login-form" && auth.loggedIn()) {
    next({ name: "home" });
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        name: "login-form",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
