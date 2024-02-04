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
            List Pengeluaran
          </h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn btn-warning me-2"
                    data-toggle="modal"
                    data-target="#addPengeluaran"
                  >
                    <i class="bi bi-plus-circle-fill"></i> Pengeluaran
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
                      <th scope="col">Nominal</th>
                      <th scope="col">Keterangan</th>
                      <th scope="col">Tanggal Masuk</th>
                      <th scope="col">Penerima</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in pengeluaran" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <div class="row">
                          <div class="col-6">
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-toggle="modal"
                              data-target="#editTransaksi"
                              @click="
                                setDataUpdate(
                                  item.jumlah_transaksi,
                                  item.deskripsi,
                                  item.tgl_transaksi,
                                  item.id_penerima,
                                  item.id
                                )
                              "
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          <div class="col-6">
                            <button
                              @click="konfirmasi(item.id, item.nama_penerima)"
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ formatCurrency(item.jumlah_transaksi) }}</td>
                      <td>{{ item.deskripsi }}</td>
                      <td>{{ item.tgl_transaksi }}</td>
                      <td>{{ item.nama_penerima }}</td>
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

  <!-- modal tambah transaksi -->
  <div
    class="modal fade"
    id="addPengeluaran"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addPengeluaranLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addPengeluaranLabel">
            Masukkan Pengeluaran
          </h5>
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
              <label for="ketua" class="form-label">Jumlah Pengeluaran</label>
              <input
                type="number"
                class="form-control"
                id="mapel"
                placeholder="masukkan nominal pengeluaran"
                v-model="formPengeluaran.jumlah_transaksi"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Transaksi</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formPengeluaran.tgl_transaksi"
              />
            </div>

            <div class="mb-3">
              <label for="mission" class="form-label">Penerima</label>
              <select class="form-select" v-model="selectedPenerima">
                <option value="" disabled selected>Pilih Penerima</option>
                <option
                  v-for="dataPenerima in penerimas"
                  :key="dataPenerima.id"
                  :value="dataPenerima.id"
                >
                  {{ dataPenerima.name }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Keterangan</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="Masukkan keterangan"
                v-model="formPengeluaran.deskripsi"
              ></textarea>
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
  <!-- end modal tambah transaksi -->

  <!-- modal edit transaksi -->
  <div
    class="modal fade"
    id="editTransaksi"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editTransaksiLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editTransaksiLabel">Edit Pengeluaran</h5>
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
              <label for="ketua" class="form-label">Jumlah Pengeluaran</label>
              <input
                type="number"
                class="form-control"
                id="mapel"
                placeholder="masukkan nominal pengeluaran"
                v-model="formUpdateTransaksi.jumlah_transaksi"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Transaksi</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formUpdateTransaksi.tgl_transaksi"
              />
            </div>

            <div class="mb-3">
              <label for="mission" class="form-label">Penerima</label>
              <select class="form-select" v-model="selectedPenerima">
                <option value="" disabled selected>Pilih Penerima</option>
                <option
                  v-for="dataPenerima in penerimas"
                  :key="dataPenerima.id"
                  :value="dataPenerima.id"
                >
                  {{ dataPenerima.name }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Keterangan</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="Masukkan keterangan"
                v-model="formUpdateTransaksi.deskripsi"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updatePengeluaran">
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
      pengeluaran: [],
      penerimas: [],
      formPengeluaran: {
        jumlah_transaksi: "",
        deskripsi: "",
        tgl_transaksi: "",
        id_penerima: "",
      },
      formUpdateTransaksi: {
        jumlah_transaksi: "",
        deskripsi: "",
        tgl_transaksi: "",
        id_penerima: "",
        id:""
      },
      ready: false,
      selectedPenerima: "",
      user_id:""
    };
  },
  methods: {
    setDataUpdate(jumlah, deskripsi, tgl, penerima, id) {
      this.formUpdateTransaksi.jumlah_transaksi = jumlah;
      this.formUpdateTransaksi.deskripsi = deskripsi;
      this.formUpdateTransaksi.tgl_transaksi = tgl;
      this.formUpdateTransaksi.id = id;
      this.selectedPenerima = penerima;
    },
    createMapel() {
      this.ready = false;
      const formData = new FormData();
      formData.append(
        "jumlah_transaksi",
        this.formPengeluaran.jumlah_transaksi
      );
      formData.append("deskripsi", this.formPengeluaran.deskripsi);
      formData.append("tgl_transaksi", this.formPengeluaran.tgl_transaksi);
      formData.append("id_pengirim", this.user_id);
      formData.append("id_penerima", this.selectedPenerima);

      axios
        .post("http://localhost:8000/api/create-transaksi", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formPengeluaran = {
            jumlah_transaksi: "",
            deskripsi: "",
            tgl_transaksi: "",
            selectedPenerima: "",
          };
          this.showAlert(
            "Request Success",
            "Pengeluaran berhasil buat",
            "success"
          );
          this.fetchDataPengeluaran();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Pengeluaran gagal buat", "error");
          console.error(error);
          this.ready = true;
        });
    },

    updatePengeluaran() {
      this.ready = false;
      const formData = new FormData();
      formData.append(
        "jumlah_transaksi",
        this.formUpdateTransaksi.jumlah_transaksi
      );
      formData.append("deskripsi", this.formUpdateTransaksi.deskripsi);
      formData.append("tgl_transaksi", this.formUpdateTransaksi.tgl_transaksi);
      formData.append("id_pengirim", this.user_id);
      formData.append("id_penerima", this.selectedPenerima);

      axios
        .post(
          `http://localhost:8000/api/update-transaksi/${this.formUpdateTransaksi.id}`,
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
          this.showAlert(
            "Request Success",
            "Pengeluaran berhasil diupdate",
            "success"
          );
          this.fetchDataPengeluaran();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Pengeluaran gagal diupdate",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    deletePengeluaran(id) {
      this.ready = false;

      axios
        .delete(`http://localhost:8000/api/delete-transaksi/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Pengeluaran berhasil dihapus",
            "success"
          );
          this.fetchDataPengeluaran();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Pengeluaran gagal dihapus",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    async fetchDataPengeluaran() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/list-pengeluaran/${this.user_id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.pengeluaran = response.data.data;
        this.ready = true;
      } catch (error) {
        this.ready = true;
        console.error(error);
      }
    },

    async fetchDataPenerima() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/list-penerima`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.penerimas = response.data.data;
        console.log("test penerima:", this.penerimas);
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
        $("#addPengeluaran").modal("hide");
        $("#editTransaksi").modal("hide");
      });
    },

    konfirmasi(id, nama_penerima) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus pengeluaran ke ${nama_penerima}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletePengeluaran(id);
        }
      });
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
        if (level !== "1") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
        }
        // success
        this.fetchDataPengeluaran();
        this.fetchDataPenerima();
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
