<template>
  <div
    :id="id"
    :style="{ width: width + 'px', height: height + 'px', margin: '34px auto' }"
    class="m-map"
  />
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 300,
    },
    point: {
      type: Array,
      default() {
        return [116.46, 39.92]
      },
    },
  },
  data() {
    return {
      id: `map`,
      key: '41a6dcd9517f1733465197d3a4fb1cfb',
    }
  },
  watch: {
    // 监听point是否变化
    '$store.state.home.point'(val, old) {
      let flag = true
      for (let i = 0; i < 2; i++) {
        if (val[i] !== old[i]) {
          flag = false
        }
      }
      // 当point变化了才更新地图
      if (!flag && val && val.length > 0) {
        this.getMap(val)
      }
    },
  },
  mounted() {
    this.getMap(this.point)
  },
  methods: {
    getMap(point) {
      if (!point || point.length === 0) return
      const self = this
      self.id = `map${Math.random().toString().slice(4, 6)}`
      // 回调函数
      window.onmaploaded = () => {
        const map = new window.AMap.Map(self.id, {
          // 显示定位基点
          showPositionPoint: true,
          resizeEnable: true,
          zoom: 11,
          center: point.length ? point : self.point,
        })
        self.map = map
        window.AMap.plugin('AMap.ToolBar', () => {
          const toolbar = new window.AMap.ToolBar()
          map.addControl(toolbar)
          const marker = new window.AMap.Marker({
            icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
            position: point.length ? point : self.point,
          })
          self.marker = marker
          marker.setMap(map)
        })
      }
      const url = `https://webapi.amap.com/maps?v=1.4.15&key=${self.key}&callback=onmaploaded`
      const jsapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      jsapi.src = url
      document.head.appendChild(jsapi)
    },
  },
}
</script>
