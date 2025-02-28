<template>
  <div
    class="container d-flex justify-content-center align-items-center vh-100"
  >
    <div class="card p-4 shadow-lg" style="width: 350px">
      <h2 class="text-center mb-3">Daftar</h2>
      <form @submit.prevent="handleSignup">
        <div class="mb-3">
          <label class="form-label">Nama</label>
          <input type="text" v-model="nama" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input type="email" v-model="email" class="form-control" required />
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            type="password"
            v-model="password"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-success w-100" :disabled="loading">
          {{ loading ? "Mendaftar..." : "Daftar" }}
        </button>
        <p v-if="errorMessage" class="text-danger text-center mt-2">
          {{ errorMessage }}
        </p>
        <p v-if="successMessage" class="text-success text-center mt-2">
          {{ successMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const nama = ref("");
const email = ref("");
const password = ref("");
const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);
const router = useRouter();

async function handleSignup() {
  errorMessage.value = "";
  successMessage.value = "";
  loading.value = true;

  try {
    await axios.post("http://localhost:3000/auth/signup", {
      nama: nama.value,
      email: email.value,
      password: password.value,
    });
    successMessage.value = "Pendaftaran berhasil! Silakan login.";
    setTimeout(() => router.push("/"), 2000);
  } catch (error) {
    if (error.response && error.response.status === 400) {
      errorMessage.value = "Email sudah terdaftar!";
    } else {
      errorMessage.value = "Terjadi kesalahan, coba lagi nanti.";
    }
  } finally {
    loading.value = false;
  }
}
</script>
