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
          <h1 class="h3 mb-0 text-gray-800 text-center mb-5">Data Piutang</h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn btn-warning me-2"
                    data-toggle="modal"
                    data-target="#addPiutang"
                  >
                    <i class="bi bi-plus-circle-fill"></i> Buat Piutang
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
                      <th scope="col">Peminjam</th>
                      <th scope="col">No Hp</th>
                      <th scope="col">Jumlah Pinjaman</th>
                      <th scope="col">Deskripsi Pinjaman</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in piutangs" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td>
                        <div class="row">
                          <div class="col-4">
                            <button
                              type="button"
                              class="btn btn-success"
                              @click="
                                konfirmasiBayar(item.id, item.pihak_peminjam)
                              "
                            >
                              <i class="bi bi-cash-coin"></i>
                            </button>
                          </div>
                          <div class="col-4">
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-toggle="modal"
                              data-target="#aditPiutang"
                              @click="
                                setDataUpdate(
                                  item.pihak_peminjam,
                                  item.no_hp,
                                  item.jumlah_pinjaman,
                                  item.deskripsi_pinjaman,
                                  item.id
                                )
                              "
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          <div class="col-4">
                            <button
                              @click="konfirmasi(item.id, item.pihak_peminjam)"
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ item.pihak_peminjam }}</td>
                      <td>{{ item.no_hp }}</td>
                      <td>{{ item.jumlah_pinjaman }}</td>
                      <td>{{ item.deskripsi_pinjaman }}</td>
                      <td>
                        <i
                          v-if="item.status == '0'"
                          class="bi bi-hourglass-split fs-5 text-danger"
                        ></i>
                        <i
                          v-if="item.status == '1'"
                          class="bi bi-check-circle-fill fs-5 text-success"
                        ></i>
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

  <!-- modal tambah transaksi -->
  <div
    class="modal fade"
    id="addPiutang"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addPiutangLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addPiutangLabel">Buat Piutang</h5>
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
              <label for="ketua" class="form-label">Peminjam</label>
              <input
                type="text"
                class="form-control"
                id="piJam"
                placeholder="masukkan pihak peminjam"
                v-model="formPiutang.pihak_peminjam"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Nomor HP</label>
              <input
                type="number"
                class="form-control"
                id="noHp"
                placeholder="masukkan nomor hp"
                v-model="formPiutang.no_hp"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Pinjaman</label>
              <input
                type="number"
                class="form-control"
                id="jumpin"
                placeholder="masukkan jumlah pinjaman"
                v-model="formPiutang.jumlah_pinjaman"
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
                  {{ dataEvent.nama_event }} - {{ dataEvent.tanggal_event }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label"
                >Deskripsi Pinjaman</label
              >
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="Masukkan deskripsi"
                v-model="formPiutang.deskripsi_pinjaman"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createPiutang">
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
    id="aditPiutang"
    tabindex="-1"
    role="dialog"
    aria-labelledby="aditPiutangLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="aditPiutangLabel">Edit Hutang</h5>
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
              <label for="ketua" class="form-label">Peminjam</label>
              <input
                type="text"
                class="form-control"
                id="piJam"
                placeholder="masukkan pihak peminjam"
                v-model="formUpdatePiutang.pihak_peminjam"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Nomor HP</label>
              <input
                type="number"
                class="form-control"
                id="noHp"
                placeholder="masukkan nomor hp"
                v-model="formUpdatePiutang.no_hp"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Pinjaman</label>
              <input
                type="number"
                class="form-control"
                id="jumpin"
                placeholder="masukkan jumlah pinjaman"
                v-model="formUpdatePiutang.jumlah_pinjaman"
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
                  {{ dataEvent.nama_event }} - {{ dataEvent.tanggal_event }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label"
                >Deskripsi Pinjaman</label
              >
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="Masukkan deskripsi"
                v-model="formUpdatePiutang.deskripsi_pinjaman"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updatePiutang">
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
      piutangs: [],
      events: [],
      formPiutang: {
        pihak_peminjam: "",
        no_hp: "",
        jumlah_pinjaman: "",
        deskripsi_pinjaman: "",
      },
      formUpdatePiutang: {
        pihak_peminjam: "",
        no_hp: "",
        jumlah_pinjaman: "",
        deskripsi_pinjaman: "",
        id_piutang: "",
      },
      ready: false,
      selectedEvent: "",
      user_id: "",
    };
  },
  methods: {
    setDataUpdate(
      pihak_peminjam,
      no_hp,
      jumlah_pinjaman,
      deskripsi_pinjaman,
      id
    ) {
      this.formUpdatePiutang.pihak_peminjam = pihak_peminjam;
      this.formUpdatePiutang.no_hp = no_hp;
      this.formUpdatePiutang.jumlah_pinjaman = jumlah_pinjaman;
      this.formUpdatePiutang.deskripsi_pinjaman = deskripsi_pinjaman;
      this.formUpdatePiutang.id_piutang = id;
    },
    createPiutang() {
      this.ready = false;
      const formData = new FormData();
      formData.append("pihak_peminjam", this.formPiutang.pihak_peminjam);
      formData.append("no_hp", this.formPiutang.no_hp);
      formData.append("jumlah_pinjaman", this.formPiutang.jumlah_pinjaman);
      formData.append(
        "deskripsi_pinjaman",
        this.formPiutang.deskripsi_pinjaman
      );
      formData.append("id_event", this.selectedEvent);

      axios
        .post("https://backend.keuanganfpti.com/api/create-piutang", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formPiutang = {
            keperluan_hutang: "",
            jumlah_hutang: "",
            tanggal_hutang: "",
            tanggal_jatuh_tempo: "",
            deskripsi_hutang: "",
            selectedEvent: "",
          };
          this.showAlert("Request Success", "Piutang berhasil buat", "success");
          this.fetchDataPiutang();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Piutang gagal buat", "error");
          console.error(error);
          this.ready = true;
        });
    },

    updatePiutang() {
      this.ready = false;
      const formData = new FormData();
      formData.append("pihak_peminjam", this.formUpdatePiutang.pihak_peminjam);
      formData.append("no_hp", this.formUpdatePiutang.no_hp);
      formData.append(
        "jumlah_pinjaman",
        this.formUpdatePiutang.jumlah_pinjaman
      );
      formData.append(
        "deskripsi_pinjaman",
        this.formUpdatePiutang.deskripsi_pinjaman
      );
      formData.append("id_event", this.selectedEvent);

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-piutang/${this.formUpdatePiutang.id_piutang}`,
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
            "Piutang berhasil diupdate",
            "success"
          );
          this.fetchDataPiutang();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Piutang gagal diupdate", "error");
          console.error(error);
          this.ready = true;
        });
    },

    deletePiutang(id) {
      this.ready = false;

      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-piutang/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Piutang berhasil dihapus",
            "success"
          );
          this.fetchDataPiutang();
        })
        .catch((error) => {
          this.showAlert("Request Failed", "Piutang gagal dihapus", "error");
          console.error(error);
          this.ready = true;
        });
    },

    async fetchDataPiutang() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/list-piutang`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.piutangs = response.data.data;
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

    async bayarPiutang(id) {
      try {
        const response = await axios.post(
          `https://backend.keuanganfpti.com/api/bayar-piutang/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.showAlert(
          "Request Success",
          "Piutang berhasil dibayarkan",
          "success"
        );
        this.ready = true;
      } catch (error) {
        console.error(error);
        this.showAlert(
          "Request Failed",
          "Gagal membayar hutang, pastikan saldo anda cukup",
          "error"
        );
      }
    },

    showAlert(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon,
      }).then(() => {
        $("#addPiutang").modal("hide");
        $("#aditPiutang").modal("hide");
      });
    },

    konfirmasiBayar(id, pihak_peminjam) {
      Swal.fire({
        title: `Apakah Anda yakin ${pihak_peminjam} sudah membayar hutang?`,
        text: "Saldo anda akan dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fac800",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bayar",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.bayarPiutang(id);
        }
      });
    },

    konfirmasi(id, pihak_peminjam) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus piutang ${pihak_peminjam}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletePiutang(id);
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
        this.fetchDataPiutang();
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
