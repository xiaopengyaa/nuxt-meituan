<template>
  <div class />
</template>

<script>
export default {
  layout: 'blank',
  // 利用中间件去做推出功能,因为退出页面没有操作控件,只有让他自动触发
  async middleware(ctx) {
    const { status, data } = await ctx.$axios.get('/users/exit')
    if (status === 200 && data && data.code === 0) {
      location.href = '/'
    }
  },
}
</script>
