<template>
  <div class="sidebar bg-dark text-white d-flex flex-column p-3 vh-100">
    <h4 class="text-center">Menu</h4>
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/dashboard" class="nav-link text-white"
          >Dashboard</router-link
        >
      </li>
    </ul>

    <!-- Tombol Logout di bawah -->
    <button class="btn btn-danger mt-auto" @click="logout">Logout</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function logout() {
  localStorage.removeItem("token");
  router.push("/");
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  display: flex;
}
.nav-link {
  padding: 10px;
  font-size: 18px;
}
.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}
</style>
