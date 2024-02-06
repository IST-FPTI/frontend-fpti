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

    <div id="content-wrapper" class="d-flex flex-column">
      <div id="content">
        <Navbar @toggle-sidebar="toggleSidebar" />

        <div class="container-fluid">
          <div class="row">
            <div class="col-md-4">
              <div class="card">
                <img
                  :src="'https://10.11.10.243/backend/public/storage/profile/' + form.gambar"
                  alt=" gambarprofile"
                  class="card-img-top"
                />
                <!-- <p>test: {{form.gambar}}</p> -->
                <div class="card-body">
                  <h5 class="card-title">{{form.name}}</h5>
                  <button
                    type="button"
                    class="btn btn-warning"
                    data-toggle="modal"
                    data-target="#editProfileModal"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
            <div class="col-md-8">
              <h2 class="h3 mb-2 mt-2 text-gray-800 text-center">Profil Pengguna</h2>
              <ul class="list-group">
                <li class="list-group-item">
                  <strong>Nama:</strong> {{ form.name }}
                </li>
                <li class="list-group-item">
                  <strong>Alamat:</strong> {{ form.namaLokasi }}
                </li>
                <li class="list-group-item">
                  <strong>NIK:</strong> {{ form.nik }}
                </li>
                <li class="list-group-item">
                  <strong>Email:</strong> {{ form.email }}
                </li>
                <li class="list-group-item">
                  <strong>Telepon:</strong> {{ form.telp }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>

  <div
    class="modal fade"
    id="editProfileModal"
    tabindex="-1"
    level="dialog"
    aria-labelledby="editProfileModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" level="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editProfileModalLabel">
            Edit Profil Pengguna
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
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="gambar">Gambar</label>
              <input
                    type="file"
                    class="form-control"
                    id="gambar"
                    name="gambar"
                    ref="myImage"
                    @change="previewFiles"
                  />
              <small>{{form.gambar}}</small>
            </div>
            <div class="form-group">
              <label for="nama">Nama</label>
              <input
                type="text"
                class="form-control"
                id="nama"
                v-model="form.name"
              />
            </div>
            <div class="form-group">
              <label for="nik">NIK</label>
              <input
                type="number"
                class="form-control"
                id="nik"
                v-model="form.nik"
              />
            </div>
            <div class="form-group">
              <label for="telp">Telp</label>
              <input
                type="number"
                class="form-control"
                id="telp"
                v-model="form.telp"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                id="email"
                v-model="form.email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="form.password"
                @input="checkPasswordMatch"
                :class="{
                  'error-border': passwordMismatch,
                  'success-border': passwordMatch,
                }"
              />
            </div>
            <div class="form-group">
              <label for="kopass">Konfirmasi Password</label>
              <input
                type="password"
                class="form-control"
                id="kopass"
                v-model="form.confirmPassword"
                @input="checkPasswordMatch"
                :class="{
                  'error-border': passwordMismatch,
                  'success-border': passwordMatch,
                }"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="saveChanges">
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";

const editedName = ref("");
export default {
  data() {
    return {
      level: null,
      form: [],
      user_id: "",
      passwordMatch: false,
      passwordMismatch: false
    };
  },
  methods: {
    previewFiles() {
        const file = this.$refs.myImage.files[0];
        this.fileName = file.name;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
          this.form.gambar = e.target.result;
        };
      },
    async fetchUser() {
      try {
        const response = await axios.get(
          `https://10.11.10.243/backend/public/api/auth/user-detail/${this.user_id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.form = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    checkPasswordMatch() {
        if (this.form.password === this.form.confirmPassword) {
          this.passwordMatch = true;
          this.passwordMismatch = false;
        } else {
          this.passwordMatch = false;
          this.passwordMismatch = true;
        }
      },
    saveChanges() {
      let formData = new FormData();
      formData.append("name", this.form.name);
      formData.append("gambar", this.$refs.myImage.files[0]);
      formData.append("nik", this.form.nik);
      formData.append("telp", this.form.telp);
      formData.append("email", this.form.email);
      formData.append("password", this.form.password);

       axios
    .post(`https://10.11.10.243/backend/public/api/auth/user-update/${this.user_id}`, formData, {
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      }
    })
    .then((response) => {
      console.log(response);
      this.showAlert();
    });

    },

    showAlert() {
      // Use sweetalert2
        this.$swal('Data Berhasil di update!!').then(() => {
          $("#editProfileModal").modal("hide");
        });
      }
  },
  created() {
    const token = sessionStorage.getItem("token"); // Ambil token dari local storage

    if (token) {
      try {
        const [headerBase64, signatureBase64] = token.split(".");
        const header = JSON.parse(atob(headerBase64));
        const signature = atob(signatureBase64);

        console.log("Header:", header);
        console.log("Signature:", signature);
        const tokenPayload = JSON.parse(atob(token.split(".")[1])); // Mendekode bagian payload dari token JWT
        console.log("test: ", tokenPayload);
        const expTimestamp = tokenPayload.exp;

        const expDate = new Date(expTimestamp * 1000); // Konversi Unix Timestamp ke JavaScript Date

        console.log("Waktu Kedaluwarsa (UTC):", expDate.toUTCString()); // Tampilkan waktu kedaluwarsa dalam format UTC

        if (new Date() > expDate) {
          console.log("Keluar");
          sessionStorage.removeItem("token")
          this.$router.push("/");
        } else {
          console.log("Aman");
        }

        this.level = tokenPayload.level; // Ambil level pengguna dari payload
        this.user_id = tokenPayload.id;
        if (this.level !== "1") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
        }
        // success
        this.fetchUser();
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
<style scoped>
.form-control {
      border: 1px solid #ccc;
      padding: 10px;
      width: 100%;
      transition: border-color 0.3s;
    }
    
    .error-border {
      border-color: red !important;
    }
    
    .success-border {
      border-color: green !important;
    }
#content-wrapper {
  min-height: 780px !important;
}
</style>
