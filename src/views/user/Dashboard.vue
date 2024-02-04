<script setup>
import Sidebar from "../../components/user/Sidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "../../components/general/Footer.vue";
import Slider from "../../components/general/Carousel.vue";
import Card from "../../components/general/Card.vue";
// import LineChart from "../../components/LineChart.vue";
// import PolarChart from "../../components/PolarChart.vue";
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
          <h1 class="h3 mb-0 text-gray-800 text-center">Dashboard</h1>
          <div class="row mt-3">
            <div class="col-sm-6">
              <Slider />
            </div>
            <div class="col-sm-3">
              <Card
                color="success"
                header="Pemasukan"
                :value="formatCurrency(totalPenerimaan)"
                icon="fa-calendar"
              />
            </div>
            <div class="col-sm-3">
              <Card
                color="danger"
                header="Pengeluaran"
                :value="formatCurrency(totalPengiriman)"
                icon="fa-calendar"
              />
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="warning"
                header="Saldo"
                :value="formatCurrency(saldoSaatIni)"
                icon="fa-calendar"
              />
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="primary"
                header="Lunas"
                :value="formatCurrency(hutangSudahDibayar)"
                icon="fa-clipboard-list"
              />
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="info"
                header="Hutang"
                :value="formatCurrency(hutangBelumDibayar)"
                icon="fa-clipboard-list"
              />
            </div>

            <!-- petugas -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-warning shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="text-xs font-weight-bold text-warning text-uppercase mb-1"
                      >
                        Akun
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        4
                      </div>
                    </div>
                    <div class="col-auto">
                      <i class="fas fa-solid fa-users fa-2x text-gray-300"></i>
                      <!-- <i class="fas fa-comments fa-2x text-gray-300"></i> -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      hutangBelumDibayar: 0,
      hutangSudahDibayar: 0,
      saldoSaatIni: 100000,
      totalPenerimaan: 0,
      totalPengiriman: 0,
      ready: false,
    };
  },
  methods: {
    async fetchDataReport() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/report-keuangan/1`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.hutangBelumDibayar= response.data.hutangBelumDibayar,
        this.hutangSudahDibayar= response.data.hutangSudahDibayar,
        this.saldoSaatIni= response.data.saldoSaatIni,
        this.totalPenerimaan= response.data.totalPenerimaan,
        this.totalPengiriman= response.data.totalPengiriman,
      
        this.ready = true;
      } catch (error) {
        console.error(error);
      }
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
        if (level !== "0") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
        }
        // success
        this.fetchDataReport();
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
