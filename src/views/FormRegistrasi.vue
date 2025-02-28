<template>
    <div class="container p-5">
      <h2>Form Registrasi</h2>
      <form @submit.prevent="submitForm" enctype="multipart/form-data">
        <div class="mb-3">
          <label class="form-label">Nama Lengkap</label>
          <input type="text" v-model="form.nama_lengkap" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Kecamatan</label>
          <input type="text" v-model="form.kecamatan" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Kelurahan</label>
          <input type="text" v-model="form.kelurahan" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Kota</label>
          <input type="text" v-model="form.kota" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Provinsi</label>
          <input type="text" v-model="form.provinsi" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Jenis Kelamin</label>
          <select v-model="form.jenis_kelamin" class="form-control">
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Pekerjaan</label>
          <input type="text" v-model="form.pekerjaan" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Golongan Darah</label>
          <select v-model="form.golongan_darah" class="form-control">
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="AB">AB</option>
            <option value="O">O</option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Tempat Lahir</label>
          <input type="text" v-model="form.tempat_lahir" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Tanggal Lahir</label>
          <input type="date" v-model="form.tanggal_lahir" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Kantor</label>
          <select v-model="form.id_kantor" class="form-control">
            <option v-for="kantor in daftarKantor" :key="kantor.id" :value="kantor.id">
              {{ kantor.nama }}
            </option>
          </select>
        </div>
  
        <div class="mb-3">
          <label class="form-label">Jadwal</label>
          <input type="date" v-model="form.jadwal" class="form-control" required />
        </div>
  
        <div class="mb-3">
          <label class="form-label">Upload Foto</label>
          <input type="file" @change="handleFileUpload" class="form-control" accept="image/*" required />
        </div>
  
        <button type="submit" class="btn btn-primary">Submit</button>
        <button type="button" class="btn btn-secondary ms-2" @click="kembali">Kembali</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  const router = useRouter();
  const form = ref({
    nama_lengkap: "",
    kecamatan: "",
    kelurahan: "",
    kota: "",
    provinsi: "",
    jenis_kelamin: "",
    pekerjaan: "",
    golongan_darah: "",
    tempat_lahir: "",
    tanggal_lahir: "",
    id_kantor: "",
    jadwal: "",
  });
  const daftarKantor = ref([]);
  const selectedFile = ref(null);
  
  onMounted(async () => {
    try {
        const token = localStorage.getItem("token"); 
        if (!token) {
            console.error("Token tidak ditemukan!");
            return;
        }

        const response = await axios.get("http://localhost:3000/pelayanan/kantor", {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
        });

  
            daftarKantor.value = response.data.content; 
      
    } catch (error) {
        console.error("Error saat mengambil daftar kantor:", error);
    }
  });
  
  const handleFileUpload = (event) => {
    selectedFile.value = event.target.files[0];
  };
  
  const submitForm = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token tidak ditemukan!");
        return;
      }
  
      const formData = new FormData();
      formData.append("file", selectedFile.value);
      formData.append("data", JSON.stringify(form.value));
  
      const response = await axios.post("http://localhost:3000/pelayanan/daftar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.data.status === "success") {
        alert("Registrasi berhasil!");
        router.push("/dashboard");
      } else {
        console.error("Gagal registrasi:", response.data);
      }
    } catch (error) {
      console.error("Error saat registrasi:", error.message);
    }
  };
  
  const kembali = () => {
    router.push("/dashboard");
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 500px;
  }
  </style>
  