<template>
  <div>
    <div class="m-geo">
      <i class="el-icon-location">{{
        city ? city : this.$store.state.geo.position.city
      }}</i>
      <nuxt-link class="changeCity" to="/changeCity">切换城市</nuxt-link
      >[佛山，顺德，南沙]
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      city: '',
    }
  },
  mounted() {
    if (sessionStorage.getItem('city')) {
      this.city = sessionStorage.getItem('city')
      this.$store.commit('geo/setPosition', {
        city: this.city,
      })
    } else {
      this.city = sessionStorage.setItem(
        'city',
        this.$store.state.geo.position.city
      )
    }
  },
}
</script>

<style lang="scss" scoped></style>
