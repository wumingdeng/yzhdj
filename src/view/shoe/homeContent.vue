<template>
	<div class='indexmenu'>
		<ul style="margin:0px 0px;padding-left: 0px;">
			<homeItem 
				v-for="(item,i) in tempData"
				:sdata='item'
				:key='i'
			></homeItem>
		</ul>
	</div>
</template>

<script>
	import homeItem from "./homeItem";
  	import { mapGetters } from 'vuex'
	// import { mapGetters,mapActions } from 'vuex'
	export default {
    data () {
			return {
				tempData:[
					{
						id:1,
						desc_icon:'/static/assets/shoe/server1.jpg',
						name:'1'
					},
					{
						id:2,
						desc_icon:'/static/assets/shoe/server2.jpg',
						name:'1'
					},
					{
						id:3,
						desc_icon:'/static/assets/shoe/server3.jpg',
						name:'1'
					}
				]
			}
    },
    components:{
    	"homeItem":homeItem,
    },
		mounted () {
			console.log('content mounted...')
		},
		created () {
			console.log('content created...')
		},
		computed: mapGetters([
      // 映射 this.swipeData 为 store.state.swipeData
      'serviceData'
    ])
	}
</script>

<style scoped>
	.indexmenu {
	    border-radius: 5px;
	    -webkit-border-radius: 5px;
	    -moz-border-radius: 5px;
	    background: #fff;
	    min-width: 308px;
	    overflow: hidden;
	    margin:-5px 0 7px 0;
	}
	.indexmenu ul {
	    margin: 8px 0 8px 0;
	    overflow: hidden;
	}
</style>