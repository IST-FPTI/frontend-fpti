<script setup>
import Sidebar from "../../components/admin/Sidebar.vue";
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
                color="primary"
                header="Pemasukan"
                :value="formatCurrency(jumlah_pemasukan)"
                icon="fa-calendar"
              />
            </div>
            <div class="col-sm-3">
              <Card
                color="danger"
                header="Pengeluaran"
                :value="formatCurrency(jumlah_pengeluaran)"
                icon="fa-calendar"
              />
            </div>
          </div>

          <div class="row mt-4">
            

            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="primary"
                header="Hutang Lunas"
                :value="formatCurrency(hutang_lunas)"
                icon="fa-clipboard-list"
              />
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="danger"
                header="Hutang Belum Lunas"
                :value="formatCurrency(hutang_belum_lunas)"
                icon="fa-clipboard-list"
              />
            </div>

             <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="success"
                header="Piutang Lunas"
                :value="formatCurrency(piutang_lunas)"
                icon="fa-calendar"
              />
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="warning"
                header="Piutang Belum Lunas"
                :value="formatCurrency(piutang_belum_lunas)"
                icon="fa-clipboard-list"
              />
            </div>

           

          </div>
          <div class="row mt-4">
            

            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="success"
                header="Sisa Saldo"
                :value="formatCurrency(saldo)"
                icon="fa-clipboard-list"
              />
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="primary"
                header="Event Selesai"
                :value="event_selesai"
                icon="fa-clipboard-list"
              />
            </div>

             <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="warning"
                header="Event Belum Selesai"
                :value="event_belum_selesai"
                icon="fa-calendar"
              />
            </div>

            <!-- <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="warning"
                header="Piutang Belum Lunas"
                :value="formatCurrency(piutang_belum_lunas)"
                icon="fa-clipboard-list"
              />
            </div> -->

           

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
      jumlah_pengeluaran:0,
      jumlah_pemasukan:0,
      hutang_lunas:0,
      hutang_belum_lunas:0,
      piutang_lunas:0,
      piutang_belum_lunas:0,
      saldo:0,
      event_selesai:0,
      event_belum_selesai:0,
      ready: false,
      user_id:""
    };
  },
  methods: {
    async fetchDataReport() {
      try {
        const response = await axios.get(
          // `http://127.0.0.1:8000/api/darsboard-data`,
          `https://backend.keuanganfpti.com/api/darsboard-data`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        (this.jumlah_pemasukan = response.data.total_pemasukan),
          (this.jumlah_pengeluaran = response.data.total_pengeluaran),
          (this.hutang_lunas = response.data.hutang_sudah_dibayar),
          (this.hutang_belum_lunas = response.data.hutang_belum_dibayar),
          (this.piutang_lunas = response.data.piutang_sudah_dibayar),
          (this.piutang_belum_lunas = response.data.piutang_belum_dibayar),
          (this.saldo = response.data.saldo),
          (this.event_selesai = response.data.event_selesai),
          (this.event_belum_selesai = response.data.event_belum_selesai),
          (this.ready = true);

          //  'saldo' => $saldo,
            // 'hutang_belum_dibayar' => $hutangBelumDibayar,
            // 'hutang_sudah_dibayar' => $hutangSudahDibayar,
            // 'piutang_belum_dibayar' => $piutangBelumDibayar,
            // 'piutang_sudah_dibayar' => $piutangSudahDibayar,
            // 'event_selesai' => $eventSelesai,
            // 'event_belum_selesai' => $eventBelumSelesai,
            // 'total_pengeluaran' => $totalPengeluaran,
            // 'total_pemasukan' => $totalPemasukan,
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
        if (level !== "1") {
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
