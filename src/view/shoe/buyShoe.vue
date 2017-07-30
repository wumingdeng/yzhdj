<template>
  <!-- <f7-page> -->
  <f7-picker-modal id="buy-picker" :opened="pickerOpened" style="height:auto;background-color:#ffffff">
		<f7-block class="baseArea">
			<f7-grid name="baseInfo">
				<f7-col width=40>
					<img class="shoeImg" :src="selectColorImg">
				</f7-col>
				<f7-col width=60>
					<p style="margin-bottom:0.5em;font-size:1.2em;color:#1f2d3d;">{{productDetail.name}}</p>
					<p style="font-size:1.2em;margin:0;color:#ff0000;">优惠价: <span style="color:#ff0000">{{productDetail.price}} 元</span></p>
<!--           <f7-link 
            class="closeBtn"
            @click="onClose"
          >关闭</f7-link> -->
          <img src="static/assets/shoe/guanbi.png" class="closeBtn" @click="onClose">
				</f7-col>
			</f7-grid>
			<div class="partingLine"></div>
			<f7-grid>
        <f7-col width=20>
          <p class="selectItem">尺码</p>
        </f7-col>
        <f7-col width=80>
  				<ul style="padding:0;margin:0">
  					<li v-for="(item,index) in sizeArray"
  						class="selectItem"
  						:key='index'
  						@click="nowSize = item"
  					>
  						<a class="normalItem" :class="{isSelected:onTouchSize(item)}">
  							<span>{{item}}</span>
  						</a>
  					</li>
  				</ul>
        </f7-col>
			</f7-grid>

			<div class="partingLine"></div>

      <f7-grid>
        <f7-col width=20>
          <p class="selectItem">颜色</p>
        </f7-col>
        <f7-col width=80>
          <ul style="padding:0;margin:0">
            <li v-for="(item,index) in colorArray"
              class="selectItem"
              :key='index'
              @click="onClickColor(item)"
            >
              <a class="normalItem" :class="{isSelected:onTouchColor(item.color)}">
                <span>{{item.color}}</span>
              </a>
            </li>
          </ul>
        </f7-col>
      </f7-grid>

			<div class="partingLine"></div>

      <f7-grid>
        <f7-col width=20>
          <p class="selectItem">鞋型</p>
        </f7-col>
        <f7-col width=80>
          <ul style="padding:0;margin:0">
            <li v-for="(item,index) in typeArray"
              class="selectItem"
              :key='index'
              @click="nowType = item"
            >
              <a class="normalItem" :class="{isSelected:onTouchType(item)}">
                <span>{{item}}</span>
              </a>
            </li>
          </ul>
        </f7-col>
      </f7-grid>	

      <div style="height:30px;"></div>
		</f7-block>
    <div class="navFooter">
        <span><f7-button class="pre" @click="onBuy">立即购买</f7-button></span>
    </div>
  </f7-picker-modal>
  <!-- </f7-page> -->
</template>

<script>
  export default {
  	data() {
  		return {
  			nowSize:null,	//当前选择的尺码
  			nowColor:null,
  			nowType:null,
  			productDetail:{},
        selectColorImg:null
  		}
  	},
    props:['pickerOpened'],
  	computed:{
  		sizeArray() {
  			if (this.productDetail && this.productDetail.size) {
  				return this.productDetail.size.split(',')
  			} else {
  				return []
  			}
  		},
  		colorArray() {
  			if (this.productDetail && this.productDetail.color) {
          var colorArr = JSON.parse(this.productDetail.color)
          var tempArr = []
          for(var key in colorArr) {
            var item = colorArr[key]
            var obj = {
              color: key,
              img: item
            }
            tempArr.push(obj);
          }
  				return tempArr
  			} else {
  				return []
  			}
  		},
  		typeArray() {
  			if (this.productDetail && this.productDetail.type) {
  				return this.productDetail.type.split(',')
  			} else {
  				return []
  			}
  		}
  	},
  	methods:{
      onClickColor(item) {
        this.nowColor = item.color; 
        this.selectColorImg = item.img
      },
  		onTouchSize(item) {
  			return item == this.nowSize
  		},
  		onTouchColor(item) {
  			return item == this.nowColor
  		},
  		onTouchType(item) {
  			return item == this.nowType
  		},
  		onBuy() {
  			if (!this.nowSize) {
  				this.$f7.alert('',"请选择合适的鞋码")
  				return
  			}
  			if (!this.nowColor) {
  				this.$f7.alert('',"请选择喜欢的颜色")
  				return
  			}
  			if (!this.nowType) {
  				this.$f7.alert('',"请选择合适的鞋型")
  				return
  			}
  			this.$store.commit('SHOE_SIZE',this.nowSize)
  			this.$store.commit('SHOE_COLOR',this.nowColor)
  			this.$store.commit('SHOE_TYPE',this.nowType)
        this.$store.state.nowPicture = this.selectColorImg;
        // this.$emit('close');
        this.$f7.closeModal(null,false)
  			this.$router.push('/address')
  		},
      onClose() {
        this.$emit('close');
      }
  	},
  	mounted() {
  		this.productDetail = this.$store.state.productDetail;
  		this.nowSize = this.$store.state.shoeSize;
  		this.nowColor = this.$store.state.shoeColor;
  		this.nowType = this.$store.state.shoeType;
      this.selectColorImg = this.$store.state.nowPicture || (this.colorArray[0] && this.colorArray[0].img || "")
      // this.onClickColor(this.colorArray[0]);
  	}
  }
</script>

<style scoped>
  .baseArea {
    background-color: #ffffff;
    margin-top: 0;
    overflow: hidden;
  }
	.shoeImg {
		width: 30%;
    position: absolute;
    top: -45px;
    text-align:center;
    border:1px solid #a1a1a1;
    padding:5px 5px; 
    background:#ffffff;
    border-radius:5px;
	}
  .closeBtn {
    position: absolute;
    top: 10px;
    right: 15px;
  }
	.partingLine {    
		content: '';
		margin:10px 0;
    left: 0;
    bottom: 0;
    right: auto;
    top: auto;
    height: 1px;
    width: 100%;
    background-color: #e1e1e1;
    display: block;
    z-index: 15;
    -webkit-transform-origin: 50% 100%;
    transform-origin: 50% 100%;
	}
	.selectItem {    
		float: left;
    position: relative;
    margin: 0 20px 10px 0;
    vertical-align: middle;
    width: 3em;
    line-height: 20px;
    background: #FFF;
	}
	.normalItem {
    color: #3C3C3C;
		display: inline-block;
    white-space: nowrap;
    text-decoration: none;
    padding: 3px 6px;
    min-width: 10px;
    width: 100%;
    text-align: center;
    border: 1px solid #DCDCDC;
    background: #FFF;
    -moz-transition-property: border-color,background;
    -o-transition-property: border-color,background;
    -webkit-transition-property: border-color,background;
    transition-property: border-color,background;
    -moz-transition-duration: 1s;
    -o-transition-duration: 1s;
    -webkit-transition-duration: 1s;
    transition-duration: 1s;
	}
	.isSelected {
		padding: 2px 5px;
    color: #fa7699;
    border: 2px solid #fa7699;
	}
  .navFooter {
      height: 50px;
      line-height: 50px;
      background: #fff;
      position: fixed;
      width: 100%;
      min-width: 320px;
      bottom: 0;
      left: 0;
      z-index: 900;
      border-top: 1px solid #eaa6c8;
  }
  .navFooter span {
    margin:0;
  }
  .pre {
      width:100%;
      height: 50px;
      line-height: 50px;
      border: none;
      color: #ffffff;
      font-size: 20px;
      margin:0;
      padding: 0;
      background-color:#fa7699;
      border-radius:0;
  }
</style>