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
          <h1 class="h3 mb-0 text-gray-800 text-center">Candidates</h1>

          <div class="row mt-5">
            <CardCandidate
              v-for="candidate in candidates"
              :key="candidate.id"
              :candidate="candidate.name"
              :vision="candidate.vision"
              :mission="candidate.mission"
              :image="candidate.image"
            />
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

<script setup>
import axios from 'axios';
import { ref } from "vue";
import Sidebar from "../../components/voter/Sidebar.vue";
import Navbar from "../../components/general/Navbar.vue";
import Footer from "../../components/general/Footer.vue";
import CardCandidate from "../../components/general/CardCandidate.vue";

const sidebarToggled = ref(false);
const sidebarClass = ref("");

const toggleSidebar = () => {
  sidebarToggled.value = !sidebarToggled.value;
  sidebarClass.value = sidebarToggled.value ? "toggle-sidebar" : "";
};

const candidates = ref([]);

const fetchDataCandidate = async () => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/list-candidate`,
      {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      }
    );
    candidates.value = response.data.data;
  } catch (error) {
    console.error(error);
  }
};

fetchDataCandidate();
</script>

<style>
#content-wrapper {
  min-height: 780px !important;
}
</style>
