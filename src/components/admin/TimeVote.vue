<template>
  <button
    type="button"
    class="btn btn-warning float-end"
    data-toggle="modal"
    data-target="#setTime"
  >
   <i class="bi bi-calendar-date"></i> Setting Time
  </button>

  <div
    class="modal fade"
    id="setTime"
    tabindex="-1"
    role="dialog"
    aria-labelledby="setTimeLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="setTimeLabel">Setting Time Vote</h5>
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
              <label for="start" class="form-label">Start Time</label>
              <input type="datetime-local" class="form-control" id="start" v-model="formTime.start_time" />
            </div>
            <div class="mb-3">
              <label for="end" class="form-label">End Time</label>
              <input type="datetime-local" class="form-control" id="end" v-model="formTime.end_time"/>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="settingTime">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
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
      formTime: {
        start_time: "",
        end_time: "",
      },
      ready: false,
    };
  },
  methods: {
    async fetchDataTime() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/time-vote`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.formTime = {
          start_time : response.data.data[0].start_time,
          end_time : response.data.data[0].end_time
        }

        console.log('test time:',response.data.data[0].start_time);

        this.ready = true;
      } catch (error) {
        console.error(error);
      }
    },

    settingTime() {
      // this.ready = false;
      const formData = new FormData();
      formData.append("start_time", this.formTime.start_time);
      formData.append("end_time", this.formTime.end_time);

      axios
        .post("http://localhost:8000/api/setting-time", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          // Lakukan sesuatu setelah berhasil menambah invoice
          this.formTime = {
            start_time: "",
            end_time: "",
          };
          this.fetchDataTime();
          this.showAlert();
        })
        .catch((error) => {
          console.error(error);
        });
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

  },
  created() {
    this.fetchDataTime();
  },
};
</script>