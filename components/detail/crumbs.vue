<template>
  <div class="m-crumbs">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }"
        >{{
          $store.state.geo.position.city.replace('市', '')
        }}美团</el-breadcrumb-item
      >
      <el-breadcrumb-item :to="{ path: '/' }"
        >{{ $store.state.geo.position.city.replace('市', '')
        }}{{ type }}</el-breadcrumb-item
      >
      <el-breadcrumb-item>
        <nuxt-link to="/"
          >{{ $store.state.geo.position.city.replace('市', '')
          }}{{ decodeURIComponent(keyword) }}</nuxt-link
        >
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    keyword: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: '',
    },
  },
  mounted() {
    this.city = sessionStorage.getItem('city')
    this.$store.commit('geo/setPosition', {
      city: this.city,
    })
  },
}
</script>
