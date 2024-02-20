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
            Data Pengeluaran
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
                    <i class="bi bi-plus-circle-fill"></i> Buat Pengeluaran
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
                      <th scope="col">Kebutuhan</th>
                      <th scope="col">Jumlah Pengeluaranr</th>
                      <th scope="col">Deskripsi Pengeluaran</th>
                      <th scope="col">Bukti Pengeluaran</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in pengeluarans" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <div class="row">
                          <div class="col-6">
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-toggle="modal"
                              data-target="#editPengeluaran"
                              @click="
                                setDataUpdate(
                                  item.keperluan_pengeluaran,
                                  item.jumlah_pengeluaran,
                                  item.deskripsi_pengeluaran,
                                  item.id
                                )
                              "
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          <div class="col-6">
                            <button
                              @click="konfirmasi(item.id, item.keperluan_pengeluaran)"
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ item.keperluan_pengeluaran }}</td>
                      <td>{{ item.jumlah_pengeluaran }}</td>
                      <td>{{ item.deskripsi_pengeluaran }}</td>
                      <td>
                         <img
                        :src="
                          'https://backend.keuanganfpti.com/storage/' +
                          item.bukti_pengeluaran
                        "
                        alt="Bukti Transfer"
                        style="max-width: 100px; cursor: pointer"
                        @click="detailBukti(item.bukti_pengeluaran)"
                      />
                      </td>
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

  <!-- modal tambah pengeluaran -->
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
            Buat Event Baru
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
              <label for="kebu" class="form-label">Kebutuhan</label>
              <input
                type="text"
                class="form-control"
                id="kebu"
                placeholder="masukkan kebutuhan"
                v-model="formPengeluaran.keperluan_pengeluaran"
              />
            </div>
            <div class="mb-3">
              <label for="jumpe" class="form-label">Jumlah Pengeluaran</label>
              <input
                type="text"
                class="form-control"
                id="jumpe"
                placeholder="masukkan jumlah pengeluaran"
                v-model="formPengeluaran.jumlah_pengeluaran"
              />
            </div>

             <div class="mb-3">
              <label for="mission" class="form-label">Events</label>
              <select class="form-select" v-model="selectedEvent">
                <option value="" disabled selected>Pilih Event</option>
                <option
                  v-for="dataEvent in events"
                  :key="dataEvent.id"
                  :value="dataEvent.id"
                >
                  {{ dataEvent.nama_event }} - {{dataEvent.tanggal_event}}
                </option>
              </select>
            </div>

             <div class="mb-3">
              <label for="bukti_pengeluaran" class="form-label">Bukti Pengeluaran</label>
              <input
                type="file"
                class="form-control"
                id="bukti_pengeluaran"
                @change="handleFileUpload"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formPengeluaran.deskripsi_pengeluaran"
              ></textarea>
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createPengeluaran">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah pengeluaran -->

  <!-- modal edit pengeluaran -->
  <div
    class="modal fade"
    id="editPengeluaran"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editPengeluaranLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editPengeluaranLabel">Edit Pengeluaran</h5>
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
              <label for="ketua" class="form-label">Kebutuhan</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan kebutuhan"
                v-model="formUpdatePengeluaran.keperluan_pengeluaran"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Pengeluaran</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan jumlah pengeluaran"
                v-model="formUpdatePengeluaran.jumlah_pengeluaran"
              />
            </div>

             <div class="mb-3">
              <label for="mission" class="form-label">Events</label>
              <select class="form-select" v-model="selectedEvent">
                <option value="" disabled selected>Pilih Event</option>
                <option
                  v-for="dataEvent in events"
                  :key="dataEvent.id"
                  :value="dataEvent.id"
                >
                  {{ dataEvent.nama_event }} - {{dataEvent.tanggal_event}}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formUpdatePengeluaran.deskripsi_pengeluaran"
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
  <!-- end modal edit pengeluarab -->

    <!-- modal detail bukti -->
   <div
    class="modal fade"
    id="detailBukti"
    tabindex="-1"
    role="dialog"
    aria-labelledby="detailBuktiLabel"
    aria-hidden="true"
    ref="detailBuktiRef"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addInvoiceModalLabel">
            Detail Bukti Keterangan
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
          <img
            :src="
              'https://backend.keuanganfpti.com/storage/' +
              path
            "
            alt="Bukti Transfer"
            style="width: 100%"
          />
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal detail bukti -->
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
      pengeluarans: [],
      events:[],
      formPengeluaran: {
        keperluan_pengeluaran: "",
        jumlah_pengeluaran: "",
        deskripsi_pengeluaran: "",
        bukti_pengeluaran:null
      },
      formUpdatePengeluaran: {
        keperluan_pengeluaran: "",
        jumlah_pengeluaran: "",
        deskripsi_pengeluaran: "",
        bukti_pengeluaran:null,
        id_pengeluaran:""
      },
      ready: false,
      selectedEvent:"",
      user_id:"",
      path:""
    };
  },
  methods: {
        detailBukti(bukti_pengeluaran) {
      this.path = bukti_pengeluaran;
      $("#detailBukti").modal("show");
    },
    setDataUpdate(keperluan_pengeluaran, jumlah_pengeluaran, deskripsi_pengeluaran, id) {
      this.formUpdatePengeluaran.keperluan_pengeluaran = keperluan_pengeluaran;
      this.formUpdatePengeluaran.jumlah_pengeluaran = jumlah_pengeluaran;
      this.formUpdatePengeluaran.deskripsi_pengeluaran = deskripsi_pengeluaran;
      this.formUpdatePengeluaran.id_pengeluaran = id;
    },
    createPengeluaran() {
      this.ready = false;
      const formData = new FormData();
      formData.append("keperluan_pengeluaran", this.formPengeluaran.keperluan_pengeluaran);
      formData.append("jumlah_pengeluaran", this.formPengeluaran.jumlah_pengeluaran);
      formData.append("deskripsi_pengeluaran", this.formPengeluaran.deskripsi_pengeluaran);
      formData.append("bukti_pengeluaran", this.formPengeluaran.bukti_pengeluaran);
      formData.append("id_event", this.selectedEvent);

      axios
        .post("https://backend.keuanganfpti.com/api/create-pengeluaran", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formPengeluaran = {
            pemberi_sponsor: "",
            dana_sponsor: "",
            deskripsi_sponsor: "",
            selectedEvent: "",
          };
          this.showAlert(
            "Request Success",
            "Sponsor berhasil buat",
            "success"
          );
          this.fetchDataSponsor();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Sponsor gagal buat", "error");
          console.error(error);
          this.ready = true;
        });
    },

    updatePengeluaran() {
      this.ready = false;
      const formData = new FormData();
    formData.append("keperluan_pengeluaran", this.formUpdatePengeluaran.keperluan_pengeluaran);
      formData.append("jumlah_pengeluaran", this.formUpdatePengeluaran.jumlah_pengeluaran);
      formData.append("deskripsi_pengeluaran", this.formUpdatePengeluaran.deskripsi_pengeluaran);
      formData.append("id_event", this.selectedEvent); 

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-pengeluaran/${this.formUpdatePengeluaran.id_pengeluaran}`,
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
            "Sponsor berhasil diupdate",
            "success"
          );
          this.fetchDataSponsor();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Sponsor gagal diupdate",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    deletePengeluaran(id) {
      this.ready = false;

      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-pengeluaran/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Sponsor berhasil dihapus",
            "success"
          );
          this.fetchDataSponsor();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Sponsor gagal dihapus",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    async fetchDataSponsor() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/list-pengeluaran`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.pengeluarans = response.data.data;
        this.ready = true;
      } catch (error) {
        this.ready = true;
        console.error(error);
      }
    },

        async fetchDataActiveEvent() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/event-active`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.events = response.data.data;
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
        $("#editPengeluaran").modal("hide");
      });
    },

    konfirmasi(id, keperluan_pengeluaran) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus pengeluaran ${keperluan_pengeluaran}?`,
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
    handleFileUpload(event) {
      // Menggunakan FormData untuk mengirim file
      this.formPengeluaran.bukti_pengeluaran = event.target.files[0];
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
        this.fetchDataSponsor();
        this.fetchDataActiveEvent();
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
