<template>
  <div class="page-detail">
    <!-- 第一行 -->
    <el-row>
      <el-col :span="24">
        <crumbs :keyword="keyword" :type="type" />
      </el-col>
    </el-row>
    <!-- 第二行 -->
    <el-row>
      <el-col :span="24">
        <summa :meta="product" />
      </el-col>
    </el-row>
    <!-- 第三行 -->
    <el-row class="m-title">
      <h3>商家团购及优惠</h3>
    </el-row>
    <!-- 第四行 -->
    <el-row v-if="canOrder || !login">
      <el-col :span="24">
        <!-- 登录状态 -->
        <list v-if="login" :list="list" />
        <!-- 未登录状态 -->
        <div v-else class="deal-need-login">
          <img
            src="//p0.meituan.net/codeman/56a7d5abcb5ce3d90fc91195e5b5856911194.png"
            alt="登录查看"
          />
          <span>请登录后查看详细团购优惠</span>
          <el-button type="primary" round>
            <nuxt-link to="/login">立即登录</nuxt-link>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Summa from '@/components/detail/summary.vue'
import List from '@/components/detail/list.vue'
import Crumbs from '@/components/detail/crumbs.vue'
export default {
  name: 'Detail',
  components: {
    Crumbs,
    Summa,
    List,
  },
  // 异步数据实在服务端执行的
  async asyncData(ctx) {
    const { keyword, type } = ctx.query
    const {
      status,
      data: { product, more: list, login },
    } = await ctx.$axios.get('/search/products', {
      params: {
        keyword,
        type,
        city: ctx.store.state.geo.position.city,
      },
    })
    if (status === 200) {
      return {
        keyword,
        product,
        type,
        list,
        login,
      }
    } else {
      return {
        keyword,
        product: {},
        type,
        list: [],
        login: false,
      }
    }
  },
  data() {
    return {
      keyword: '',
      type: '',
      product: '',
      list: '',
      login: '',
    }
  },
  computed: {
    canOrder() {
      return this.list.filter((item) => item.photos.length).length
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/css/detail/index.scss';
</style>
