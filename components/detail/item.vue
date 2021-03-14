<template>
  <li v-if="meta.photos.length" class="m-detail-item">
    <dl class="section">
      <dd>
        <img :src="meta.photos[0].url" :alt="meta.photos[0].title" />
      </dd>
      <dd>
        <h4>{{ meta.name }}</h4>
        <p>
          <span v-if="meta.biz_ext && meta.biz_ext.ticket_ordering"
            >剩余：{{ Number(meta.biz_ext.ticket_ordering) }}</span
          >
          <span v-if="meta.deadline">截止日期：{{ meta.deadline }}</span>
        </p>
        <p>
          <span class="price">{{ Number(meta.biz_ext.cost) }}</span>
          <sub>门店价{{ Number(meta.biz_ext.cost) }}</sub>
        </p>
      </dd>
      <dd>
        <el-button type="warning" round @click="createCart">立即抢购</el-button>
      </dd>
    </dl>
  </li>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    meta: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  methods: {
    async createCart() {
      const self = this
      const {
        status,
        data: { code, id },
      } = await axios.post('http://localhost:3000/cart/create', {
        params: {
          // 应该做一个产品库，但那是一个非常大的一件事，是前期必须的工作
          id: Math.random().toString().slice(3, 9),
          // 在客户端获取
          detail: {
            name: self.meta.name,
            price: self.meta.biz_ext.cost,
            imgs: self.meta.photos,
          },
        },
      })
      if (status === 200 && code === 0) {
        this.$router.push(`/cart/?id=${id}`)
      } else {
        console.log('error')
      }
    },
  },
}
</script>

<style lang="scss"></style>
