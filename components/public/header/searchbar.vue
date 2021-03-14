<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <a href="/">
          <img
            src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png"
            alt="美团"
          />
        </a>
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <el-input
            v-model="search"
            placeholder="搜索商家或地点"
            @focus="focus"
            @blur="blur"
            @input="input"
          ></el-input>
          <button class="el-button el-button--primary" @click="btnSearch">
            <i class="el-icon-search" />
          </button>
          <dl
            v-if="isHotPlace && $store.state.home.hotPlace.length > 0"
            class="hotPlace"
          >
            <dt>热门搜索</dt>
            <dd
              v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)"
              :key="idx"
            >
              <nuxt-link
                :to="'/products?keyword=' + encodeURIComponent(item.name)"
                >{{ item.name }}</nuxt-link
              >
            </dd>
          </dl>
          <dl v-if="isSearchList" class="searchList">
            <dd v-for="(item, idx) in searchList" :key="idx">
              <nuxt-link
                :to="'/products?keyword=' + encodeURIComponent(item.name)"
                >{{ item.name }}</nuxt-link
              >
            </dd>
          </dl>
        </div>
        <p class="suggest">
          <nuxt-link
            v-for="(item, idx) in $store.state.home.hotPlace.slice(0, 5)"
            :key="idx"
            :to="'/products?keyword=' + encodeURIComponent(item.name)"
            >{{ item.name }}</nuxt-link
          >
        </p>
        <ul class="nav">
          <li>
            <nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="apartment">民俗/公寓</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/" class="business">商家入驻</nuxt-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" class="right">
        <ul class="security">
          <li>
            <i class="refund">
              <p class="txt">随时退</p>
            </i>
          </li>
          <li>
            <i class="single">
              <p class="txt">不满意面单</p>
            </i>
          </li>
          <li>
            <i class="overdue">
              <p class="txt">过期退</p>
            </i>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      search: '',
      isFocus: false,
      hotPlace: [],
      searchList: [],
    }
  },
  computed: {
    isHotPlace() {
      return this.isFocus && !this.search
    },
    isSearchList() {
      return this.isFocus && this.search
    },
  },
  async mounted() {
    const {
      status: status3,
      data: { result },
    } = await this.$axios.get('/search/hotPlace', {
      params: {
        city: this.$store.state.geo.position.city.replace('市', ''),
      },
    })
    this.$store.commit('home/setHotPlace', status3 === 200 ? result : [])
  },
  methods: {
    focus() {
      this.isFocus = true
    },
    blur() {
      const self = this
      setTimeout(function () {
        self.isFocus = false
      }, 200)
    },
    input: _.debounce(async function () {
      const self = this
      const city = self.$store.state.geo.position.city.replace('市', '')
      self.searchList = []
      const {
        data: { top },
      } = await self.$axios.get('/search/top', {
        params: {
          input: self.search,
          city,
        },
      })
      self.searchList = top.slice(0, 10)
    }, 300),
    btnSearch() {
      this.$router.push(`/products?keyword=${encodeURIComponent(this.search)}`)
    },
    goto(name) {
      // sessionStorage.setItem("flag", name);
      /* this.$router.push({
        path: "/",
        query: { name: name }
      }); */
    },
  },
}
</script>

<style lang="scss"></style>
