<script setup>
import Sidebar from "../../components/user/Sidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "../../components/general/Footer.vue";
import { ref } from "vue";

const sidebarToggled = ref(false);
const sidebarClass = ref("");

const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value;
  sidebarClass.value = sidebarToggled.value ? "toggle-sidebar" : "";
};
</script>
<template>
  <div id="wrapper">
    <Sidebar :class="sidebarClass" />

    <!-- Content Wrapper -->
    <div id="content-wrapper" class="d-flex flex-column">
      <!-- Main Content -->
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <div class="container-fluid mt-4">
          <h1 class="h3 mb-0 text-gray-800 text-center mb-5">Buku Besar</h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <!-- Tabel hasil filter -->
              <div class="table-responsive">
                <p class="text-center" v-if="!ready">Loading...</p>
                <DataTable class="display table table-striped" v-if="ready">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 50px">No</th>
                      <th scope="col">Akun</th>
                      <th scope="col">Total Debit</th>
                      <th scope="col">Total Kredit</th>
                      <th scope="col">Total Hutang</th>
                      <th scope="col">Saldo Sekarang</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in bukuBesar" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>{{ item.name }}</td>
                      <td>{{ formatCurrency(item.total_pengeluaran) }}</td>
                      <td>{{ formatCurrency(item.total_pemasukan) }}</td>
                      <td>{{ formatCurrency(item.total_hutang) }}</td>
                      <td>{{ formatCurrency(item.saldo) }}</td>
                    </tr>
                  </tbody>
                </DataTable>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <Footer />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>
</template>
<script>
import axios from "axios";
import Swal from "sweetalert2";
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";

DataTable.use(DataTablesCore);

export default {
  data() {
    return {
      bukuBesar: [],
      formMapel: {
        nama_mapel: "",
      },
      formUpdateMapel: {
        nama_mapel: "",
      },
      ready: false,
      mapel_id: "",
    };
  },
  methods: {
    createMapel() {
      this.ready = false;
      const formData = new FormData();
      formData.append("nama_mapel", this.formMapel.nama_mapel);

      axios
        .post("http://localhost:8000/api/create-mapel", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formMapel = {
            nama_mapel: "",
          };
          this.showAlert(
            "Request Success",
            "Matapelajaran berhasil buat",
            "success"
          );
          this.fetchDataBukuBesar();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Matapelajaran gagal buat", "error");
          console.error(error);
          this.ready = true;
        });
    },

    updateMapel() {
      this.ready = false;
      const formData = new FormData();
      formData.append("nama_mapel", this.formUpdateMapel.nama_mapel);

      axios
        .post(
          `http://localhost:8000/api/update-mapel/${this.mapel_id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.formMapel = {
            nama_mapel: "",
          };
          this.showAlert(
            "Request Success",
            "Matapelajaran berhasil diupdate",
            "success"
          );
          this.fetchDataBukuBesar();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Matapelajaran gagal diupdate",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    deleteMapel(id) {
      this.ready = false;

      axios
        .delete(`http://localhost:8000/api/delete-mapel/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Matapelajaran berhasil dihapus",
            "success"
          );
          this.fetchDataBukuBesar();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Matapelajaran gagal dihapus",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    async fetchDataBukuBesar() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/buku-besar`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.bukuBesar = response.data.data;
        this.ready = true;
      } catch (error) {
        this.ready = true;
        console.error(error);
      }
    },

    showAlert(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon,
      }).then(() => {
        $("#addMapel").modal("hide");
        $("#editMapel").modal("hide");
      });
    },

    konfirmasi(id, nama_mapel) {
      Swal.fire({
        title: `Apakah Anda yakin ingin menghapus matapelajaran ${nama_mapel}?`,
        text: "Anda akan keluar dari akun ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteMapel(id);
        }
      });
    },

    setMapelId(id, nama_mapel) {
      this.mapel_id = id;
      this.formUpdateMapel.nama_mapel = nama_mapel;
    },
  },
  computed: {
    // Metode komputasi untuk mengonversi jumlah menjadi format mata uang Rupiah
    formatCurrency: function () {
      return function (value) {
        if (!value) return "Rp 0,00";

        // Mengonversi nilai ke dalam format Rupiah
        let formattedValue = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(value);

        return formattedValue;
      };
    },
  },
  created() {
    const token = sessionStorage.getItem("token"); // Ambil token dari local storage

    if (token) {
      try {
        const [headerBase64, signatureBase64] = token.split(".");
        const header = JSON.parse(atob(headerBase64));
        const signature = atob(signatureBase64);

        const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Mendekode bagian payload dari token JWT
        const expTimestamp = tokenPayload.exp;

        const expDate = new Date(expTimestamp * 1000); // Konversi Unix Timestamp ke JavaScript Date

        console.log("Waktu Kedaluwarsa (UTC):", expDate.toUTCString()); // Tampilkan waktu kedaluwarsa dalam format UTC

        if (new Date() > expDate) {
          console.log("Keluar");
          sessionStorage.removeItem("token");
          this.$router.push("/");
        } else {
          console.log("Aman");
        }
        const level = tokenPayload.level; // Ambil level pengguna dari payload
        this.user_id = tokenPayload.id;
        console.log("ini idddd:", this.user_id);
        if (level !== "0") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
        }
        // success
        this.fetchDataBukuBesar();
        // akhir
      } catch (error) {
        console.error("Error decoding token:", error);
        this.$router.push("/"); // Tindakan jika terjadi kesalahan dekode
      }
    } else {
      this.$router.push("/"); // Tindakan jika token tidak ada (pengguna belum terautentikasi)
    }
  },
};
</script>


<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
