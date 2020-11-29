<template>
  <el-container>
    <el-header>
      <my-header></my-header>
    </el-header>
    <el-main>
      <Nuxt />
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script>
import MyHeader from '@/components/public/header'
export default {
  components: {
    MyHeader,
  },
}
</script>
