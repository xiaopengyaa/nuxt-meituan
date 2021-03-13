module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/meituan',
  redis: {
    get host() {
      return '127.0.0.1'
    },
    get port() {
      return '6379'
    },
  },
  smtp: {
    get host() {
      return 'smtp.qq.com'
    },
    get user() {
      return '857763476@qq.com'
    },
    get pass() {
      return 'yifofgexoeqibcjh'
    },
    get code() {
      return () => {
        // 随机生成四位邮箱验证码
        return Math.random().toString(16).slice(2, 6).toUpperCase()
      }
    },
    get expire() {
      return () => {
        // 配置验证码有效时间为1分钟
        return new Date().getTime + 60 * 1000
      }
    },
  },
}
