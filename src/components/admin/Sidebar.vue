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
      <router-link
        class="nav-link text-black"
        to="/admin-event"
        active-class="font-weight-bold active-link"
      >
        <i class="bi bi-cash-coin" style="font-size:16px"></i>
        <span style="font-weight:bold">Transaksi</span>
      </router-link>
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