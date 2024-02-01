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
          <h1 class="h3 mb-0 text-gray-800 text-center">Aspirasi</h1>

          <button 
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#addAspirasi"
          >
          Create Aspirasi</button>

          <!-- Search Bar -->
          <input type="text" v-model="searchQuery" class="form-control mt-3 mb-3" placeholder="Cari berdasarkan nama atau isi" />

          <!-- Card Container -->
          <div class="row mt-4">
            <div class="col-md-4" v-for="(aspirasi, index) in filteredAspirasi" :key="index">
              <Card
                :nama="aspirasi.name"
                :tanggal="aspirasi.name"
                :isi="aspirasi.aspirasi"
                :iconLike="aspirasi.iconLike"
                :jumlahLike="aspirasi.jumlah_like"
              />
            </div>
          </div>
          <!-- End of Card Container -->
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

  <!-- modal tambah aspirasi -->
  <div
    class="modal fade"
    id="addAspirasi"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addAspirasiLabel"
    aria-hidden="true"
    ref="addAspirasiRef"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addAspirasiLabel">Create Aspirasi</h5>
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
          <!-- Form Create Aspirasi -->
          <form @submit.prevent="createAspirasi">
            <div class="form-group">
              <label for="rekeningPengirim">Name</label>
              <input
                type="text"
                class="form-control"
                id="rekeningPengirim"
                v-model="formAspirasi.nama"
              />
            </div>
            <div class="form-group">
              <label for="rekeningPengirim">Class</label>
              <input
                type="text"
                class="form-control"
                id="rekeningPengirim"
                v-model="formAspirasi.kelas"
              />
            </div>
            <div class="form-group">
              <label for="rekeningPengirim">Aspirasi</label>
              <input
                type="text"
                class="form-control"
                id="rekeningPengirim"
                v-model="formAspirasi.aspirasi"
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah aspirasi -->
</template>

<script>
import axios from 'axios';
import Sidebar from "../../components/voter/Sidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "../../components/general/Footer.vue";
import Card from "../../components/general/AspirasiCard.vue";
import { ref, computed } from "vue";

export default {
  components: {
    Sidebar,
    Navbar,
    Footer,
    Card,
  },
  data() {
    return {
      formAspirasi:{
        nama:"",
        kelas:"",
        aspirasi:""

      },
      aspirasis:[],
      dummyAspirasi: [
        {
          nama: "Bagus Untoro",
          tanggal: "2022-02-01",
          isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          iconLike: "heart", 
          jumlahLike: 10,
        },
        {
          nama: "Ifandani Wahyudi",
          tanggal: "2022-02-01",
          isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          iconLike: "heart", 
          jumlahLike: 10,
        },
        {
          nama: "Rosi Arif Mulyadi",
          tanggal: "2022-02-01",
          isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          iconLike: "heart", 
          jumlahLike: 10,
        },
        {
          nama: "Moh. Wariansyah",
          tanggal: "2022-02-01",
          isi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          iconLike: "heart", 
          jumlahLike: 10,
        },
      ],
      searchQuery: "",
      sidebarClass: "",
    };
  },
  computed: {
    filteredAspirasi() {
      const query = this.searchQuery.toLowerCase();
      return this.aspirasis.filter(aspirasi => {
        return aspirasi.name.toLowerCase().includes(query) || aspirasi.aspirasi.toLowerCase().includes(query);
      });
    }
  },
  created() {
    this.getAspirasi();
  },
  methods: {
    createAspirasi() {
      // this.ready = false;
      const formData = new FormData();
      formData.append("name", this.formAspirasi.nama);
      formData.append("kelas", this.formAspirasi.kelas);
      formData.append("aspirasi", this.formAspirasi.aspirasi);
      formData.append("user_id", '1');

      axios
        .post(
          "http://localhost:8000/api/create-aspirasi",
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
          // Lakukan sesuatu setelah berhasil menambah invoice
          this.newInvoice = {
            nomor_rekening: "",
            jumlah_transfer: "",
            bukti_transfer: null,
          };
          this.fetchDataInvoice();
          this.showAlert();
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async getAspirasi(){
       try {
        const response = await axios.get(
          `http://localhost:8000/api/list-aspirasi`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.aspirasis = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    toggleSidebar() {
      this.sidebarClass = this.sidebarClass === "toggle-sidebar" ? "" : "toggle-sidebar";
    },
  },
};
</script>

<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
