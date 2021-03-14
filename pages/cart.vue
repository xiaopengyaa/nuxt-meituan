<template>
  <div class="page-cart">
    <el-row>
      <el-col v-if="1 || cart.length" :span="24" class="m-cart">
        <list :cart-data="cart" />
        <p>
          应付金额：
          <em class="money">￥{{ total }}</em>
        </p>
        <div class="post">
          <el-button type="primary" @click="submit">提交订单</el-button>
        </div>
      </el-col>
      <el-col v-else :span="24" class="empty">2</el-col>
    </el-row>
  </div>
</template>

<script>
import list from '@/components/cart/list'
export default {
  components: {
    list,
  },
  async asyncData(ctx) {
    const {
      status,
      data: {
        code,
        data: { name, price },
      },
    } = await ctx.$axios.post(`/cart/getCart`, {
      id: ctx.query.id,
    })
    if (status === 200 && name && code === 0) {
      return {
        cart: [
          {
            name,
            price,
            count: 1,
          },
        ],
        cartNo: ctx.query.id,
      }
    }
  },
  data() {
    return {
      cart: [],
    }
  },
  computed: {
    total() {
      let total = 0
      this.cart.forEach((item) => {
        total += item.price * item.count
      })
      return total
    },
  },
  methods: {
    async submit() {
      const {
        status,
        data: { code, id },
      } = await this.$axios.post('/order/createOrder', {
        count: this.cart[0].count,
        price: this.cart[0].price,
        id: this.cartNo,
      })
      if (status === 200 && code === 0) {
        this.$alert(`恭喜您，已成功下单，订单号:${id}`, '下单成功', {
          confirmButtonText: '确定',
          callback: (action) => {
            location.href = '/order'
          },
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/css/cart/index.scss';
</style>
