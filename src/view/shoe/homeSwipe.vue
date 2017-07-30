<template>
  <div style="height:auto;position:relative;">
    <!-- <f7-navbar back-link="Back" title="Swiper" sliding></f7-navbar> -->

    <f7-swiper name="testSwiper" :params='{autoplayDisableOnInteraction:false,loop:false,autoplay:3000}' pagination style="height:auto">
      <f7-swiper-slide class="bg-white color-black" v-for="(item,index) in swipeData" :key=index>
        <img class="swipeImg" :src="item.url || item">
      </f7-swiper-slide>
    </f7-swiper>
  </div>
</template>

<script>
  // var fs = require('fs')
  // import { mapGetters } from 'vuex'
	export default {
	    data () {
	      return {
          content:[]
	      }
	    },
      props:['swipeData'],
      methods: {

      },
      created () {
        // this.getContent();
        console.log('created...')
        // this.content = this.$store.state.swipeData;
        this.content = [
          '/static/client/swipe/swipe1.jpg',
          '/static/client/swipe/swipe2.jpg',
          '/static/client/swipe/swipe3.jpg',
          '/static/client/swipe/swipe4.jpg'
        ]
      },
      // computed: mapGetters([
      //   // 映射 this.swipeData 为 store.state.swipeData
      //   'swipeData'
      // ]),
      mounted () {
      }
	}
</script>

<style>
    .swipeImg {
      width:100%;
    }
</style>