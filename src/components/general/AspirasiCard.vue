<template>
  <div class="card card-aspirasi">
    <div class="card-body">
      <h5 class="card-title">{{ nama }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{ formatDate(tanggal) }}</h6>
      <p class="card-text">{{ isi }}</p>
      <div class="d-flex justify-content-between align-items-center">
        <div>
          <i class="bi-heart-fill text-danger"></i> {{ jumlahLike }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nama: String,
    tanggal: String,
    isi: String,
    jumlahLike: Number,
  },
  methods: {
    formatDate(date) {
      // Logika format tanggal sesuai kebutuhan Anda
      return date;
    },
    toggleLike() {
      // Logika penanganan like
      // Contoh: this.$emit('like', this.id)
    },
  },
};
</script>

<style scoped>
.card-aspirasi {
  margin-bottom: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.card-subtitle {
  color: #6c757d;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.card-text {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}
</style>
