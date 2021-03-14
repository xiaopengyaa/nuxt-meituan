<template>
  <div class="page-product">
    <el-row>
      <el-col :span="19">
        <crumbs :keyword="keyword" />
        <categroy :types="types" :areas="areas" />
        <list :list="list" />
      </el-col>
      <el-col :span="5">
        <amap
          ref="amapDom"
          :v-if="point.lenght > 0"
          :width="230"
          :height="290"
          :point="point"
          class="amap"
          :style="'top:' + amapTop + 'px'"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Crumbs from '@/components/products/crumbs'
import Categroy from '@/components/products/productsCategroy'
import List from '@/components/products/productsList'
import Amap from '@/components/public/map'
export default {
  components: {
    Crumbs,
    Categroy,
    List,
    Amap,
  },
  async asyncData(ctx) {
    const keyword = ctx.query.keyword
    const city = ctx.store.state.geo.position.city
    const {
      status,
      data: { count, pois },
    } = await ctx.$axios.get('/search/resultsByKeywords', {
      params: {
        keyword,
        city,
      },
    })
    const {
      status: status2,
      data: { areas, types },
    } = await ctx.$axios.get('/categroy/crumbs', {
      params: {
        city,
      },
    })
    if (status === 200 && count > 0 && status2 === 200) {
      // 做后端数据在前端的映射,前端自己的数据结构
      return {
        list: pois
          .filter((item) => item.photos.length)
          .map((item) => {
            return {
              type: item.type,
              img: item.photos[0].url,
              name: item.name,
              comment: Math.floor(Math.random() * 10000), // 评论数据是随机的，因为真正的电商的评论数据是非常难拿到的
              rate: Number(item.biz_ext.rating), // 可能后端的数据不规范，只能在前端做数据校验
              price: Number(item.biz_ext.cost),
              scene: item.tag,
              tel: item.tel,
              status: '可订明日',
              location: item.location,
              module: item.type.split(';')[0],
            }
          }),
        keyword,
        areas: areas.filter((item) => item.type !== '').slice(0, 5),
        types: types.filter((item) => item.type !== '').slice(0, 5),
        point: (pois.find((item) => item.location).location || '').split(','),
      }
    }
  },
  data() {
    return {
      list: [],
      types: [],
      areas: [],
      keyword: '',
      point: [],
      amapTop: '',
    }
  },

  mounted() {
    if (sessionStorage.getItem('city')) {
      this.city = sessionStorage.getItem('city')
      this.$store.commit('geo/setPosition', {
        city: this.city,
      })
    }
    // 监听滚动条
    window.addEventListener('scroll', this.scollTop, true)
  },
  methods: {
    scollTop() {
      // 滚动条的高度
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      // 可视区的高度

      if (scrollTop > 230) {
        this.amapTop = 0
      } else {
        this.amapTop = 200
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/css/products/index.scss';
.amap {
  position: fixed;
  right: 150px;
}
</style>
