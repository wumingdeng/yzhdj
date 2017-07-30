<template>
  <f7-views style='z-index:1000;' id="app">
    <div v-show="showLoading" class="loading" 
    >
      <span style="height:100%;vertical-align:middle;display:inline-block;"></span>
      <div style="vertical-align:middle;display:inline-block;">
        <img style="vertical-align:middle" 
        :src="loadingImg"
        ></img>
        <p style="display:block;margin-top:0">载入中...</p>
      </div>
      </img>
    </div>
    <router-view></router-view>
  </f7-views>
</template>

<script>
    // import navFooter from './views/navFooter'
    import g from './globals/global.js'
    import wxApi from './utils/wxApi.js'
    export default {
        data () {
          return {

          }
        },
        mounted () {
            console.log('enter app')
        },
        created () {
          console.log(this)
        },
        computed:{
          showLoading() {
            return Global.s.state.isloading
          },
          loadingImg() {
            return "static/assets/loading.gif"+Global.verStr
          }
        }
    }
</script>

<style>
  label.label-checkbox input[type=checkbox]:checked+.item-media i.icon-form-checkbox{
    background-color: #fc5475
  }
  i.icon.icon-back {
    background-image: url(data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D'http%3A%2F%2Fwww.w3.org%…-8%2C8l8%2C8l-2%2C2L0%2C10L10%2C0z'%20fill%3D'%23007aff'%2F%3E%3C%2Fsvg%3E);
  }
  .loading {
    text-align:center;
    width:100%;
    height:100%;
    z-index:999;
    position:absolute;
    top:0;
    left:0
  }
</style>
