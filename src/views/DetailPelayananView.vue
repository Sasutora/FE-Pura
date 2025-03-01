<template>
  <div class="container mt-5">
    <h2 class="mb-4">Detail Pelayanan</h2>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-else class="card p-4 shadow-sm">
      <div class="row">
        <!-- Foto Profil -->
        <div class="col-md-4 text-center">
          <img
            :src="`http://localhost:3000/${pelayanan.foto}`"
            alt="Foto Profil"
            class="img-fluid rounded"
          />
        </div>

        <!-- Informasi -->
        <div class="col-md-4">
          <p><strong>Kode:</strong> {{ pelayanan.kode }}</p>
          <p><strong>Nama Lengkap:</strong> {{ pelayanan.nama_lengkap }}</p>
        
          <p><strong>Kecamatan:</strong> {{ pelayanan.kecamatan }}</p>
          <p><strong>Kelurahan:</strong> {{ pelayanan.kelurahan }}</p>
          <p><strong>Kota:</strong> {{ pelayanan.kota }}</p>
          <p><strong>Provinsi:</strong> {{ pelayanan.provinsi }}</p>
          <p><strong>Jenis Kelamin:</strong> {{ pelayanan.jenis_kelamin }}</p>
          <p><strong>Pekerjaan:</strong> {{ pelayanan.pekerjaan }}</p>
          <p><strong>Golongan Darah:</strong> {{ pelayanan.golongan_darah }}</p>
          <p><strong>Tempat Lahir:</strong> {{ pelayanan.tempat_lahir }}</p>
          <p><strong>Tanggal Lahir:</strong> {{  new Date(pelayanan.jadwal).toLocaleDateString() }}</p>
          <p><strong>Kantor:</strong> {{ pelayanan.Kantor.nama }}</p>
          <p>
            <strong>Jadwal:</strong>
            {{ new Date(pelayanan.jadwal).toLocaleDateString() }}
          </p>
        </div>

              <!-- QR Code -->
      <div class="col-md-4">
        <h5>QR Code</h5>
        <img
          :src="`http://localhost:3000/${pelayanan.qr_code}`"
          alt="QR Code"
          class="img-thumbnail"
        />
        <button @click="downloadQRCode" class="btn btn-success mt-2">Unduh QR Code</button>

        <div class="mt-4">
        <router-link to="/dashboard" class="btn btn-primary">Kembali</router-link>
      </div>
      </div>
      </div>



   
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const pelayanan = ref(null);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const { kode } = route.params;
    const token = localStorage.getItem("token");

    if (!token) throw new Error("Token tidak tersedia. Harap login kembali.");

    const response = await axios.get(`http://localhost:3000/pelayanan/kode/${kode}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (response.data.status === "success") {
      pelayanan.value = response.data.content;
    } else {
      throw new Error("Data tidak ditemukan");
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});

const downloadQRCode = async () => {
  if (!pelayanan.value?.qr_code) {
    error.value = "QR Code tidak tersedia.";
    return;
  }

  try {
    const qrUrl = `http://localhost:3000/${pelayanan.value.qr_code}`;
    
    // Fetch gambar sebagai Blob
    const response = await fetch(qrUrl);
    const blob = await response.blob();
    
    // Buat URL Object
    const blobUrl = window.URL.createObjectURL(blob);
    
    // Buat link untuk unduh
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `QR_${pelayanan.value.kode}.png`; // Nama file saat diunduh
    
    document.body.appendChild(link);
    link.click();
    
    // Bersihkan URL Object setelah unduhan selesai
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(link);
  } catch (err) {
    error.value = "Gagal mengunduh QR Code.";
  }
};

</script>

<style scoped>
.img-fluid {
  max-width: 100%;
  height: auto;
}
.img-thumbnail {
  width: 200px;
  height: 200px;
  object-fit: contain;
}
</style>
