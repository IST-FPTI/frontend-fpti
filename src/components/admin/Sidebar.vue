<template>
  <!-- Sidebar -->
  <ul
    class="navbar-nav bg-light sidebar sidebar-dark accordion"
    id="accordionSidebar"
    :class="{ toggled: sidebarToggled }"
  >
    <!-- Sidebar - Brand -->
    <a
      class="sidebar-brand d-flex align-items-center justify-content-center"
      href="#"
    >
      <div class="sidebar-brand-icon mt-2">
        <img src="/img/logo.png" alt="logo" width="100" />
      </div>
      <!-- <div class="sidebar-brand-text ms-3">
        <span class="text-warning">Federasi Panjat Tebing Indonesia</span>
      </div> -->
    </a>

    <!-- Divider -->
    <!-- <hr class="sidebar-divider my-0 mt-5"> -->

    <!-- Heading -->
    <div class="sidebar-heading mt-5 text-black">Menu</div>
    <!-- Nav Item - Dashboard -->
    <li class="nav-item">
      <router-link
        class="nav-link text-black"
        to="/admin-dashboard"
        active-class="font-weight-bold active-link"
      >
        <i class="bi bi-speedometer2 text-black"></i>
        <span>Dashboard</span>
      </router-link>
    </li>


    <!-- Nav Item -Transaksi -->
    <li class="nav-item">
      <a
        class="nav-link collapsed text-black"
        href="#"
        data-toggle="collapse"
        data-target="#collapseKeuangan"
        aria-expanded="true"
        aria-controls="collapseKeuangan"
      >
        <i class="bi bi-cash-coin" style="font-size:16px"></i>
        <span style="font-weight:bold">Events</span>
      </a>
      <div
        id="collapseKeuangan"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Management Event</h6>
          <router-link class="collapse-item" to="/admin-event">
            <span>Event</span>
          </router-link>
          <router-link class="collapse-item" to="/admin-sponsor">
            <span>Sponsor</span>
          </router-link>
          <router-link class="collapse-item" to="/admin-pengeluaran">
            <span>Pengeluaran</span>
          </router-link>
        </div>
      </div>
    </li>

    <!-- Nav Item -Laporan -->
    <li class="nav-item">
      <a
        class="nav-link collapsed text-black"
        href="#"
        data-toggle="collapse"
        data-target="#collapseLaporan"
        aria-expanded="true"
        aria-controls="collapseLaporan"
      >
        <i class="bi bi-file-text-fill"></i>
        <span class="fw-bold">Laporan</span>
      </a>
      <div
        id="collapseLaporan"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Laporan Keuangan</h6>
          <router-link class="collapse-item" to="/admin-realisasi-anggaran">
            <span>Realisasi Anggaran</span>
          </router-link>
          <router-link class="collapse-item" to="/admin-audit">
            <span>Audit Tahunan</span>
          </router-link>
        </div>
      </div>
    </li>

    <!-- Nav Item -Hutang Piutang -->
    <li class="nav-item">
      <a
        class="nav-link collapsed text-black"
        href="#"
        data-toggle="collapse"
        data-target="#collapseHitungPiutang"
        aria-expanded="true"
        aria-controls="collapseHitungPiutang"
      >
        <i class="bi bi-wallet-fill"></i>
        <span class="fw-bold">Hutang Piutang</span>
      </a>
      <div
        id="collapseHitungPiutang"
        class="collapse"
        aria-labelledby="headingPages"
        data-parent="#accordionSidebar"
      >
        <div class="bg-white py-2 collapse-inner rounded">
          <h6 class="collapse-header">Management Hutang</h6>
          <router-link class="collapse-item" to="/admin-hutang">
            <span>Hutang</span>
          </router-link>
          <router-link class="collapse-item" to="/admin-piutang">
            <span>Piutang</span>
          </router-link>
        </div>
      </div>
    </li>

    <!-- Divider -->
    <hr class="sidebar-divider" />

            <!-- Nav Item - jurnal -->
    <li class="nav-item">
      <router-link
        class="nav-link text-black"
        to="/admin-jurnal"
        active-class="font-weight-bold text-black active-link"
      >
        <i class="bi bi-journal-album"></i>
        <span>Jurnal</span>
      </router-link>
    </li>

    <!-- Nav Item - buku besar -->
    <li class="nav-item">
      <router-link
        class="nav-link text-black"
        to="/admin-ledger"
        active-class="font-weight-bold text-black active-link"
      >
        <i class="bi bi-database-fill-check"></i>
        <span>Buku Besar</span>
      </router-link>
    </li>

     <!-- <li class="nav-item">
      <router-link
        class="nav-link text-black"
        to="/admin-pengguna"
        active-class="font-weight-bold text-black active-link"
      >
        <i class="bi bi-person-fill"></i>
        <span>Users</span>
      </router-link>
    </li> -->

    <!-- Divider -->
    <hr class="sidebar-divider d-none d-md-block" />
  </ul>
  <!-- End of Sidebar -->
</template>
<script>
export default {
  data() {
    return {
      sidebarToggled: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarToggled = !this.sidebarToggled;
    },
  },
};
</script>

<style>
@media (max-width: 576px) {
  /* Gaya CSS untuk menyembunyikan sidebar saat sidebarToggled bernilai false */
  .sidebar {
    display: none;
  }
}
/* Gaya CSS untuk menampilkan sidebar saat sidebarToggled bernilai true */
.toggle-sidebar {
  display: block !important;
  /* Tambahkan gaya CSS lain yang Anda inginkan untuk tampilan sidebar yang ditampilkan */
}
.nav-link.active-link,
.nav-link > i {
  font-weight: bold;
  color: black !important;
}

.nav-link.active-link::before {
  content: "";
  display: block;
  width: 50%;
  height: 3px;
  background-color: black;
  position: absolute;
  bottom: 0;
}
</style>