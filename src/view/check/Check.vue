<template>
  <f7-page>
  <f7-block style="margin:100px 0px 50px 0px;background-color:#ffffff;padding:0 15px 0px 5px;">
				<f7-grid>
					<f7-col width=33 @click.native="onClickIcon(1)">
						<img class="home_icon_img" src='/static/client/home/item1.jpg'>
					</f7-col>
					<f7-col width=33 @click.native="onClickIcon(2)">
						<img class="home_icon_img" src='/static/client/home/item2.png'>
					</f7-col>
				</f7-grid>
			</f7-block>
   <f7-card>
      <f7-card-content style="height:200px;text-align:center">月子初体验</f7-card-content>
    </f7-card>
    <f7-swiper :params="{slidesPerView: 3, spaceBetween: 10}" pagination next-button prev-button scrollbar style="height:100px">
      <f7-swiper-slide v-for="n in meun" :key="n" class="bg-white color-black">{{n}}</f7-swiper-slide>
    </f7-swiper>
  </f7-page>
</template>
<script>
  import custitle from '../../components/title'
  import moment from 'moment'
export default {
  name: 'check',
  data() {
    return {
      meun:['催乳师','新生儿专家','妇产科专家','营养调理师']
    }
  },
  components: {
  },
  computed: {
    
  },

  methods: {
    onClickIcon(index){
      
    }
  },
  beforeCreate() {
   
  },
  mounted() {
    

  },
  beforeRouteEnter(to, from, next) {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.custom {
  width: 30%;
}

.custom input {
  text-align: right;
}

.page div {
  border-radius: 10px;
}

.cusBtn {
  border-radius: 5px;
  background-color: #fa7699;
  height: 35px;
  line-height: 32px;
}

.cusareatext textarea {
  font-size: 17px;
}
</style>
