<template>
  <el-row class="m-header" :gutter="15">
    <el-col :span="6">
      <geo></geo>
    </el-col>
    <el-col :span="6"></el-col>
    <el-col :span="6"></el-col>
  </el-row>
</template>

<script>
import Geo from './geo'
export default {
  components: {
    Geo,
  },
}
</script>

<style></style>
