<template>
  <div class="page-change-city">
    <el-row>
      <el-col :span="24">
        <iSelect />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <hot />
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <categroy />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import iSelect from '@/components/changeCity/citySelect.vue'
import Hot from '@/components/changeCity/hot.vue'
import Categroy from '@/components/changeCity/cityCategroy.vue'
export default {
  components: {
    iSelect,
    Hot,
    Categroy,
  },
}
</script>

<style lang="css"></style>
