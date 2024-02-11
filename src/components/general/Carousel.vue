<template>
  <Carousel :autoplay="2000" :wrap-around="true">
    <Slide v-for="(slide, index) in slides" :key="index">
      <div class="row">
        <div class="col-sm-6">
          <img :src="slide.imageUrl" height="100" alt="gambar" />
        </div>
        <div class="col-sm-6">
          <div class="carousel__item">{{ slide.title }}</div>
          <div class="carousel__item">{{ slide.description }}</div>
        </div>
      </div>
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script>
import { defineComponent } from 'vue'
import { Carousel, Pagination, Slide } from 'vue3-carousel'

import 'vue3-carousel/dist/carousel.css'

// Import gambar dari direktori asset
// import person1 from '@/assets/img/person1.jpg'
import person2 from '@/assets/img/person2.jpg'

export default defineComponent({
  name: 'Autoplay',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
  data() {
    return {
      slides: [
        {
          title: 'Berita 1',
          description: 'Federasi Panjat Tebing Indonesia',
          imageUrl: person2,
        },
        {
          title: 'Berita 2',
          description: 'Tempat Menyalurkan Bakat Pemuda',
          imageUrl: person2,
        },
        // Tambahkan slide lainnya sesuai kebutuhan
      ],
    }
  },
})
</script>

<style scoped>
.carouselCustom {
  border: 2px solid black;
}
</style>
