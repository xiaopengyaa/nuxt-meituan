<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item in list"
        :key="item.id"
        class="tab"
        @click="changCity(item.name === '市辖区' ? item.province : item.name)"
      >
        {{ item.name === '市辖区' ? item.province : item.name }}
      </dd>
    </dl>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      list: [],
    }
  },
  async mounted() {
    const {
      status,
      data: { hots },
    } = await axios.get('/geo/hotCity')
    if (status === 200) {
      this.list = hots
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
@import '@/assets/css/changeCity/hot.scss';
.tab:hover {
  color: #41b883;
  cursor: pointer;
}
</style>
