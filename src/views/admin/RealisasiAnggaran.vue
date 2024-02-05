<script setup>
import Sidebar from "../../components/admin/Sidebar.vue";
import TimeVote from "../../components/admin/TimeVote.vue";
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

        <!-- Begin Page Content -->
        <div class="container-fluid mt-4">
          <h1 class="h3 mb-0 text-gray-800 text-center mb-5">
            Realisasi Anggaran
          </h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn btn-warning me-2"
                    data-toggle="modal"
                    data-target="#addRealisasi"
                  >
                    <i class="bi bi-plus-circle-fill"></i> Realisasi Anggaran
                  </button>
                </div>
                <div class="col-6"></div>
              </div>
              <div class="table-responsive">
                <p class="text-center" v-if="!ready">Loading...</p>
                <DataTable class="display table table-striped" v-if="ready">
                  <thead>
                    <tr>
                      <th scope="col" style="width: 50px">No</th>
                      <th scope="col">Aksi</th>
                      <th scope="col">Pemberi Dana</th>
                      <th scope="col">Jumlah</th>
                      <th scope="col">Tanggal</th>
                      <th scope="col">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in realisasiAnggaran"
                      :key="item.id"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <div class="row">
                          <div class="col-6">
                            <a
                              :href="
                                'https://backend.keuanganfpti.com/storage/realisasi_anggaran/' +
                                item.file_pdf
                              "
                              target="_blank"
                              class="btn btn-warning"
                            >
                              <i class="bi bi-eye-fill"></i>
                            </a>
                          </div>
                          <div class="col-6">
                            <button
                              @click="
                                konfirmasiDelete(item.id, item.pengirim_name)
                              "
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ item.pengirim_name }}</td>
                      <td>{{ formatCurrency(item.jumlah_transaksi) }}</td>
                      <td>{{ item.tgl_transaksi }}</td>
                      <td>{{ item.deskripsi }}</td>
                    </tr>
                  </tbody>
                </DataTable>
              </div>
            </div>
            <div class="col-1"></div>
          </div>
        </div>
        <!-- /.container-fluid -->
      </div>
      <!-- End of Main Content -->

      <!-- Footer -->
      <Footer />
      <!-- End of Footer -->
    </div>
    <!-- End of Content Wrapper -->
  </div>

  <!-- modal tambah jadwal -->
  <div
    class="modal fade"
    id="addRealisasi"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addRealisasiLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addRealisasiLabel">Form Pemasukan</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3">
              <label for="ketua" class="form-label">File Laporan</label>
              <input
                type="file"
                class="form-control"
                id="mapel"
                @change="handleFileUpload"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Anggaran</label>
              <select class="form-select" v-model="selectedAnggaran">
                <option value="" disabled selected>Pilih Anggaran</option>
                <option
                  v-for="dataAnggaran in anggarans"
                  :key="dataAnggaran.id"
                  :value="dataAnggaran.id"
                >
                  {{ dataAnggaran.pengirim_name }} -
                  {{ dataAnggaran.jumlah_transaksi }} -
                  {{ dataAnggaran.deskripsi }}
                </option>
              </select>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createRealisasi">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah jadwal -->
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
      realisasiAnggaran: [],
      anggarans: [],
      formRealisasi: {
        file_pdf: null,
        id_pemasukan: "",
      },
      ready: false,
      user_id: "",
      selectedAnggaran: "",
    };
  },
  methods: {
    createRealisasi() {
      this.ready = false;
      const formData = new FormData();
      formData.append("file_pdf", this.formRealisasi.file_pdf);
      formData.append("id_pemasukan", this.selectedAnggaran);

      axios
        .post("https://backend.keuanganfpti.com/api/create-realisasi-anggaran", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formRealisasi = {
            file_pdf: "",
            id_pemasukan: "",
          };
          this.showAlert(
            "Request Success",
            "Laporan realisasi berhasil buat",
            "success"
          );
          this.fetchDataRealisasiAnggaran();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Laporan realisasi gagal buat",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    deleteRealisasi(id) {
      this.ready = false;
      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-realisasi-anggaran/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Laporan realisasi berhasil dihapus",
            "success"
          );
          this.fetchDataRealisasiAnggaran();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Laporan realisasi gagal dihapus",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },
    async fetchDataRealisasiAnggaran() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/realisasi-anggaran`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.realisasiAnggaran = response.data.data;
        this.ready = true;
      } catch (error) {
        this.ready = true;
        console.error(error);
      }
    },
    async fetchDataAnggaran() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/my-anggaran/${this.user_id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.anggarans = response.data.data;
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
        $("#addRealisasi").modal("hide");
        $("#editRealisasi").modal("hide");
      });
    },
    konfirmasiDelete(id, pengirim_name) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus realisasi dana dari ${pengirim_name}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteRealisasi(id);
        }
      });
    },
    handleFileUpload(event) {
      // Menggunakan FormData untuk mengirim file
      this.formRealisasi.file_pdf = event.target.files[0];
    },
  },
  computed: {
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
        if (level !== "1") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
        }
        // success
        this.fetchDataRealisasiAnggaran();
        this.fetchDataAnggaran();
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
