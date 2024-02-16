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
            Data Sponsor
          </h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn btn-warning me-2"
                    data-toggle="modal"
                    data-target="#addSponsor"
                  >
                    <i class="bi bi-plus-circle-fill"></i> Buat Sponsor
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
                      <th scope="col">Pemberi Sponsor</th>
                      <th scope="col">Dana Sponsor</th>
                      <th scope="col">Deskripsi Sponsor</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in sponsors" :key="item.id">
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
                                  item.pemberi_sponsor,
                                  item.dana_sponsor,
                                  item.deskripsi_sponsor,
                                  item.id
                                )
                              "
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          <div class="col-6">
                            <button
                              @click="konfirmasi(item.id, item.pemberi_sponsor)"
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ item.pemberi_sponsor }}</td>
                      <td>{{ formatCurrency(item.dana_sponsor) }}</td>
                      <td>{{ item.deskripsi_sponsor }}</td>
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

  <!-- modal tambah pemasukan -->
  <div
    class="modal fade"
    id="addSponsor"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addSponsorLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addSponsorLabel">
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
              <label for="ketua" class="form-label">Pemberi Sponsor</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan pemberi sponsor"
                v-model="formSponsor.pemberi_sponsor"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Dana Sponsor</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan dana sponsor"
                v-model="formSponsor.dana_sponsor"
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
                v-model="formSponsor.deskripsi_sponsor"
              ></textarea>
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createSponsor">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah pemasukan -->

  <!-- modal edit pemasukan -->
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
              <label for="ketua" class="form-label">Pemberi Sponsor</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan pemberi sponsor"
                v-model="formUpdateSponsor.pemberi_sponsor"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Dana Sponsor</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan dana sponsor"
                v-model="formUpdateSponsor.dana_sponsor"
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
                v-model="formUpdateSponsor.deskripsi_sponsor"
              ></textarea>
            </div>
            
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updateSponsor">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal edit pemasukan -->
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
      sponsors: [],
      events:[],
      formSponsor: {
        pemberi_sponsor: "",
        dana_sponsor: "",
        deskripsi_sponsor: "",
      },
      formUpdateSponsor: {
        pemberi_sponsor: "",
        dana_sponsor: "",
        deskripsi_sponsor: "",
        id_sponsor:""
      },
      ready: false,
      selectedEvent:"",
      user_id:""
    };
  },
  methods: {
    setDataUpdate(pemberi_sponsor, dana_sponsor, deskripsi_sponsor, id) {
      this.formUpdateSponsor.pemberi_sponsor = pemberi_sponsor;
      this.formUpdateSponsor.dana_sponsor = dana_sponsor;
      this.formUpdateSponsor.deskripsi_sponsor = deskripsi_sponsor;
      this.formUpdateSponsor.id_sponsor = id;
    },
    createSponsor() {
      this.ready = false;
      const formData = new FormData();
      formData.append("pemberi_sponsor", this.formSponsor.pemberi_sponsor);
      formData.append("dana_sponsor", this.formSponsor.dana_sponsor);
      formData.append("deskripsi_sponsor", this.formSponsor.deskripsi_sponsor);
      formData.append("id_event", this.selectedEvent);

      axios
        .post("https://backend.keuanganfpti.com/api/create-sponsor", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formSponsor = {
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

    updateSponsor() {
      this.ready = false;
      const formData = new FormData();
      formData.append("pemberi_sponsor", this.formUpdateSponsor.pemberi_sponsor);
      formData.append("dana_sponsor", this.formUpdateSponsor.dana_sponsor);
      formData.append("deskripsi_sponsor", this.formUpdateSponsor.deskripsi_sponsor);
      formData.append("id_event", this.selectedEvent);

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-sponsor/${this.formUpdateSponsor.id_sponsor}`,
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

    deleteSponsor(id) {
      this.ready = false;

      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-sponsor/${id}`, {
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
          `https://backend.keuanganfpti.com/api/list-sponsor`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.sponsors = response.data.data;
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
        $("#addSponsor").modal("hide");
        $("#editTransaksi").modal("hide");
      });
    },

    konfirmasi(id, pemberi_sponsor) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus sponsor dari ${pemberi_sponsor}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteSponsor(id);
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
