<template>
  <div class="m-crumbs">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator=">">
      <el-breadcrumb-item :to="{ path: '/' }"
        >{{
          $store.state.geo.position.city.replace('市', '')
        }}美团</el-breadcrumb-item
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
  },
}
</script>
