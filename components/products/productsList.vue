<template>
  <div class="m-products-list">
    <dl>
      <dd
        v-for="item in nav"
        :key="item.name"
        :class="[item.name, item.acitve ? 's-nav-active' : '']"
        @click="navSelect(item.txt)"
      >
        {{ item.txt }}
      </dd>
    </dl>
    <ul>
      <Item v-for="(item, idx) in list" :key="idx" :meta="item" />
    </ul>
  </div>
</template>

<script>
import Item from './product.vue'
export default {
  name: 'ProductsList',
  components: {
    Item,
  },
  props: {
    list: {
      type: Array,
      default() {
        return []
      },
    },
  },
  async asyncData({ app }) {
    const { data } = await app.$axios.get('searchList')
    return { items: data.list }
  },
  data() {
    return {
      nav: [
        {
          name: 's-default',
          txt: '智能排序',
          acitve: true,
        },
        {
          name: 's-price',
          txt: '价格最低',
          active: false,
        },
        {
          name: 's-visit',
          txt: '人气最高',
          active: false,
        },
        {
          name: 's-comment',
          txt: '评价最高',
          active: false,
        },
      ],
      point: [],
    }
  },
  created() {
    this.addHeight()
  },
  mounted() {
    // 监听滚动条
    window.addEventListener('scroll', this.scollTop, true)
  },
  methods: {
    addHeight() {
      let heig = 0
      this.list.forEach((item) => {
        item.topHeight = 350 + heig
        heig += 170
      })
    },
    navSelect(name) {
      this.nav.forEach((item) => {
        // 高亮显示
        if (item.txt === name) {
          item.acitve = true
        } else {
          item.acitve = false
        }
        // 排序
        if (item.txt === '智能排序' && item.acitve) {
          this.list.sort((a, b) => {
            return b.price - a.price
          })
        } else if (item.txt === '价格最低' && item.acitve) {
          this.list.sort((a, b) => {
            return a.price - b.price
          })
        } else if (item.txt === '人气最高' && item.acitve) {
          this.list.sort((a, b) => {
            return b.comment - a.comment
          })
        } else if (item.txt === '评价最高' && item.acitve) {
          this.list.sort((a, b) => {
            return b.rate - a.rate
          })
        }
        this.addHeight()
      })
    },

    // 滚动条监听
    scollTop() {
      // 滚动条的高度
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop
      // 可视区的高度
      this.list.forEach((item) => {
        if (scrollTop > item.topHeight) {
          this.point = item.location.split(',')
        }
      })
      this.$store.commit('home/setPoint', this.point)
    },
  },
}
</script>
