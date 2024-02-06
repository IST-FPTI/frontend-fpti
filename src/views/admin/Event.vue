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
            Data Event
          </h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn btn-warning me-2"
                    data-toggle="modal"
                    data-target="#addEvent"
                  >
                    <i class="bi bi-plus-circle-fill"></i> Buat Event
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
                      <th scope="col">Nama Event</th>
                      <th scope="col">Tanggal Dimulai</th>
                      <th scope="col">Deskripsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in events" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <div class="row">
                          <div class="col-4">
                             <router-link :to="{ name: 'admin-report', params: { eventId: item.id } }">
      <button>Ke Laporan Event</button>
    </router-link>
                          </div>
                          <div class="col-4">
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-toggle="modal"
                              data-target="#editTransaksi"
                              @click="
                                setDataUpdate(
                                  item.nama_event,
                                  item.tanggal_event,
                                  item.deskripsi_event,
                                  item.id
                                )
                              "
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          <div class="col-4">
                            <button
                              @click="konfirmasi(item.id, item.nama_event)"
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ item.nama_event }}</td>
                      <td>{{ item.tanggal_event }}</td>
                      <td>{{ item.deskripsi_event }}</td>
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
    id="addEvent"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addEventLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addEventLabel">
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
              <label for="ketua" class="form-label">Nama Event</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan nominal pengeluaran"
                v-model="formEvent.nama_event"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Event</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formEvent.tanggal_event"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Keterangan</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="Masukkan keterangan"
                v-model="formEvent.deskripsi_event"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createEvent">
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
              <label for="ketua" class="form-label">Nama Event</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan nominal pengeluaran"
                v-model="formUpdateEvent.nama_event"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Event</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formUpdateEvent.tanggal_event"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Keterangan</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="Masukkan keterangan"
                v-model="formUpdateEvent.deskripsi_event"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updateEvent">
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
      events: [],
      formEvent: {
        nama_event: "",
        tanggal_event: "",
        deskripsi_event: "",
      },
      formUpdateEvent: {
        nama_event: "",
        tanggal_event: "",
        deskripsi_event: "",
        id_event:""
      },
      ready: false,
      user_id:""
    };
  },
  methods: {
    setDataUpdate(nama_event, tanggal_event, deskripsi_event, id) {
      this.formUpdateEvent.nama_event = nama_event;
      this.formUpdateEvent.tanggal_event = tanggal_event;
      this.formUpdateEvent.deskripsi_event = deskripsi_event;
      this.formUpdateEvent.id_event = id;
    },
    createEvent() {
      this.ready = false;
      const formData = new FormData();
      formData.append("nama_event", this.formEvent.nama_event);
      formData.append("tanggal_event", this.formEvent.tanggal_event);
      formData.append("deskripsi_event", this.formEvent.deskripsi_event);
      formData.append("id_user", this.user_id);

      axios
        .post("http://localhost:8000/api/create-event", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formEvent = {
            jumlah_transaksi: "",
            deskripsi: "",
            tgl_transaksi: "",
            selectedPenerima: "",
          };
          this.showAlert(
            "Request Success",
            "Event berhasil buat",
            "success"
          );
          this.fetchDataEvents();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Event gagal buat", "error");
          console.error(error);
          this.ready = true;
        });
    },

    updateEvent() {
      this.ready = false;
      const formData = new FormData();
      formData.append("nama_event", this.formUpdateEvent.nama_event);
      formData.append("tanggal_event", this.formUpdateEvent.tanggal_event);
      formData.append("deskripsi_event", this.formUpdateEvent.deskripsi_event);
      formData.append("id_user", this.user_id);

      axios
        .post(
          `http://localhost:8000/api/update-event/${this.formUpdateEvent.id_event}`,
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
            "Event berhasil diupdate",
            "success"
          );
          this.fetchDataEvents();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Event gagal diupdate",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    deleteEvent(id) {
      this.ready = false;

      axios
        .delete(`http://localhost:8000/api/delete-event/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Event berhasil dihapus",
            "success"
          );
          this.fetchDataEvents();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Event gagal dihapus",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    async fetchDataEvents() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/list-event`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.events = response.data.data;
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
        $("#addEvent").modal("hide");
        $("#editTransaksi").modal("hide");
      });
    },

    konfirmasi(id, nama_event) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus event ${nama_event}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEvent(id);
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
        this.fetchDataEvents();
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
