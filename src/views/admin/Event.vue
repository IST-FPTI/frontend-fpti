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
          <h1 class="h3 mb-0 text-gray-800 text-center mb-5">Data Event</h1>
          <div class="row">
            <div class="col-1"></div>
            <div class="col-10">
              <div class="row mb-3">
                <div class="col-6">
                  <button
                    class="btn btn-warning me-2"
                    data-toggle="modal"
                    data-target="#addEvent"
                  >
                    <i class="bi bi-plus-circle-fill"></i> Buat Event
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
                      <th scope="col">Nama Event</th>
                      <th scope="col">Deskripsi</th>
                      <th scope="col">Tempat</th>
                      <th scope="col">Tanggal Dimulai</th>
                      <th scope="col">Tanggal Berakhir</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in events"
                      :key="item.id"
                      @dblclick="showModalUpdateEvent(item)"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>
                        <div
                          class="btn-group"
                          role="group"
                          aria-label="Basic mixed styles example"
                        >
                          <router-link
                            class="btn btn-success"
                            :to="{
                              name: 'admin-report',
                              params: { eventId: item.id },
                            }"
                          >
                            <i class="bi bi-file-earmark-pdf-fill"></i>
                          </router-link>
                          <div class="dropdown">
                            <button
                              class="btn btn-warning dropdown-toggle"
                              type="button"
                              data-toggle="dropdown"
                              aria-expanded="false"
                            >
                              <i class="bi bi-info-circle-fill"></i>
                            </button>
                            <ul class="dropdown-menu">
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#dataPemasukan"
                                  @click="fetchDataSponsor(item.id)"
                                  >Data Pemasukan</a
                                >
                              </li>
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#dataPengeluaran"
                                  @click="fetchDataPengeluaran(item.id)"
                                  >Data Pengeluaran</a
                                >
                              </li>
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#dataHutang"
                                  @click="fetchDataHutang(item.id)"
                                  >Data Hutang</a
                                >
                              </li>
                              <li>
                                <a
                                  class="dropdown-item"
                                  href="#"
                                  data-toggle="modal"
                                  data-target="#dataPiutang"
                                  @click="fetchDataPiutang(item.id)"
                                  >Data Piutang</a
                                >
                              </li>
                            </ul>
                          </div>
                          <button
                            @click="konfirmasiEvent(item.id, item.nama_event)"
                            class="btn btn-danger customDetail"
                          >
                            <i class="bi bi-trash3"></i>
                          </button>
                        </div>
                      </td>
                      <td>{{ item.nama_event }}</td>
                      <td>{{ item.deskripsi_event }}</td>
                      <td>{{ item.lokasi_event }}</td>
                      <td>{{ item.start_date }}</td>
                      <td>{{ item.end_date }}</td>
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

  <!-------------------------------------- Modals Events ------------------------------------>

  <!-- modal tambah event -->
  <div
    class="modal fade"
    id="addEvent"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addEventLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addEventLabel">Buat Event Baru</h5>
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
              <label for="nameEvent" class="form-label">Nama Event</label>
              <input
                type="text"
                class="form-control"
                id="nameEvent"
                placeholder="masukkan nama event"
                v-model="formEvent.nama_event"
              />
            </div>
            <div class="mb-3">
              <label for="startDate" class="form-label">Tanggal Mulai</label>
              <input
                type="date"
                class="form-control"
                id="startDate"
                v-model="formEvent.start_date"
              />
            </div>
            <div class="mb-3">
              <label for="endDate" class="form-label">Tanggal Berakhir</label>
              <input
                type="date"
                class="form-control"
                id="endDate"
                v-model="formEvent.end_date"
              />
            </div>
            <div class="mb-3">
              <label for="tempat" class="form-label">Tempat Event</label>
              <input
                type="text"
                class="form-control"
                id="tempat"
                placeholder="masukkan tempat event"
                v-model="formEvent.lokasi_event"
              />
            </div>
            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formEvent.deskripsi_event"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createEvent">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah event -->

  <!-- modal edit event -->
  <div
    class="modal fade"
    id="editEvent"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editEventLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editEventLabel">Edit Pengeluaran</h5>
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
              <label for="namaEvent" class="form-label">Nama Event</label>
              <input
                type="text"
                class="form-control"
                id="namaEvent"
                placeholder="masukkan nama event"
                v-model="formUpdateEvent.nama_event"
              />
            </div>
            <div class="mb-3">
              <label for="startDate" class="form-label">Tanggal Mulai</label>
              <input
                type="date"
                class="form-control"
                id="startDate"
                v-model="formUpdateEvent.start_date"
              />
            </div>
            <div class="mb-3">
              <label for="endDate" class="form-label">Tanggal Berakhir</label>
              <input
                type="date"
                class="form-control"
                id="endDate"
                v-model="formUpdateEvent.end_date"
              />
            </div>
            <div class="mb-3">
              <label for="lokasiEvent" class="form-label">Tempat Event</label>
              <input
                type="text"
                class="form-control"
                id="lokasiEvent"
                placeholder="masukkan lokasi event"
                v-model="formUpdateEvent.lokasi_event"
              />
            </div>
            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formUpdateEvent.deskripsi_event"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updateEvent">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal edit event -->

  <!------------------------------------- end modals events  ---------------------------------->

  <!---------------------------------------- Modals Pemasukan  ----------------------------------->
  <!-- modal data pemasukan -->
  <div
    class="modal fade"
    id="dataPemasukan"
    tabindex="-1"
    role="dialog"
    aria-labelledby="dataPemasukanLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dataPemasukanLabel">Data Pemasukan</h5>
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
          <button
            class="btn btn-primary mb-3"
            data-toggle="modal"
            data-target="#addSponsor"
            @click="fetchDataActiveEvent()"
          >
            Tambah Pemasukan
          </button>
          <div class="table-responsive">
            <p class="text-center" v-if="!readyPemasukan">Loading...</p>
            <DataTable
              class="display table table-striped"
              v-if="readyPemasukan"
            >
              <thead>
                <tr>
                  <th scope="col" style="width: 50px">No</th>
                  <th scope="col">Aksi</th>
                  <th scope="col">Pemberi Sponsor</th>
                  <th scope="col">Dana Sponsor</th>
                  <th scope="col">Deskripsi Sponsor</th>
                  <th scope="col">Tanggal Sponsor</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in sponsors" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <div class="row">
                      <div class="col-6">
                        <button
                          type="button"
                          class="btn btn-warning"
                          data-toggle="modal"
                          data-target="#editPemasukan"
                          @click="
                            setDataUpdateSponsor(
                              item.pemberi_sponsor,
                              item.dana_sponsor,
                              item.deskripsi_sponsor,
                              item.tanggal_sponsor,
                              item.id
                            )
                          "
                        >
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </div>
                      <div class="col-6">
                        <button
                          @click="
                            konfirmasiPemasukan(item.id, item.pemberi_sponsor)
                          "
                          class="btn btn-danger customDetail"
                        >
                          <i class="bi bi-trash3"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>{{ item.pemberi_sponsor }}</td>
                  <td>{{ formatCurrency(item.dana_sponsor) }}</td>
                  <td>{{ item.deskripsi_sponsor }}</td>
                  <td>{{ item.tanggal_sponsor }}</td>
                </tr>
              </tbody>
            </DataTable>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal data pemasukan -->

  <!-- modal tambah pemasukan -->
  <div
    class="modal fade"
    id="addSponsor"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addSponsorLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addSponsorLabel">Buat Pemasukan Baru</h5>
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
              <label for="pemberiSponsor" class="form-label"
                >Pemberi Sponsor</label
              >
              <input
                type="text"
                class="form-control"
                id="pemberiSponsor"
                placeholder="masukkan pemberi sponsor"
                v-model="formSponsor.pemberi_sponsor"
              />
            </div>
            <div class="mb-3">
              <label for="danaSponsor" class="form-label">Dana Sponsor</label>
              <input
                type="number"
                class="form-control"
                id="danaSponsor"
                placeholder="masukkan dana sponsor"
                v-model="formSponsor.dana_sponsor"
              />
            </div>
            <div class="mb-3">
              <label for="tanggalSponsor" class="form-label"
                >Tanggal Sponsor</label
              >
              <input
                type="date"
                class="form-control"
                id="tanggalSponsor"
                v-model="formSponsor.tanggal_sponsor"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formSponsor.deskripsi_sponsor"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createSponsor">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah pemasukan -->

  <!-- modal edit pemasukan -->
  <div
    class="modal fade"
    id="editPemasukan"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editPemasukanLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editPemasukanLabel">Edit Pemasukan</h5>
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
              <label for="pemberiSponsor" class="form-label"
                >Pemberi Sponsor</label
              >
              <input
                type="text"
                class="form-control"
                id="pemberiSponsor"
                placeholder="masukkan pemberi sponsor"
                v-model="formUpdateSponsor.pemberi_sponsor"
              />
            </div>
            <div class="mb-3">
              <label for="danaSponsor" class="form-label">Dana Sponsor</label>
              <input
                type="text"
                class="form-control"
                id="danaSponsor"
                placeholder="masukkan dana sponsor"
                v-model="formUpdateSponsor.dana_sponsor"
              />
            </div>
            <div class="mb-3">
              <label for="tanggalSponsor" class="form-label"
                >Tanggal Sponsor</label
              >
              <input
                type="date"
                class="form-control"
                id="tanggalSponsor"
                v-model="formUpdateSponsor.tanggal_sponsor"
              />
            </div>
            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formUpdateSponsor.deskripsi_sponsor"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updateSponsor">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal edit pemasukan -->
  <!------------------------------------- end modals pemasukan  ---------------------------------->

  <!---------------------------------------- Modals Pengeluaran  ----------------------------------->
  <!-- modal data pengeluaran -->
  <div
    class="modal fade"
    id="dataPengeluaran"
    tabindex="-1"
    role="dialog"
    aria-labelledby="dataPengeluaranLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dataPengeluaranLabel">
            Data Pengeluaran
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
          <button
            class="btn btn-primary mb-3"
            data-toggle="modal"
            data-target="#addPengeluaran"
          >
            Tambah Pengeluaran
          </button>
          <div class="table-responsive">
            <p class="text-center" v-if="!readyPengeluaran">Loading...</p>
            <DataTable
              class="display table table-striped"
              v-if="readyPengeluaran"
            >
              <thead>
                <tr>
                  <th scope="col" style="width: 50px">No</th>
                  <th scope="col">Aksi</th>
                  <th scope="col">Kebutuhan</th>
                  <th scope="col">Jumlah Pengeluaranr</th>
                  <th scope="col">Deskripsi Pengeluaran</th>
                  <th scope="col">Bukti Pengeluaran</th>
                  <th scope="col">Tanggal Pengeluaran</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in pengeluarans" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <div class="row">
                      <div class="col-6">
                        <button
                          type="button"
                          class="btn btn-warning"
                          data-toggle="modal"
                          data-target="#editPengeluaran"
                          @click="
                            setDataUpdatePengeluaran(
                              item.keperluan_pengeluaran,
                              item.jumlah_pengeluaran,
                              item.deskripsi_pengeluaran,
                              item.tanggal_pengeluaran,
                              item.id
                            )
                          "
                        >
                          <i class="bi bi-pencil-square"></i>
                        </button>
                      </div>
                      <div class="col-6">
                        <button
                          @click="
                            konfirmasiPengeluaran(
                              item.id,
                              item.keperluan_pengeluaran
                            )
                          "
                          class="btn btn-danger customDetail"
                        >
                          <i class="bi bi-trash3"></i>
                        </button>
                      </div>
                    </div>
                  </td>
                  <td>{{ item.keperluan_pengeluaran }}</td>
                  <td>{{ formatCurrency(item.jumlah_pengeluaran) }}</td>
                  <td>{{ item.deskripsi_pengeluaran }}</td>
                  <td>
                    <img
                      :src="
                        'https://backend.keuanganfpti.com/storage/' +
                        item.bukti_pengeluaran
                      "
                      alt="Bukti Transfer"
                      style="max-width: 100px; cursor: pointer"
                      @click="detailBukti(item.bukti_pengeluaran)"
                    />
                  </td>
                  <td>{{ item.tanggal_pengeluaran }}</td>
                </tr>
              </tbody>
            </DataTable>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal data pengeluaran -->

  <!-- modal tambah pengeluaran -->
  <div
    class="modal fade"
    id="addPengeluaran"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addPengeluaranLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addPengeluaranLabel">
            Buat Pengeluaran Baru
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
            <div class="mb-3">
              <label for="kebu" class="form-label">Kebutuhan</label>
              <input
                type="text"
                class="form-control"
                id="kebu"
                placeholder="Masukkan kebutuhan"
                v-model="formPengeluaran.keperluan_pengeluaran"
              />
            </div>
            <div class="mb-3">
              <label for="jumpe" class="form-label">Jumlah Pengeluaran</label>
              <input
                type="text"
                class="form-control"
                id="jumpe"
                placeholder="Masukkan jumlah pengeluaran"
                v-model="formPengeluaran.jumlah_pengeluaran"
              />
            </div>
            <div class="mb-3">
              <label for="tanggalPe" class="form-label"
                >Tanggal Pengeluaran</label
              >
              <input
                type="date"
                class="form-control"
                id="tanggalPe"
                v-model="formPengeluaran.tanggal_pengeluaran"
              />
            </div>
            <div class="mb-3">
              <label for="bukti_pengeluaran" class="form-label"
                >Bukti Pengeluaran</label
              >
              <input
                type="file"
                class="form-control"
                id="bukti_pengeluaran"
                multiple
                @change="handleFileUpload"
              />
            </div>
            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="Masukkan deskripsi"
                v-model="formPengeluaran.deskripsi_pengeluaran"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button
            type="button"
            class="btn blueButton"
            @click="createPengeluaran"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- end modal tambah pengeluaran -->

  <!-- modal edit pengeluaran -->
  <div
    class="modal fade"
    id="editPengeluaran"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editPengeluaranLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editPengeluaranLabel">
            Edit Pengeluaran
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
            <div class="mb-3">
              <label for="kebutuhan" class="form-label">Kebutuhan</label>
              <input
                type="text"
                class="form-control"
                id="kebutuhan"
                placeholder="masukkan kebutuhan"
                v-model="formUpdatePengeluaran.keperluan_pengeluaran"
              />
            </div>
            <div class="mb-3">
              <label for="jumpe" class="form-label">Jumlah Pengeluaran</label>
              <input
                type="number"
                class="form-control"
                id="jumpe"
                placeholder="masukkan jumlah pengeluaran"
                v-model="formUpdatePengeluaran.jumlah_pengeluaran"
              />
            </div>
            <div class="mb-3">
              <label for="tanggalPe" class="form-label"
                >Tanggal Pengeluaran</label
              >
              <input
                type="date"
                class="form-control"
                id="tanggalPe"
                v-model="formPengeluaran.tanggal_pengeluaran"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formUpdatePengeluaran.deskripsi_pengeluaran"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button
            type="button"
            class="btn blueButton"
            @click="updatePengeluaran"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal edit pengeluaran -->

  <!-- modal detail bukti -->
  <div
    class="modal fade"
    id="detailBukti"
    tabindex="-1"
    role="dialog"
    aria-labelledby="detailBuktiLabel"
    aria-hidden="true"
    ref="detailBuktiRef"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addInvoiceModalLabel">
            Detail Bukti Pengeluaran
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
          <img
            :src="'https://backend.keuanganfpti.com/storage/' + path"
            alt="Bukti Transfer"
            style="width: 100%"
          />
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
  <!-- end modal detail bukti -->
  <!------------------------------------- end modals pengeluaran  ---------------------------------->

  <!---------------------------------------- Modals Hutang  ----------------------------------->
  <!-- modal data Hutang -->
  <div
    class="modal fade"
    id="dataHutang"
    tabindex="-1"
    role="dialog"
    aria-labelledby="dataHutangLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dataHutangLabel">Data Hutang</h5>
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
          <button
            class="btn btn-primary mb-3"
            data-toggle="modal"
            data-target="#addHutang"
          >
            Buat Hutang
          </button>
          <div class="table-responsive">
            <p class="text-center" v-if="!readyHutang">Loading...</p>
            <DataTable class="display table table-striped" v-if="readyHutang">
              <thead>
                <tr>
                  <th scope="col" style="width: 50px">No</th>
                  <th scope="col" style="width: 300px">Aksi</th>
                  <th scope="col">Keperluan</th>
                  <th scope="col">Jumlah Hutang</th>
                  <th scope="col">Deskripsi Hutang</th>
                  <th scope="col">Tanggal Hutang</th>
                  <th scope="col">Jatuh Tempo</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in hutangs" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="konfirmasiBayar(item.id, item.keperluan_hutang)"
                      >
                        <i class="bi bi-cash-coin"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-warning"
                        data-toggle="modal"
                        data-target="#editHutang"
                        @click="
                          setDataUpdateHutang(
                            item.keperluan_hutang,
                            item.jumlah_hutang,
                            item.deskripsi_hutang,
                            item.tanggal_hutang,
                            item.tanggal_jatuh_tempo,
                            item.id
                          )
                        "
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button
                        @click="
                          konfirmasiHutang(item.id, item.keperluan_hutang)
                        "
                        class="btn btn-danger customDetail"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </td>
                  <td>{{ item.keperluan_hutang }}</td>
                  <td>{{ formatCurrency(item.jumlah_hutang) }}</td>
                  <td>{{ item.deskripsi_hutang }}</td>
                  <td>{{ item.tanggal_hutang }}</td>
                  <td>{{ item.tanggal_jatuh_tempo }}</td>
                  <td>
                    <i
                      v-if="item.status == '0'"
                      class="bi bi-hourglass-split fs-5 text-danger"
                    ></i>
                    <i
                      v-if="item.status == '1'"
                      class="bi bi-check-circle-fill fs-5 text-success"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </DataTable>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal data Hutang -->

  <!-- modal tambah hutang -->
  <div
    class="modal fade"
    id="addHutang"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addHutangLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addHutangLabel">Buat Hutang</h5>
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
              <label for="ketua" class="form-label">Kebutuhan</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan kebutuhan"
                v-model="formHutang.keperluan_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Hutang</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan jumlah hutang"
                v-model="formHutang.jumlah_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Hutang</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formHutang.tanggal_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jatuh Tempo</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formHutang.tanggal_jatuh_tempo"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formHutang.deskripsi_hutang"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createHutang">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah hutang -->

  <!-- modal edit hutang -->
  <div
    class="modal fade"
    id="editHutang"
    tabindex="-1"
    role="dialog"
    aria-labelledby="editHutangLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editHutangLabel">Edit Hutang</h5>
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
              <label for="ketua" class="form-label">Kebutuhan</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan kebutuhan"
                v-model="formUpdateHutang.keperluan_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Hutang</label>
              <input
                type="text"
                class="form-control"
                id="mapel"
                placeholder="masukkan jumlah hutang"
                v-model="formUpdateHutang.jumlah_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Tanggal Hutang</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formUpdateHutang.tanggal_hutang"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jatuh Tempo</label>
              <input
                type="date"
                class="form-control"
                id="mapel"
                v-model="formUpdateHutang.tanggal_jatuh_tempo"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label">Deskripsi</label>
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formUpdateHutang.deskripsi_hutang"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updateHutang">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal edit hutang -->
  <!------------------------------------- end modals Hutang  ---------------------------------->

  <!---------------------------------------- Modals Piutang  ----------------------------------->
  <!-- modal data Piutang -->
  <div
    class="modal fade"
    id="dataPiutang"
    tabindex="-1"
    role="dialog"
    aria-labelledby="dataPiutangLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="dataPiutangLabel">Data Piutang</h5>
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
          <button
            class="btn btn-primary mb-3"
            data-toggle="modal"
            data-target="#addPiutang"
          >
            Buat Piutang
          </button>
          <div class="table-responsive">
            <p class="text-center" v-if="!readyPiutang">Loading...</p>
            <DataTable class="display table table-striped" v-if="readyPiutang">
              <thead>
                <tr>
                  <th scope="col" style="width: 50px">No</th>
                  <th scope="col">Aksi</th>
                  <th scope="col">Peminjam</th>
                  <th scope="col">No Hp</th>
                  <th scope="col">Jumlah Pinjaman</th>
                  <th scope="col">Deskripsi Pinjaman</th>
                  <th scope="col">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in piutangs" :key="item.id">
                  <td>{{ index + 1 }}</td>
                  <td>
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic mixed styles example"
                    >
                      <button
                        type="button"
                        class="btn btn-success"
                        @click="
                          konfirmasiBayarPiutang(item.id, item.pihak_peminjam)
                        "
                        v-if="item.status == '0'"
                      >
                        <i class="bi bi-cash-coin"></i>
                      </button>
                      <button
                        type="button"
                        class="btn btn-warning"
                        data-toggle="modal"
                        data-target="#aditPiutang"
                        @click="
                          setDataUpdatePiutang(
                            item.pihak_peminjam,
                            item.no_hp,
                            item.jumlah_pinjaman,
                            item.deskripsi_pinjaman,
                            item.id
                          )
                        "
                      >
                        <i class="bi bi-pencil-square"></i>
                      </button>
                      <button
                        @click="konfirmasiPiutang(item.id, item.pihak_peminjam)"
                        class="btn btn-danger customDetail"
                      >
                        <i class="bi bi-trash3"></i>
                      </button>
                    </div>
                  </td>
                  <td>{{ item.pihak_peminjam }}</td>
                  <td>{{ item.no_hp }}</td>
                  <td>{{ item.jumlah_pinjaman }}</td>
                  <td>{{ item.deskripsi_pinjaman }}</td>
                  <td>
                    <i
                      v-if="item.status == '0'"
                      class="bi bi-hourglass-split fs-5 text-danger"
                    ></i>
                    <i
                      v-if="item.status == '1'"
                      class="bi bi-check-circle-fill fs-5 text-success"
                    ></i>
                  </td>
                </tr>
              </tbody>
            </DataTable>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" data-dismiss="modal">
            Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal data Piutang -->
  <!-- modal tambah piutang -->
  <div
    class="modal fade"
    id="addPiutang"
    tabindex="-1"
    role="dialog"
    aria-labelledby="addPiutangLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addPiutangLabel">Buat Piutang</h5>
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
              <label for="ketua" class="form-label">Peminjam</label>
              <input
                type="text"
                class="form-control"
                id="piJam"
                placeholder="masukkan pihak peminjam"
                v-model="formPiutang.pihak_peminjam"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Nomor HP</label>
              <input
                type="number"
                class="form-control"
                id="noHp"
                placeholder="masukkan nomor hp peminjam"
                v-model="formPiutang.no_hp"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Pinjaman</label>
              <input
                type="number"
                class="form-control"
                id="jumpin"
                placeholder="masukkan jumlah pinjaman"
                v-model="formPiutang.jumlah_pinjaman"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label"
                >Deskripsi Pinjaman</label
              >
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formPiutang.deskripsi_pinjaman"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="createPiutang">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal tambah piutang -->

  <!-- modal edit piutang -->
  <div
    class="modal fade"
    id="aditPiutang"
    tabindex="-1"
    role="dialog"
    aria-labelledby="aditPiutangLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="aditPiutangLabel">Edit Hutang</h5>
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
              <label for="ketua" class="form-label">Peminjam</label>
              <input
                type="text"
                class="form-control"
                id="piJam"
                placeholder="masukkan pihak peminjam"
                v-model="formUpdatePiutang.pihak_peminjam"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Nomor HP</label>
              <input
                type="number"
                class="form-control"
                id="noHp"
                placeholder="masukkan nomor hp"
                v-model="formUpdatePiutang.no_hp"
              />
            </div>
            <div class="mb-3">
              <label for="ketua" class="form-label">Jumlah Pinjaman</label>
              <input
                type="number"
                class="form-control"
                id="jumpin"
                placeholder="masukkan jumlah pinjaman"
                v-model="formUpdatePiutang.jumlah_pinjaman"
              />
            </div>

            <div class="mb-3">
              <label for="keterangan" class="form-label"
                >Deskripsi Pinjaman</label
              >
              <textarea
                class="form-control"
                id="keterangan"
                placeholder="masukkan deskripsi"
                v-model="formUpdatePiutang.deskripsi_pinjaman"
              ></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">
            Batal
          </button>
          <button type="button" class="btn blueButton" @click="updatePiutang">
            Simpan
          </button>
        </div>
      </div>
    </div>
  </div>
  <!-- end modal edit piutang -->
  <!------------------------------------- end modals Piutang  ---------------------------------->
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
      events: [],
      formEvent: {
        nama_event: "",
        start_date: "",
        end_date: "",
        lokasi_event: "",
        deskripsi_event: "",
      },
      formUpdateEvent: {
        nama_event: "",
        start_date: "",
        end_date: "",
        lokasi_event: "",
        deskripsi_event: "",
        id_event: "",
      },
      ready: false,
      user_id: "",

      // -------------------pemasukan------------------------
      sponsors: [],
      eventsActive: [],
      formSponsor: {
        pemberi_sponsor: "",
        dana_sponsor: "",
        tanggal_sponsor: "",
        deskripsi_sponsor: "",
      },
      formUpdateSponsor: {
        pemberi_sponsor: "",
        dana_sponsor: "",
        tanggal_sponsor: "",
        deskripsi_sponsor: "",
        id_sponsor: "",
      },
      readyPemasukan: false,
      selectedEvent: "",
      // ------------------end pemasukan-----------------------

      // --------------------pengeluaran---------------------
      pengeluarans: [],
      // events:[],
      formPengeluaran: {
        keperluan_pengeluaran: "",
        jumlah_pengeluaran: "",
        deskripsi_pengeluaran: "",
        tanggal_pengeluaran: "",
        bukti_pengeluaran: [],
      },
      formUpdatePengeluaran: {
        keperluan_pengeluaran: "",
        jumlah_pengeluaran: "",
        deskripsi_pengeluaran: "",
        tanggal_pengeluaran: "",
        bukti_pengeluaran: null,
        id_pengeluaran: "",
      },
      readyPengeluaran: false,
      path: "",
      // --------------------end pengeluaran---------------------

      // -------------------- Hutangs ---------------------------
      hutangs: [],
      events: [],
      formHutang: {
        keperluan_hutang: "",
        jumlah_hutang: "",
        deskripsi_hutang: "",
        tanggal_hutang: "",
        tanggal_jatuh_tempo: "",
      },
      formUpdateHutang: {
        keperluan_hutang: "",
        jumlah_hutang: "",
        deskripsi_hutang: "",
        tanggal_hutang: "",
        tanggal_jatuh_tempo: "",
        id_hutang: "",
      },
      readyHutang: false,
      // ------------------ End Hutangs ----------------------------

      // ----------------------- Piutangs --------------------------
      piutangs: [],
      formPiutang: {
        pihak_peminjam: "",
        no_hp: "",
        jumlah_pinjaman: "",
        deskripsi_pinjaman: "",
      },
      formUpdatePiutang: {
        pihak_peminjam: "",
        no_hp: "",
        jumlah_pinjaman: "",
        deskripsi_pinjaman: "",
        id_piutang: "",
      },
      readyPiutang: false,
      // ----------------------- End Piutangs --------------------------
    };
  },
  methods: {
    // ------------------------- Event -------------------------------
    showModalUpdateEvent(item) {
      // Set data untuk modal sesuai dengan item yang di-double klik
      this.setDataUpdateEvent(
        item.nama_event,
        item.start_date,
        item.end_date,
        item.lokasi_event,
        item.deskripsi_event,
        item.id
      );

      // Munculkan modal dengan menggunakan jQuery
      $("#editEvent").modal("show");
    },
    setDataUpdateEvent(
      nama_event,
      start_date,
      end_date,
      lokasi_event,
      deskripsi_event,
      id
    ) {
      this.formUpdateEvent.nama_event = nama_event;
      this.formUpdateEvent.start_date = start_date;
      this.formUpdateEvent.end_date = end_date;
      this.formUpdateEvent.lokasi_event = lokasi_event;
      this.formUpdateEvent.deskripsi_event = deskripsi_event;
      this.formUpdateEvent.id_event = id;
    },
    createEvent() {
      this.ready = false;
      const formData = new FormData();
      formData.append("nama_event", this.formEvent.nama_event);
      formData.append("start_date", this.formEvent.start_date);
      formData.append("end_date", this.formEvent.end_date);
      formData.append("lokasi_event", this.formEvent.lokasi_event);
      formData.append("deskripsi_event", this.formEvent.deskripsi_event);
      formData.append("id_user", this.user_id);

      axios
        .post("https://backend.keuanganfpti.com/api/create-event", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formEvent = {
            jumlah_transaksi: "",
            deskripsi: "",
            tgl_transaksi: "",
            selectedPenerima: "",
          };
          this.showAlertEvent(
            "Request Success",
            "Event berhasil buat",
            "success"
          );
          this.fetchDataEvents();
        })
        .catch((error) => {
          this.showAlertEvent("Request Failed", "Event gagal buat", "error");
          console.error(error);
          this.ready = true;
        });
    },
    updateEvent() {
      this.ready = false;
      const formData = new FormData();
      formData.append("nama_event", this.formUpdateEvent.nama_event);
      formData.append("start_date", this.formUpdateEvent.start_date);
      formData.append("end_date", this.formUpdateEvent.end_date);
      formData.append("lokasi_event", this.formUpdateEvent.lokasi_event);
      formData.append("deskripsi_event", this.formUpdateEvent.deskripsi_event);
      formData.append("id_user", this.user_id);

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-event/${this.formUpdateEvent.id_event}`,
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
          this.showAlertEvent(
            "Request Success",
            "Event berhasil diupdate",
            "success"
          );
          this.fetchDataEvents();
        })
        .catch((error) => {
          this.showAlertEvent(
            "Request Failed",
            "Event gagal diupdate",
            "error"
          );
          console.error(error);
          this.ready = true;
        });
    },
    deleteEvent(id) {
      this.ready = false;

      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-event/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlertEvent(
            "Request Success",
            "Event berhasil dihapus",
            "success"
          );
          this.fetchDataEvents();
        })
        .catch((error) => {
          this.showAlertEvent("Request Failed", "Event gagal dihapus", "error");
          console.error(error);
          this.ready = true;
        });
    },
    async fetchDataEvents() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/list-event`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.events = response.data.data;
        this.ready = true;
      } catch (error) {
        this.ready = true;
        console.error(error);
      }
    },
    showAlertEvent(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon,
      }).then(() => {
        $("#addEvent").modal("hide");
        $("#editEvent").modal("hide");
      });
    },
    konfirmasiEvent(id, nama_event) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus event ${nama_event}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteEvent(id);
        }
      });
    },
    // ----------------------------- end event -----------------------------------

    // ----------------------------- pemasukan / sponsor ----------------------------------
    setDataUpdateSponsor(
      pemberi_sponsor,
      dana_sponsor,
      deskripsi_sponsor,
      tanggal_sponsor,
      id
    ) {
      this.formUpdateSponsor.pemberi_sponsor = pemberi_sponsor;
      this.formUpdateSponsor.dana_sponsor = dana_sponsor;
      this.formUpdateSponsor.deskripsi_sponsor = deskripsi_sponsor;
      this.formUpdateSponsor.tanggal_sponsor = tanggal_sponsor;
      this.formUpdateSponsor.id_sponsor = id;
    },
    createSponsor() {
      this.readyPemasukan = false;
      const formData = new FormData();
      formData.append("pemberi_sponsor", this.formSponsor.pemberi_sponsor);
      formData.append("dana_sponsor", this.formSponsor.dana_sponsor);
      formData.append("deskripsi_sponsor", this.formSponsor.deskripsi_sponsor);
      formData.append("tanggal_sponsor", this.formSponsor.tanggal_sponsor);
      formData.append("id_event", this.selectedEvent);

      axios
        .post("https://backend.keuanganfpti.com/api/create-sponsor", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formSponsor = {
            pemberi_sponsor: "",
            dana_sponsor: "",
            deskripsi_sponsor: "",
            selectedEvent: "",
          };
          this.showAlertPemasukan(
            "Request Success",
            "Sponsor berhasil buat",
            "success"
          );
          this.fetchDataSponsor(this.selectedEvent);
        })
        .catch((error) => {
          this.showAlertPemasukan(
            "Request Failed",
            "Sponsor gagal buat",
            "error"
          );
          console.error(error);
          this.readyPemasukan = true;
        });
    },
    updateSponsor() {
      this.readyPemasukan = false;
      const formData = new FormData();
      formData.append(
        "pemberi_sponsor",
        this.formUpdateSponsor.pemberi_sponsor
      );
      formData.append("dana_sponsor", this.formUpdateSponsor.dana_sponsor);
      formData.append(
        "deskripsi_sponsor",
        this.formUpdateSponsor.deskripsi_sponsor
      );
      formData.append(
        "tanggal_sponsor",
        this.formUpdateSponsor.tanggal_sponsor
      );
      formData.append("id_event", this.selectedEvent);

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-sponsor/${this.formUpdateSponsor.id_sponsor}`,
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
          this.showAlertPemasukan(
            "Request Success",
            "Sponsor berhasil diupdate",
            "success"
          );
          this.fetchDataSponsor(this.selectedEvent);
        })
        .catch((error) => {
          this.showAlertPemasukan(
            "Request Failed",
            "Sponsor gagal diupdate",
            "error"
          );
          console.error(error);
          this.readyPemasukan = true;
        });
    },
    deleteSponsor(id) {
      this.readyPemasukan = false;
      let id_event = this.sponsors[0].id_event;

      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-sponsor/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlertPemasukan(
            "Request Success",
            "Sponsor berhasil dihapus",
            "success"
          );
          this.fetchDataSponsor(id_event);
        })
        .catch((error) => {
          this.showAlertPemasukan(
            "Request Failed",
            "Sponsor gagal dihapus",
            "error"
          );
          console.error(error);
          this.readyPemasukan = true;
        });
    },
    async fetchDataSponsor(id) {
      this.selectedEvent = id;
      this.readyPemasukan = false;
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/list-sponsor-by-event/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.sponsors = response.data.data;
        this.readyPemasukan = true;
      } catch (error) {
        this.readyPemasukan = true;
        console.error(error);
      }
    },
    async fetchDataActiveEvent() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/event-active`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.eventsActive = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    showAlertPemasukan(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon,
      }).then(() => {
        $("#addSponsor").modal("hide");
        $("#editPemasukan").modal("hide");
      });
    },
    konfirmasiPemasukan(id, pemberi_sponsor) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus sponsor dari ${pemberi_sponsor}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteSponsor(id);
        }
      });
    },
    // -------------------------- end pemasukan / sponsor ----------------------------------

    // ---------------------------------- Pengeluaran ------------------------------------------
    detailBukti(bukti_pengeluaran) {
      this.path = bukti_pengeluaran;
      $("#detailBukti").modal("show");
    },
    setDataUpdatePengeluaran(
      keperluan_pengeluaran,
      jumlah_pengeluaran,
      deskripsi_pengeluaran,
      tanggal_pengeluaran,
      id
    ) {
      this.formUpdatePengeluaran.keperluan_pengeluaran = keperluan_pengeluaran;
      this.formUpdatePengeluaran.jumlah_pengeluaran = jumlah_pengeluaran;
      this.formUpdatePengeluaran.deskripsi_pengeluaran = deskripsi_pengeluaran;
      this.formUpdatePengeluaran.tanggal_pengeluaran = tanggal_pengeluaran;
      this.formUpdatePengeluaran.id_pengeluaran = id;
    },
    createPengeluaran() {
      this.readyPengeluaran = false;

      // Ubah gambar-gambar menjadi base64
      let encodedImages = [];
      for (let i = 0; i < this.formPengeluaran.bukti_pengeluaran.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(this.formPengeluaran.bukti_pengeluaran[i]);
        reader.onloadend = () => {
          let base64data = reader.result;
          encodedImages.push(base64data);

          // Setelah semua gambar dienkripsi, kirim permintaan POST
          if (
            encodedImages.length ===
            this.formPengeluaran.bukti_pengeluaran.length
          ) {
            this.sendPengeluaranData(encodedImages);
          }
        };
      }
    },

    sendPengeluaranData(encodedImages) {
      const pengeluaranData = {
        keperluan_pengeluaran: this.formPengeluaran.keperluan_pengeluaran,
        jumlah_pengeluaran: this.formPengeluaran.jumlah_pengeluaran,
        deskripsi_pengeluaran: this.formPengeluaran.deskripsi_pengeluaran,
        tanggal_pengeluaran: this.formPengeluaran.tanggal_pengeluaran,
        id_event: this.selectedEvent, 
        bukti_pengeluaran: encodedImages,
      };

      axios
        .post("https://backend.keuanganfpti.com/api/create-pengeluaran", pengeluaranData, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formPengeluaran = {
            pemberi_sponsor: "",
            dana_sponsor: "",
            deskripsi_sponsor: "",
            selectedEvent: "",
          };
          this.fetchDataPengeluaran(this.selectedEvent);
          this.showAlertPengeluaran(
            "Request Success",
            "Pengeluaran berhasil dibuat",
            "success"
          );
        })
        .catch((error) => {
          this.showAlertPengeluaran(
            "Request Failed",
            "Pengeluaran gagal dibuat",
            "error"
          );
          console.error(error);
          this.readyPengeluaran = true;
        });
    },

    updatePengeluaran() {
      this.readyPengeluaran = false;
      const formData = new FormData();
      formData.append(
        "keperluan_pengeluaran",
        this.formUpdatePengeluaran.keperluan_pengeluaran
      );
      formData.append(
        "jumlah_pengeluaran",
        this.formUpdatePengeluaran.jumlah_pengeluaran
      );
      formData.append(
        "deskripsi_pengeluaran",
        this.formUpdatePengeluaran.deskripsi_pengeluaran
      );
      formData.append(
        "tanggal_pengeluaran",
        this.formUpdatePengeluaran.tanggal_pengeluaran
      );
      formData.append("id_event", this.pengeluarans[0].id_event);

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-pengeluaran/${this.formUpdatePengeluaran.id_pengeluaran}`,
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
          this.showAlertPengeluaran(
            "Request Success",
            "Pengeluaran berhasil diupdate",
            "success"
          );
          this.fetchDataPengeluaran(this.pengeluarans[0].id_event);
        })
        .catch((error) => {
          this.showAlertPengeluaran(
            "Request Failed",
            "Pengeluaran gagal diupdate",
            "error"
          );
          console.error(error);
          this.readyPengeluaran = true;
        });
    },
    deletePengeluaran(id) {
      this.readyPengeluaran = false;
      let id_event = this.pengeluarans[0].id_event;

      axios
        .delete(
          `https://backend.keuanganfpti.com/api/delete-pengeluaran/${id}`,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          this.showAlertPengeluaran(
            "Request Success",
            "Pengeluaran berhasil dihapus",
            "success"
          );
          this.fetchDataPengeluaran(id_event);
        })
        .catch((error) => {
          this.showAlertPengeluaran(
            "Request Failed",
            "Pengeluaran gagal dihapus",
            "error"
          );
          console.error(error);
          this.readyPengeluaran = true;
        });
    },
    async fetchDataPengeluaran(id) {
      this.selectedEvent = id;
      this.readyPengeluaran = false;
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/list-pengeluaran-by-event/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.pengeluarans = response.data.data;
        this.readyPengeluaran = true;
      } catch (error) {
        this.readyPengeluaran = true;
        console.error(error);
      }
    },
    async fetchDataActiveEvent() {
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/event-active`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.events = response.data.data;
      } catch (error) {
        console.error(error);
      }
    },
    showAlertPengeluaran(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon,
      }).then(() => {
        $("#addPengeluaran").modal("hide");
        $("#editPengeluaran").modal("hide");
      });
    },
    konfirmasiPengeluaran(id, keperluan_pengeluaran) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus pengeluaran ${keperluan_pengeluaran}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletePengeluaran(id);
        }
      });
    },
    handleFileUpload(event) {
      // Mendapatkan semua file yang dipilih
      const files = event.target.files;

      // Mengubah formPengeluaran.bukti_pengeluaran menjadi array kosong
      this.formPengeluaran.bukti_pengeluaran = [];

      // Menambahkan semua file ke array formPengeluaran.bukti_pengeluaran
      for (const file of files) {
        this.formPengeluaran.bukti_pengeluaran.push(file);
      }
    },
    // ---------------------------------- End Pengeluaran --------------------------------------

    // ---------------------------------- Hutang ------------------------------------------
    setDataUpdateHutang(
      keperluan_hutang,
      jumlah_hutang,
      deskripsi_hutang,
      tanggal_hutang,
      tanggal_jatuh_tempo,
      id
    ) {
      this.formUpdateHutang.keperluan_hutang = keperluan_hutang;
      this.formUpdateHutang.jumlah_hutang = jumlah_hutang;
      this.formUpdateHutang.deskripsi_hutang = deskripsi_hutang;
      this.formUpdateHutang.tanggal_hutang = tanggal_hutang;
      this.formUpdateHutang.tanggal_jatuh_tempo = tanggal_jatuh_tempo;
      this.formUpdateHutang.id_hutang = id;
    },
    createHutang() {
      this.readyHutang = false;
      const formData = new FormData();
      formData.append("keperluan_hutang", this.formHutang.keperluan_hutang);
      formData.append("jumlah_hutang", this.formHutang.jumlah_hutang);
      formData.append("tanggal_hutang", this.formHutang.tanggal_hutang);
      formData.append(
        "tanggal_jatuh_tempo",
        this.formHutang.tanggal_jatuh_tempo
      );
      formData.append("deskripsi_hutang", this.formHutang.deskripsi_hutang);
      formData.append("id_event", this.selectedEvent);

      axios
        .post("https://backend.keuanganfpti.com/api/create-hutang", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formHutang = {
            keperluan_hutang: "",
            jumlah_hutang: "",
            tanggal_hutang: "",
            tanggal_jatuh_tempo: "",
            deskripsi_hutang: "",
            selectedEvent: "",
          };
          this.showAlertHutang(
            "Request Success",
            "Hutang berhasil buat",
            "success"
          );
          this.fetchDataHutang(this.selectedEvent);
        })
        .catch((error) => {
          this.showAlertHutang("Request Failed", "Hutang gagal buat", "error");
          console.error(error);
          this.readyHutang = true;
        });
    },
    updateHutang() {
      this.readyHutang = false;
      const formData = new FormData();
      formData.append(
        "keperluan_hutang",
        this.formUpdateHutang.keperluan_hutang
      );
      formData.append("jumlah_hutang", this.formUpdateHutang.jumlah_hutang);
      formData.append(
        "deskripsi_hutang",
        this.formUpdateHutang.deskripsi_hutang
      );
      formData.append("tanggal_hutang", this.formUpdateHutang.tanggal_hutang);
      formData.append(
        "tanggal_jatuh_tempo",
        this.formUpdateHutang.tanggal_jatuh_tempo
      );
      formData.append("id_event", this.selectedEvent);

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-hutang/${this.formUpdateHutang.id_hutang}`,
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
          this.showAlertHutang(
            "Request Success",
            "Hutang berhasil diupdate",
            "success"
          );
          this.fetchDataHutang(this.selectedEvent);
        })
        .catch((error) => {
          this.showAlertHutang(
            "Request Failed",
            "Hutang gagal diupdate",
            "error"
          );
          console.error(error);
          this.readyHutang = true;
        });
    },
    deleteHutang(id) {
      this.readyHutang = false;

      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-hutang/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlertHutang(
            "Request Success",
            "Hutang berhasil dihapus",
            "success"
          );
          this.fetchDataHutang(this.selectedEvent);
        })
        .catch((error) => {
          this.showAlertHutang(
            "Request Failed",
            "Hutang gagal dihapus",
            "error"
          );
          console.error(error);
          this.readyHutang = true;
        });
    },
    async fetchDataHutang(id) {
      this.readyHutang = false;
      this.selectedEvent = id;
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/list-hutang-by-event/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.hutangs = response.data.data;
        this.readyHutang = true;
      } catch (error) {
        this.readyHutang = true;
        console.error(error);
      }
    },
    async bayarHutang(id) {
      try {
        const response = await axios.post(
          `https://backend.keuanganfpti.com/api/bayar-hutang/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.showAlertHutang(
          "Request Success",
          "Hutang berhasil dibayarkan",
          "success"
        );
        this.fetchDataHutang(this.selectedEvent);
      } catch (error) {
        console.error(error);
        this.showAlertHutang(
          "Request Failed",
          "Gagal membayar hutang, pastikan saldo anda cukup",
          "error"
        );
      }
    },
    showAlertHutang(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon,
      }).then(() => {
        $("#addHutang").modal("hide");
        $("#editHutang").modal("hide");
      });
    },

    konfirmasiBayar(id, keperluan_hutang) {
      Swal.fire({
        title: `Apakah Anda yakin ingin membayar hutang ${keperluan_hutang}?`,
        text: "Pastikan saldo anda cukup.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fac800",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bayar",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.bayarHutang(id);
        }
      });
    },

    konfirmasiHutang(id, keperluan_hutang) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus hutang ${keperluan_hutang}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteHutang(id);
        }
      });
    },
    // ---------------------------------- End Hutang --------------------------------------

    // ---------------------------------- Piutang ------------------------------------------
    setDataUpdatePiutang(
      pihak_peminjam,
      no_hp,
      jumlah_pinjaman,
      deskripsi_pinjaman,
      id
    ) {
      this.formUpdatePiutang.pihak_peminjam = pihak_peminjam;
      this.formUpdatePiutang.no_hp = no_hp;
      this.formUpdatePiutang.jumlah_pinjaman = jumlah_pinjaman;
      this.formUpdatePiutang.deskripsi_pinjaman = deskripsi_pinjaman;
      this.formUpdatePiutang.id_piutang = id;
    },
    createPiutang() {
      this.readyPiutang = false;
      const formData = new FormData();
      formData.append("pihak_peminjam", this.formPiutang.pihak_peminjam);
      formData.append("no_hp", this.formPiutang.no_hp);
      formData.append("jumlah_pinjaman", this.formPiutang.jumlah_pinjaman);
      formData.append(
        "deskripsi_pinjaman",
        this.formPiutang.deskripsi_pinjaman
      );
      formData.append("id_event", this.selectedEvent);

      axios
        .post("https://backend.keuanganfpti.com/api/create-piutang", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.formPiutang = {
            keperluan_hutang: "",
            jumlah_hutang: "",
            tanggal_hutang: "",
            tanggal_jatuh_tempo: "",
            deskripsi_hutang: "",
            selectedEvent: "",
          };
          this.showAlertPiutang(
            "Request Success",
            "Piutang berhasil buat",
            "success"
          );
          this.fetchDataPiutang(this.selectedEvent);
        })
        .catch((error) => {
          this.showAlertPiutang(
            "Request Failed",
            "Piutang gagal buat",
            "error"
          );
          console.error(error);
          this.readyPiutang = true;
        });
    },

    updatePiutang() {
      this.readyPiutang = false;
      const formData = new FormData();
      formData.append("pihak_peminjam", this.formUpdatePiutang.pihak_peminjam);
      formData.append("no_hp", this.formUpdatePiutang.no_hp);
      formData.append(
        "jumlah_pinjaman",
        this.formUpdatePiutang.jumlah_pinjaman
      );
      formData.append(
        "deskripsi_pinjaman",
        this.formUpdatePiutang.deskripsi_pinjaman
      );
      formData.append("id_event", this.selectedEvent);

      axios
        .post(
          `https://backend.keuanganfpti.com/api/update-piutang/${this.formUpdatePiutang.id_piutang}`,
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
          this.showAlertPiutang(
            "Request Success",
            "Piutang berhasil diupdate",
            "success"
          );
          this.fetchDataPiutang(this.selectedEvent);
        })
        .catch((error) => {
          this.showAlertPiutang(
            "Request Failed",
            "Piutang gagal diupdate",
            "error"
          );
          console.error(error);
          this.readyPiutang = true;
        });
    },

    deletePiutang(id) {
      this.readyPiutang = false;

      axios
        .delete(`https://backend.keuanganfpti.com/api/delete-piutang/${id}`, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response.data);
          this.showAlertPiutang(
            "Request Success",
            "Piutang berhasil dihapus",
            "success"
          );
          this.fetchDataPiutang(id);
        })
        .catch((error) => {
          this.showAlertPiutang(
            "Request Failed",
            "Piutang gagal dihapus",
            "error"
          );
          console.error(error);
          this.readyPiutang = true;
        });
    },

    async fetchDataPiutang(id) {
      this.readyPiutang = false;
      this.selectedEvent = id;
      try {
        const response = await axios.get(
          `https://backend.keuanganfpti.com/api/list-piutang-by-event/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.piutangs = response.data.data;
        this.readyPiutang = true;
      } catch (error) {
        this.readyPiutang = true;
        console.error(error);
      }
    },

    async bayarPiutang(id) {
      try {
        const response = await axios.post(
          `https://backend.keuanganfpti.com/api/bayar-piutang/${id}`,
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
          }
        );
        this.showAlertPiutang(
          "Request Success",
          "Piutang berhasil dibayarkan",
          "success"
        );
        this.fetchDataPiutang(this.selectedEvent);
      } catch (error) {
        console.error(error);
        this.showAlertPiutang(
          "Request Failed",
          "Gagal membayar hutang, pastikan saldo anda cukup",
          "error"
        );
      }
    },

    showAlertPiutang(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon,
      }).then(() => {
        $("#addPiutang").modal("hide");
        $("#aditPiutang").modal("hide");
      });
    },

    konfirmasiBayarPiutang(id, pihak_peminjam) {
      Swal.fire({
        title: `Apakah Anda yakin ${pihak_peminjam} sudah membayar hutang?`,
        text: "Saldo anda akan dikembalikan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#fac800",
        cancelButtonColor: "#d33",
        confirmButtonText: "Bayar",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.bayarPiutang(id);
        }
      });
    },

    konfirmasiPiutang(id, pihak_peminjam) {
      Swal.fire({
        title: `Konfirmasi Penghapusan`,
        text: `Apakah Anda yakin ingin menghapus piutang ${pihak_peminjam}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#061387",
        confirmButtonText: "Hapus",
        cancelButtonText: "Batal",
      }).then((result) => {
        if (result.isConfirmed) {
          this.deletePiutang(id);
        }
      });
    },
    // ---------------------------------- End Piutang --------------------------------------
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
        if (level !== "1") {
          this.$router.push("/unauthorized");
        } else if (!header || !signature) {
          this.$router.push("/");
        }
        // success
        this.fetchDataEvents();
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
#content-wrapper {
  min-height: 780px !important;
}
button.dropdown-toggle {
  border-radius: 0px !important;
}
</style>
