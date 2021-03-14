<template>
  <div class>
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="item in list" :key="item">
        <a :href="'#city-' + item">{{ item }}</a>
      </dd>
    </dl>
    <dl v-for="item in block" :key="item.title" class="m-categroy-section">
      <dt :id="'city-' + item.title">{{ item.title }}</dt>
      <dd>
        <span
          v-for="c in item.city"
          :key="c"
          class="tab"
          @click="changCity(c)"
          >{{ c }}</span
        >
      </dd>
    </dl>
  </div>
</template>

<script>
import pyjs from 'js-pinyin'
export default {
  name: 'CityCategroy',
  data() {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      block: [],
    }
  },
  async mounted() {
    const self = this
    const blocks = []
    const {
      status,
      data: { city },
    } = await self.$axios.get('/geo/city')
    if (status === 200) {
      let p
      let c
      const d = {}
      city.forEach((item) => {
        // p:获取每个城市的首字拼音的首字母
        p = pyjs.getFullChars(item.name).toLocaleLowerCase().slice(0, 1)
        c = p.charCodeAt(0)
        // 判断这个字母是否为a-z
        if (c > 96 && c < 123) {
          if (!d[p]) {
            d[p] = []
          }
          d[p].push(item.name)
        }
      })
      // 将临时数据存在绑定的数据上面
      for (const [k, v] of Object.entries(d)) {
        blocks.push({
          title: k.toUpperCase(),
          city: v,
        })
      }
      // 排序()
      blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
      self.block = blocks
    }
  },
  methods: {
    changCity(city) {
      sessionStorage.setItem('city', city)
      location.href = '/'
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/css/changeCity/categroy.scss';
.tab:hover {
  color: #41b883;
  cursor: pointer;
}
</style>
