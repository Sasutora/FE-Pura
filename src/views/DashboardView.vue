<template>
  <div class="d-flex">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Konten Dashboard -->
    <div class="container p-5">
      <h2>Daftar Pelayanan</h2>

      <!-- Tombol Tambah Registrasi -->
      <button class="btn btn-success mb-3" @click="keFormRegistrasi">
        Tambah Registrasi
      </button>

      <!-- Tabel Data Pelayanan -->
      <table class="table mt-4">
        <thead class="table-dark">
          <tr>
            <th>No</th>
            <th>Kode</th>
            <th>Nama</th>
            <th>Kantor</th>
            <th>Jadwal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dataPelayanan" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.kode }}</td>
            <td>{{ item.nama_lengkap }}</td>
            <td>{{ item.Kantor.nama }}</td>
            <td>{{ formatDate(item.jadwal) }}</td>
            <td>
              <button class="btn btn-primary" @click="lihatDetail(item.kode)">
                Lihat Detail
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Sidebar from "@/components/Sidebar.vue";

const router = useRouter();
const dataPelayanan = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token tidak ditemukan!");
      return;
    }

    const response = await axios.get("http://localhost:3000/pelayanan/user", {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.status === "success") {
      dataPelayanan.value = response.data.content;
    } else {
      console.error("Gagal mengambil data:", response.data);
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
});

const lihatDetail = (kode) => {
  router.push(`/pelayanan/${kode}`);
};

const keFormRegistrasi = () => {
  router.push("/registrasi");
};

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
</script>
