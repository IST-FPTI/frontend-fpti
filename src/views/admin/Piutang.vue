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
          <h1 class="h3 mb-0 text-gray-800 text-center mb-5">List Piutang</h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn btn-warning me-2"
                    data-toggle="modal"
                    data-target="#addMapel"
                  >
                    <i class="bi bi-plus-circle-fill"></i> Ajukan
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
                      <th scope="col">Nominal</th>
                      <th scope="col">Keterangan</th>
                      <th scope="col">Tanggal Masuk</th>
                      <th scope="col">Pengirim</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in pemasukan" :key="item.id">
                      <td>{{ index + 1 }}</td>
                     
                      <td>{{ item.jumlah_transaksi }}</td>
                      <td>{{ item.deskripsi }}</td>
                      <td>{{ item.tgl_transaksi }}</td>
                      <td>{{ item.nama_pengirim }}</td>
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
    id="addMapel"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addMapelLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addMapelLabel">Input Matapelajaran</h5>
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
              <label for="ketua" class="form-label">Matapelajaran</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan nama mapel"
                v-model="formMapel.nama_mapel"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createMapel">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah jadwal -->

  <!-- modal edit kelas -->
  <div
    class="modal fade"
    id="editMapel"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editMapelLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editMapelLabel">Edit Matapelajaran</h5>
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
              <label for="ketua" class="form-label">Matapelajaran</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan nama mapel"
                v-model="formUpdateMapel.nama_mapel"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updateMapel">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal edit kelas -->
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
      pemasukan: [],
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
          this.showAlert("Request Success", "Matapelajaran berhasil buat", "success");
          this.fetchDataPemasukan();
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
          this.fetchDataPemasukan();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Matapelajaran gagal diupdate", "error");
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
          this.fetchDataPemasukan();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Matapelajaran gagal dihapus", "error");
          console.error(error);
          this.ready = true;
        });
    },

    async fetchDataPemasukan() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/list-pemasukan/2`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.pemasukan = response.data.data;
        this.ready = true;
      } catch (error) {
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
        this.fetchDataPemasukan();
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
