import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import DashboardView from '@/views/DashboardView.vue'
import DetailPelayananView from '@/views/DetailPelayananView.vue'
import FormRegistrasi from "@/views/FormRegistrasi.vue";

const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('token')
  if (!token) {
    next('/')
  } else {
    next()
  }
}

const routes = [
  { path: '/', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignupView },

  { 
    path: '/dashboard', 
    name: 'Dashboard', 
    component: DashboardView, 
    beforeEnter: requireAuth
  },
  { 
    path: '/pelayanan/:kode', 
    name: 'DetailPelayanan', 
    component: DetailPelayananView,
    beforeEnter: requireAuth
  },
  { path: "/registrasi", 
    name: "Registrasi",
    component: FormRegistrasi,
    beforeEnter: requireAuth },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
