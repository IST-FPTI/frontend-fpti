<script setup>
import Sidebar from "../../components/voter/Sidebar.vue";
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
                header="Already Voted"
                value="238"
                icon="fa-calendar"
              />
            </div>
            <div class="col-sm-3">
              <Card
                color="danger"
                header="Not Voted Yet"
                value="371"
                icon="fa-calendar"
              />
            </div>
          </div>

          <div class="row mt-4">
            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="warning"
                header="Voting Deadline"
                value="00:09:32:21"
                icon="fa-calendar"
              />
            </div>

            <div class="col-xl-3 col-md-6 mb-4">
              <Card
                color="primary"
                header="Votes Received"
                value="60%"
                icon="fa-clipboard-list"
              />
            </div>

            <!-- signature -->
            <div class="col-xl-3 col-md-6 mb-4">
              <div class="card border-left-info shadow h-100 py-2">
                <div class="card-body">
                  <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                      <div
                        class="text-xs font-weight-bold text-info text-uppercase mb-1"
                      >
                        Belum Ditandatangani
                      </div>
                      <div class="row no-gutters align-items-center">
                        <div class="col-auto">
                          <div
                            class="h5 mb-0 mr-3 font-weight-bold text-gray-800"
                          >
                            50
                          </div>
                        </div>
                        <div class="col">
                          <div class="progress progress-sm mr-2">
                            <div
                              class="progress-bar bg-info"
                              role="progressbar"
                              style="width: 50%"
                              aria-valuenow="50"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-auto">
                      <i
                        class="fas fa-solid fa-check-double fa-2x text-gray-300"
                      ></i>
                    </div>
                  </div>
                </div>
              </div>
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
                        Pengguna
                      </div>
                      <div class="h5 mb-0 font-weight-bold text-gray-800">
                        {{ user }}
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
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
};
</script>


<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
