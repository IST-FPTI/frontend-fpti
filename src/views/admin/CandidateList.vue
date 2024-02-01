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
          <h1 class="h3 mb-0 text-gray-800 text-center mb-5">Candidate List</h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn blueButton me-2"
                    data-toggle="modal"
                    data-target="#addCandidate"
                  >
                    <i class="bi bi-plus"></i> Candidate
                  </button>
                </div>
                <div class="col-6">
                  <TimeVote />
                </div>
              </div>
              <div class="table-responsive">
                <p class="text-center" v-if="!ready">Loading...</p>
                <DataTable class="display table table-striped" v-if="ready">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col" style="width: 130px">Aksi</th>
                      <th scope="col">Nama Paslon</th>
                      <th scope="col">Visi</th>
                      <th scope="col" class="width:100px">Misi</th>
                      <th scope="col">Gambar</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in candidates" :key="item.id">
                      <td>{{ index + 1 }}</td>
                      <td class="pe-5">
                        <div class="row">
                          <div class="col-4">
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-toggle="modal"
                              data-target="#editCandidate"
                              @click="dataNote(1)"
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          <div class="col-4">
                            <button
                              @click="
                                getDetail(
                                  item.name,
                                  item.vision,
                                  item.mission,
                                  item.image
                                )
                              "
                              class="btn btn-primary customDetail"
                              data-toggle="modal"
                              data-target="#detailCandidate"
                            >
                              <i class="bi bi-info-circle-fill"></i>
                            </button>
                          </div>
                          <div class="col-4">
                            <button
                              @click="confirmDelete(1)"
                              class="btn btn-danger customDetail"
                            >
                              <i class="bi bi-trash3"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>{{ item.name }}</td>
                      <td>{{ item.vision }}</td>
                      <td class="scrollable-td">{{ item.mission }}</td>
                      <td>
                        <img
                          :src="
                            'http://localhost:8000/storage/image/' + item.image
                          "
                          width="100"
                          alt="gambar paslon"
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

  <!-- modal tambah kandidat -->
  <div
    class="modal fade"
    id="addCandidate"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addCandidateLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addCandidateLabel">Buat Kandidat</h5>
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
              <label for="ketua" class="form-label">Nama Paslon</label>
              <input
                type="text"
                class="form-control"
                id="ketua"
                placeholder="masukkan nama paslon"
                v-model="formCandidate.name"
              />
            </div>
            <div class="mb-3">
              <label for="vision" class="form-label">Visi</label>
              <input
                type="text"
                class="form-control"
                id="vision"
                placeholder="masukkan visi"
                v-model="formCandidate.vision"
                required
              />
            </div>
            <div class="mb-3">
              <label for="mission" class="form-label">Misi</label>
              <input
                type="text"
                class="form-control"
                id="mission"
                placeholder="masukkan misi"
                v-model="formCandidate.mission"
                required
              />
            </div>
            <div class="mb-3">
              <label for="mission" class="form-label">Gambar Paslon</label>
              <input
                type="file"
                class="form-control"
                id="mission"
                placeholder="masukkan gambar"
                @change="handleFileUpload"
                required
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createCandidate">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah kandidat -->

  <!-- modal detail -->
  <div
    class="modal fade"
    id="detailCandidate"
    tabindex="-1"
    role="dialog"
    aria-labelledby="detailCandidateLabel"
    aria-hidden="true"
    ref="detailCandidateRef"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addInvoiceModalLabel">
            Detil Kandidat
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
        <div class="modal-body text-center">
          <img
            :src="
              'http://localhost:8000/storage/image/' + dataDetail.image
            "
            alt="Bukti Transfer"
            style="width: 50%;"
          />
          <h3>{{dataDetail.name}}</h3>
          <h3>{{dataDetail.vision}}</h3>
          <h3>{{dataDetail.mission}}</h3>
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
  <!-- end modal detail -->
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
      candidates: [],
      formCandidate: {
        name: "",
        vision: "",
        mission: "",
        image: null,
      },
      ready: false,
      dataDetail: {
        name: "",
        vision: "",
        mission: "",
        image: "null",
      },
    };
  },
  methods: {
    async fetchDataCandidate() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/list-candidate`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.candidates = response.data.data;

        this.ready = true;
      } catch (error) {
        console.error(error);
      }
    },

    createCandidate() {
      // this.ready = false;
      const formData = new FormData();
      formData.append("name", this.formCandidate.name);
      formData.append("vision", this.formCandidate.vision);
      formData.append("mission", this.formCandidate.mission);
      formData.append("image", this.formCandidate.image);

      axios
        .post("http://localhost:8000/api/create-candidate", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          // Lakukan sesuatu setelah berhasil menambah invoice
          this.formCandidate = {
            name: "",
            vision: "",
            mission: "",
            image: null,
          };
          this.fetchDataCandidate();
          this.showAlert();
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getDetail(name, vision, mission, image) {
      this.dataDetail = {
        name: name,
        vision: vision,
        mission: mission,
        image: image,
      };
    },

    showAlert() {
      this.$swal({
        title: "Request Success",
        text: "Data Berhasil Dikirim!",
        icon: "success", // Atau gunakan icon lain sesuai kebutuhan
      }).then(() => {
        $("#addCandidate").modal("hide");
      });
    },

    handleFileUpload(event) {
      // Menggunakan FormData untuk mengirim file
      this.formCandidate.image = event.target.files[0];
    },
  },
  created() {
    this.fetchDataCandidate();
  },
};
</script>


<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
