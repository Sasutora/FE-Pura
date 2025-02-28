<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow-lg" style="width: 350px">
      <h2 class="text-center mb-3">Login</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            v-model="email"
            class="form-control"
            placeholder="Email"
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary w-100" :disabled="loading">
          {{ loading ? "Logging in..." : "Login" }}
        </button>
        <p v-if="errorMessage" class="text-danger text-center mt-2">
          {{ errorMessage }}
        </p>
      </form>

      <!-- Tambahkan Tombol Sign Up -->
      <p class="text-center mt-3">
        Belum punya akun?
        <a href="#" @click.prevent="goToSignup" class="text-primary">Daftar</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);
const router = useRouter();

async function handleLogin() {
  errorMessage.value = "";
  loading.value = true;

  try {
    const response = await axios.post("http://localhost:3000/auth/login", {
      email: email.value,
      password: password.value,
    });

    localStorage.setItem("token", response.data.token);
    router.push("/dashboard");
  } catch (error) {
    console.log("Error:", error); // Tambahkan ini untuk debugging
    if (error.response) {
      console.log("Error Response Data:", error.response.data);
      console.log("Error Status:", error.response.status);
      if (error.response.status === 401) {
        errorMessage.value = "Email atau password salah!";
      } else {
        errorMessage.value = `Error ${error.response.status}: ${
          error.response.data.message || "Terjadi kesalahan"
        }`;
      }
    } else {
      errorMessage.value = "Tidak dapat terhubung ke server.";
    }
  } finally {
    loading.value = false;
  }
}

// Fungsi untuk navigasi ke halaman Sign Up
function goToSignup() {
  router.push("/signup");
}
</script>
