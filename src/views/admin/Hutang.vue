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
            Data Hutang
          </h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn btn-warning me-2"
                    data-toggle="modal"
                    data-target="#addHutang"
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
                      <th scope="col">Keperluan</th>
                      <th scope="col">Jumlah Hutang</th>
                      <th scope="col">Deskripsi Hutang</th>
                      <th scope="col">Tanggal Hutang</th>
                      <th scope="col">Jatuh Tempo</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in hutangs" :key="item.id">
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
                                  item.keperluan_hutang,
                                  item.jumlah_hutang,
                                  item.deskripsi_hutang,
                                  item.tanggal_hutang,
                                  item.tanggal_jatuh_tempo,
                                  item.id
                                )
                              "
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          <div class="col-6">
                            <button
                              @click="konfirmasi(item.id, item.keperluan_hutang)"
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ item.keperluan_hutang }}</td>
                      <td>{{ item.jumlah_hutang }}</td>
                      <td>{{ item.deskripsi_hutang }}</td>
                      <td>{{ item.tanggal_hutang }}</td>
                      <td>{{ item.tanggal_jatuh_tempo }}</td>
                      <td>{{ item.status }}</td>
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
    id="addHutang"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addHutangLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addHutangLabel">
            Buat Hutang
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
              <label for="ketua" class="form-label">Kebutuhan</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan kebutuhan"
                v-model="formHutang.keperluan_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Hutang</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan jumlah pengeluaran"
                v-model="formHutang.jumlah_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Hutang</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formHutang.tanggal_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jatuh Tempo</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formHutang.tanggal_jatuh_tempo"
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
                placeholder="Masukkan deskripsi"
                v-model="formHutang.deskripsi_hutang"
              ></textarea>
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createHutang">
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
    id="editPengeluaran"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editPengeluaranLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editPengeluaranLabel">Edit Hutang</h5>
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
                v-model="formUpdateHutang.keperluan_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Hutang</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan jumlah pengeluaran"
                v-model="formUpdateHutang.jumlah_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Hutang</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formUpdateHutang.tanggal_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jatuh Tempo</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formUpdateHutang.tanggal_jatuh_tempo"
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
                placeholder="Masukkan deskripsi"
                v-model="formUpdateHutang.deskripsi_hutang"
              ></textarea>
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updateHutang">
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
      hutangs: [],
      events:[],
      formHutang: {
        keperluan_hutang: "",
        jumlah_hutang: "",
        deskripsi_hutang: "",
        tanggal_hutang:"",
        tanggal_jatuh_tempo:""
      },
      formUpdateHutang: {
        keperluan_hutang: "",
        jumlah_hutang: "",
        deskripsi_hutang: "",
        tanggal_hutang:"",
        tanggal_jatuh_tempo:"",
        id_hutang:""
      },
      ready: false,
      selectedEvent:"",
      user_id:""
    };
  },
  methods: {
    setDataUpdate(keperluan_hutang, jumlah_hutang, deskripsi_hutang,tanggal_hutang, tanggal_jatuh_tempo, id) {
      this.formUpdateHutang.keperluan_hutang = keperluan_hutang;
      this.formUpdateHutang.jumlah_hutang = jumlah_hutang;
      this.formUpdateHutang.deskripsi_hutang = deskripsi_hutang;
      this.formUpdateHutang.tanggal_hutang = tanggal_hutang;
      this.formUpdateHutang.tanggal_jatuh_tempo = tanggal_jatuh_tempo;
      this.formUpdateHutang.id_hutang = id;
    },
    createHutang() {
      this.ready = false;
      const formData = new FormData();
      formData.append("keperluan_hutang", this.formHutang.keperluan_hutang);
      formData.append("jumlah_hutang", this.formHutang.jumlah_hutang);
      formData.append("tanggal_hutang", this.formHutang.tanggal_hutang);
      formData.append("tanggal_jatuh_tempo", this.formHutang.tanggal_jatuh_tempo);
      formData.append("deskripsi_hutang", this.formHutang.deskripsi_pengeluaran);
      formData.append("id_event", this.selectedEvent);

      axios
        .post("https://backend.keuanganfpti.com/api/create-hutang", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formHutang = {
            keperluan_hutang: "",
            jumlah_hutang: "",
            tanggal_hutang: "",
            tanggal_jatuh_tempo: "",
            deskripsi_hutang: "",
            selectedEvent: "",
          };
          this.showAlert(
            "Request Success",
            "Hutang berhasil buat",
            "success"
          );
          this.fetchDataHutang();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Hutang gagal buat", "error");
          console.error(error);
          this.ready = true;
        });
    },

    updateHutang() {
      this.ready = false;
      const formData = new FormData();
    formData.append("keperluan_hutang", this.formUpdateHutang.keperluan_hutang);
      formData.append("jumlah_hutang", this.formUpdateHutang.jumlah_hutang);
      formData.append("deskripsi_hutang", this.formUpdateHutang.deskripsi_hutang);
      formData.append("tanggal_hutang", this.formUpdateHutang.tanggal_hutang);
      formData.append("tanggal_jatuh_tempo", this.formUpdateHutang.tanggal_jatuh_tempo);
      formData.append("id_event", this.selectedEvent); 

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-hutang/${this.formUpdateHutang.id_hutang}`,
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
            "Hutang berhasil diupdate",
            "success"
          );
          this.fetchDataHutang();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Hutang gagal diupdate",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    deleteHutang(id) {
      this.ready = false;

      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-hutang/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Hutang berhasil dihapus",
            "success"
          );
          this.fetchDataHutang();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Hutang gagal dihapus",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    async fetchDataHutang() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/list-hutang`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.hutangs = response.data.data;
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
        $("#addHutang").modal("hide");
        $("#editPengeluaran").modal("hide");
      });
    },

    konfirmasi(id, keperluan_hutang) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus hutang ${keperluan_hutang}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteHutang(id);
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
        this.fetchDataHutang();
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
