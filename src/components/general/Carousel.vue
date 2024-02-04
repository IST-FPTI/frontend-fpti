<template>
  <Carousel :autoplay="2000" :wrap-around="true">
    <Slide v-for="slide in 2" :key="slide">
      <div class="row">
        <div class="col-sm-6">
          <img src="@/assets/img/person2.jpg" height="100" alt="gambar" />
        </div>
        <div class="col-sm-6">
          <div class="carousel__item">Berita {{ slide }}</div>
          <div class="carousel__item">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</div>
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

export default defineComponent({
  name: 'Autoplay',
  components: {
    Carousel,
    Slide,
    Pagination,
  },
})
</script>

<style scoped>
.carouselCustom {
  border: 2px solid black;
}
</style>
