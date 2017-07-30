<template>
	<div class="city-select">
    <select v-model="selectedProvince" name="province">
      <option 
      	v-for="(item, index) in provinceArr"
        :value="item">
        {{ item }}
      </option>
    </select>
    <select v-model="selectedCity" name="city">
      <option
        v-for="(item, index) in cityArr"
        :value="item">
        {{ item }}
      </option>
    </select>
    <select v-model="selectedArea" name="block">
      <option
        v-for="(item, index) in areaArr"
        :value="item">
        {{ item }}
      </option>
    </select>
  </div>	
</template>

<script>
	import china from './China.js'
	export default {
		data() {
			return {
        selectedProvince: '',
        selectedCity: '',
        selectedArea: ''
			}
		},
		props: {
			initInfo: {
    		type:Object,
    		default() {
    			return {
    				province:'福建',
    				city: '泉州'
    			}
    		}
    	}
		},
		computed:{
			provinceArr() {
				return china.getProvince()
			},
			cityArr() {
				return china.getCity(this.selectedProvince)
			},
			areaArr() {
				return china.getArea(this.selectedProvince,this.selectedCity)
			},
	    info() {
	      return {
	        province: this.selectedProvince,
	        city: this.selectedCity,
	        area: this.selectedArea
	      }
	    }
		},
		watch:{
			selectedProvince(newVal,oldVal) {
				//更新选中的城市 默认第一个
				var cities = china.getCity(newVal);
				if (cities.indexOf(this.selectedCity) == -1) {
					this.selectedCity = cities[0];
				}
				this.$emit('input', this.info)
			},
			selectedCity(newVal,oldVal) {
				var areas = china.getArea(this.selectedProvince,newVal)
				if (areas.indexOf(this.selectedArea) == -1) {
					this.selectedArea = areas[0];
				}
				this.$emit('input', this.info)
			},
			selectedArea(newVal,oldVal) {
				this.$emit('input', this.info)
			}
		},
		mounted() {
			this.selectedProvince = this.initInfo && this.initInfo.province || this.selectedProvince;
			this.selectedCity = this.initInfo && this.initInfo.city || this.selectedCity;
			this.selectedArea = this.initInfo && this.initInfo.area || this.selectedArea;
		}

	}
</script>

<style scoped>
	.city-select {
		width:100%;
	}
  .city-select select{
  	color: #71777e;
  	width:33%;
  	float:left;
  	display: inline-block;
    outline:0;
    border-width: 2px;
  }
</style>
