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
                    data-target="#addAudit"
                  >
                    <i class="bi bi-plus-circle-fill"></i> Audit
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
                      <th scope="col">Auditor</th>
                      <th scope="col">Tanggal Audit</th>
                      <th scope="col">Tahun Anggaran</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in audits"
                      :key="item.id"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <div class="row">
                          <div class="col-6">
                            <a
                              :href="
                                'http://127.0.0.1:8000/storage/audit_files/' +
                                item.file_audit
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
                                konfirmasiDelete(item.id, item.tahun_anggaran)
                              "
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ item.auditor }}</td>
                      <td>{{ item.tanggal_audit }}</td>
                      <td>{{ item.tahun_anggaran }}</td>
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
    id="addAudit"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addAuditLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addAuditLabel">Form Audit</h5>
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
              <label for="auditor" class="form-label">Auditor</label>
              <input
                type="text"
                class="form-control"
                id="auditor"
                placeholder="masukkan auditor"
                v-model="formAudit.auditor"
              />
            </div>
            <div class="mb-3">
              <label for="tanggalAudit" class="form-label">Tanggal Audit</label>
              <input
                type="date"
                class="form-control"
                id="tanggalAudit"
                v-model="formAudit.tanggal_audit"
              />
            </div>
            <div class="mb-3">
              <label for="tahunAnggaran" class="form-label">Tahun Anggaran</label>
              <input
                type="text"
                class="form-control"
                id="tahunAnggaran"
                placeholder="masukkan tahun anggaran"
                v-model="formAudit.tahun_anggaran"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">File Audit</label>
              <input
                type="file"
                class="form-control"
                id="mapel"
                @change="handleFileUpload"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createAudit">
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
      audits: [],
      anggarans: [],
      formAudit: {
        auditor: "",
        tanggal_audit: "",
        tahun_anggaran: "",
        file_audit: null,
      },
      ready: false,
      user_id: "",
      selectedAnggaran: "",
    };
  },
  methods: {
    createAudit() {
      this.ready = false;
      const formData = new FormData();
      formData.append("auditor", this.formAudit.auditor);
      formData.append("tanggal_audit", this.formAudit.tanggal_audit);
      formData.append("tahun_anggaran", this.formAudit.tahun_anggaran);
      formData.append("file_audit", this.formAudit.file_audit);

      axios
        .post("http://127.0.0.1:8000/api/create-audit", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Audit berhasil buat",
            "success"
          );
          this.fetchDataAudit();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Audit gagal buat",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },

    deleteAudit(id) {
      this.ready = false;
      axios
        .delete(`http://127.0.0.1:8000/api/delete-audit/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlert(
            "Request Success",
            "Audit berhasil dihapus",
            "success"
          );
          this.fetchDataAudit();
        })
        .catch((error) => {
          this.showAlert(
            "Request Failed",
            "Audit gagal dihapus",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },
    async fetchDataAudit() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/list-audit`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.audits = response.data.data;
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
        $("#addAudit").modal("hide");
        $("#editRealisasi").modal("hide");
      });
    },
    konfirmasiDelete(id, tahun_anggaran) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus laporan audit tahun ${tahun_anggaran}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteAudit(id);
        }
      });
    },
    handleFileUpload(event) {
      // Menggunakan FormData untuk mengirim file
      this.formAudit.file_audit = event.target.files[0];
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
        this.fetchDataAudit();
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
