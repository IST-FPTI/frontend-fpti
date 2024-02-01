<script setup>
import Sidebar from "../../components/admin/Sidebar.vue";
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
          <h1 class="h3 mb-0 text-gray-800 text-center mb-5">Voter List</h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-4">
                  <button
                    class="btn blueButton me-2"
                    data-toggle="modal"
                    data-target="#addVoter"
                  >
                    <i class="bi bi-plus"></i> Voter
                  </button>
                </div>
                <div class="col-8"></div>
              </div>
              <div class="table-responsive">
                <DataTable class="display table table-striped">
                  <thead>
                    <tr>
                      <th scope="col">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Bagus</td>
                      <td>bagus@gmail.com</td>
                      <td>Not verify</td>
                      <td class="pe-5">
                        <div class="row">
                          <div class="col-6">
                            <button
                              type="button"
                              class="btn btn-warning"
                              data-toggle="modal"
                              data-target="#editVoter"
                              @click="dataNote(1)"
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </div>
                          <div class="col-6">
                            <div class="col-4">
                              <button
                                @click="confirmDelete(1)"
                                class="btn btn-danger customDetail"
                              >
                                <i class="bi bi-trash3"></i>
                              </button>
                            </div>
                          </div>
                        </div>
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

  <div
    class="modal fade"
    id="addVoter"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addVoterLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addVoterLabel">Add Voter</h5>
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
              <label for="file" class="form-label">File</label>
              <input
                type="file"
                class="form-control"
                id="file"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updateNote">
            Kirim
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net";

DataTable.use(DataTablesCore);

export default {
  data() {
    return {
      voter: [],
    };
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
