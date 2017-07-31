<template>
  <div style="height:auto;position:relative;">
    <f7-swiper name="testSwiper" :params="{slidesPerView: 4, spaceBetween: 10}" style="height:auto">
      <f7-swiper-slide class="bg-white color-black" v-for="(item,index) in swipeData" :key='index'>
        <img class="swipeImg" :src="item.url || item">
        <f7-label>工具名称</f7-label>
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