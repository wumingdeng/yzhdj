<template>
  <f7-page id="orderPage" infinite-scroll :infinite-scroll-preloader="isPreloader" @infinite="onInfinite">
    <f7-navbar sliding>
      <f7-nav-left>
        <f7-link icon="icon-back color-black" @click="$router.push('/shoeDetail')"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding style="left:-22px;" title="我的订单"></f7-nav-center>
      <f7-nav-right></f7-nav-right>
    </f7-navbar>
    <f7-page-content style="margin-top:44px;">
      <div v-if="orderArr.length==0" style="float:left;width:100%;">
        <p style="margin-top:50px;text-align:center;">暂无订单</p>
      </div>
      <orderCell v-for="(cell,index) in orderArr" :orderData="cell" :key="index"></orderCell>
      <div v-show="orderArr.length>0 && !isPreloader" style="width:100%;">
        <p style="margin-bottom:50px;text-align:center;">没有更多订单了</p>
      </div>
      <div style="height:50px;"></div>
    </f7-page-content>
  </f7-page>
</template>

<script>
import navFooter from './navFooter'
import orderCell from './orderCell'
export default {
  data() {
    return {
      isNoData: true,
      orderArr: [
        {},
        {},
        {},
        {}
      ],
      page: 1,
      pageCount: 10,
      isPreloader: true,
      popupOpened: false,
      haveData: false,
    }
  },
  components: {
    "navFooter": navFooter,
    'orderCell': orderCell
  },
  methods: {

  },
  getLogisticsDate(str) {
    var date = str.substring(0, 10)
    date = date.replace(/\-/, '  ')
    //同一天只显示一次
    if (this.dateObj[date]) {
      return ''
    } else {
      this.dateObj[date] = true
      return date
    }
  },
  getLogisticsTime(str) {
    return str.substring(11)
  },
  onInfinite(event, done) {
    //获取数据
    console.log('pulldown...')
    this.getData(done);
  },
  getData(callback) {
    this.$store.dispatch('orderlistUser', {
      self: this,
      info: {
        uid: this.$store.state.wxid,
        offset: (this.page - 1) * this.pageCount,
        limit: this.pageCount
      },
      callback: (self, res) => {
        self.orderArr = self.orderArr.concat(res.body.w)
        if (res.body.w.length > 0) {
          self.isNoData = false;
        }
        if (res.body.w.length < self.pageCount) {
          //停止加载
          self.$f7.detachInfiniteScroll('.infinite-scroll')
          self.isPreloader = false;
          console.log('stoppredown...')
        }
        if (callback) {
          callback();
        }
      }
    })
    this.page++;

  },
  mounted() {
    //取订单数据
    this.$f7.initPageInfiniteScroll('#app');
    this.getData();
  }
}
</script>

<style>
.timeline-item-divider {
  background: #fa7699;
}

.content-block-inner .timeline-item-inner {
  border-radius: 5px;
  border: 1px solid rgba(214, 22, 22, 0.3);
}
</style>