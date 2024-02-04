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
          <h1 class="h3 mb-0 text-gray-800 text-center mb-5">List Dana External</h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn btn-warning me-2"
                    data-toggle="modal"
                    data-target="#addPemasukan"
                  >
                    <i class="bi bi-plus-circle-fill"></i> Dana
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
                      <th scope="col">Jumlah Dana</th>
                      <th scope="col">Tanggal Masuk</th>
                      <th scope="col">Keterangan</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in pemasukan" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <div class="row">
                          <div class="col-6">
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-toggle="modal"
                              data-target="#editPemasukan"
                              @click="
                                setDataUpdate(
                                  item.pemberi_dana,
                                  item.jumlah_transaksi,
                                  item.tgl_transaksi,
                                  item.deskripsi,
                                  item.id
                                )
                              "
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          <div class="col-6">
                            <button
                              @click="
                                konfirmasiDelete(item.id, item.pemberi_dana)
                              "
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ item.pemberi_dana }}</td>
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
    id="addPemasukan"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addPemasukanLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addPemasukanLabel">
            Form Pemasukan
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
              <label for="ketua" class="form-label">Sumber Dana</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan sumber dana"
                v-model="formPemasukan.pemberi_dana"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Pengeluaran</label>
              <input
                type="number"
                class="form-control"
                id="mapel"
                placeholder="masukkan nominal pengeluaran"
                v-model="formPemasukan.jumlah_transaksi"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Transaksi</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formPemasukan.tgl_transaksi"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Keterangan</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="Masukkan keterangan"
                v-model="formPemasukan.deskripsi"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createPemasukan">
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
    id="editPemasukan"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editMapelLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editMapelLabel">Edit Pemasukan External</h5>
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
              <label for="ketua" class="form-label">Pemberi Dana</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan sumber dana"
                v-model="formUpdatePemasukan.pemberi_dana"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Pengeluaran</label>
              <input
                type="number"
                class="form-control"
                id="mapel"
                placeholder="masukkan nominal pengeluaran"
                v-model="formUpdatePemasukan.jumlah_transaksi"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Transaksi</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formUpdatePemasukan.tgl_transaksi"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Keterangan</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="Masukkan keterangan"
                v-model="formUpdatePemasukan.deskripsi"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updatePemasukan">
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
      formPemasukan: {
        pemberi_dana: "",
        jumlah_transaksi: "",
        deskripsi: "",
        tgl_transaksi: "",
        id_penerima: "",
      },
      formUpdatePemasukan: {
        pemberi_dana: "",
        jumlah_transaksi: "",
        deskripsi: "",
        tgl_transaksi: "",
        id:""
      },
      ready: false,
      user_id: "",
    };
  },
  methods: {
    setDataUpdate(pemberi_dana, jumlah_transaksi, tgl_transaksi, deskripsi, id) {
      this.formUpdatePemasukan.pemberi_dana = pemberi_dana;
      this.formUpdatePemasukan.jumlah_transaksi = jumlah_transaksi;
      this.formUpdatePemasukan.tgl_transaksi = tgl_transaksi;
      this.formUpdatePemasukan.deskripsi = deskripsi;
      this.formUpdatePemasukan.id = id;
    },
    createPemasukan() {
      this.ready = false;
      const formData = new FormData();
      formData.append("pemberi_dana", this.formPemasukan.pemberi_dana);
      formData.append("jumlah_transaksi", this.formPemasukan.jumlah_transaksi);
      formData.append("deskripsi", this.formPemasukan.deskripsi);
      formData.append("tgl_transaksi", this.formPemasukan.tgl_transaksi);
      formData.append("id_penerima", this.user_id);

      axios
        .post("https://backend.keuanganfpti.com/api/external-transaksi", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formPemasukan = {
            pemberi_dana: "",
            jumlah_transaksi: "",
            deskripsi: "",
            tgl_transaksi: "",
            id_penerima: "",
          };
          this.showAlert(
            "Request Success",
            "Pemasukan berhasil buat",
            "success"
          );
          this.fetchDataPemasukan();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Pemasukan gagal buat", "error");
          console.error(error);
          this.ready = true;
        });
    },

    updatePemasukan() {
      this.ready = false;
      const formData = new FormData();
      formData.append("pemberi_dana", this.formUpdatePemasukan.pemberi_dana);
      formData.append("jumlah_transaksi", this.formUpdatePemasukan.jumlah_transaksi);
      formData.append("tgl_transaksi", this.formUpdatePemasukan.tgl_transaksi);
      formData.append("deskripsi", this.formUpdatePemasukan.deskripsi);
      formData.append("id_penerima", this.user_id);

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-external/${this.formUpdatePemasukan.id}`,
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
          this.formPemasukan = {
            nama_mapel: "",
          };
          this.showAlert(
            "Request Success",
            "Pemasukan berhasil diupdate",
            "success"
          );
          this.fetchDataPemasukan();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Pemasukan gagal diupdate",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    deletePemasukan(id) {
      this.ready = false;
      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-external/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Pemasukan berhasil dihapus",
            "success"
          );
          this.fetchDataPemasukan();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Pemasukan gagal dihapus",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    async fetchDataPemasukan() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/list-external/2`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.pemasukan = response.data.data;
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
        $("#addPemasukan").modal("hide");
        $("#editPemasukan").modal("hide");
      });
    },

    konfirmasiDelete(id, pemberi_hutang) {
      Swal.fire({
        title: `Apakah Anda yakin ingin menghapus Pemasukan ${pemberi_hutang}?`,
        text: "Anda akan keluar dari akun ini.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletePemasukan(id);
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
