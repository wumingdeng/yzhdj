<template>
  <f7-page name="recordPage" navbar-through id="withdrawPage" infinite-scroll :infinite-scroll-preloader="isPreloader" @infinite="onInfinite">
    <f7-navbar sliding>
      <f7-nav-left>
          <f7-link icon="icon-back color-black color-black" @click="$router.go(-1)"></f7-link>
      </f7-nav-left>
      <f7-nav-center sliding title="历史记录"></f7-nav-center>
      <f7-nav-right></f7-nav-right>
    </f7-navbar>
    <!-- <f7-page style='margin-top:15px'> -->
    <div v-if="isNoData"
      style="text-align:center;height:100%;" 
    >
      <span style="height:100%;vertical-align:middle;display:inline-block;"></span>
      <img style="vertical-align:middle;" src="static/assets/no_records.png">
    </div>

    <f7-card v-if="!isNoData" style='border-radius:10px'>
      <f7-card-header><div style='margin-left:10px;font-size:17px'><span style='color:#fa7190;float:left;font-family:hcpfont;margin-top:2px'>*&nbsp;</span><span style='margin-left:10px;color:#000000;font-weight:bold'>体重曲线</span></div></f7-card-header>
      <f7-card-content style="margin-top:-30px">
        <div id="charts">
            <div id="myChart"  :style="{width:'390px',height:'330px'}"></div>
        </div>
      </f7-card-content>
    </f7-card>
    <f7-card v-if="!isNoData" style='border-radius:10px;padding:5px'>
    <f7-card-header><div style='margin-left:10px'><span style='color:#fa7190;float:left;font-family:hcpfont;margin-top:2px'>*&nbsp;</span><span style='margin-left:10px;color:#000000;font-weight:bold'>历史记录</span></div></f7-card-header>
    <f7-table card>
      <f7-table-row>
        <f7-table-cell label :style="columnStyle_head">日期</f7-table-cell>
        <f7-table-cell label :style="columnStyle_head">孕周</f7-table-cell>
        <f7-table-cell numeric :style="columnStyle_head">体重 (kg)</f7-table-cell>
        <f7-table-cell label :style="columnStyle_head">状态</f7-table-cell>
      </f7-table-row>
      <f7-table-row v-for="(item,index) in weightInfo" :key="index">
        <f7-table-cell label :style="index==(weightInfo.length-1)?columnStyle_end:columnStyle_right" v-show="item.recordDate">
            {{getRecordDate(item.recordDate)}}
        </f7-table-cell>
        <f7-table-cell label style='background-color:#fff5f7' :style="index==(weightInfo.length-1)?columnStyle_end:columnStyle_left" >
          {{item.week}}
        </f7-table-cell>
        <f7-table-cell numeric :style="index==(weightInfo.length-1)?columnStyle_end:columnStyle_right">
          {{item.weight}}
        </f7-table-cell>
        <f7-table-cell label style='background-color:#fff5f7' :style="index==(weightInfo.length-1)?columnStyle_end:columnStyle_right_end" v-if="item.result">
          {{item.result}}
        </f7-table-cell>
      </f7-table-row>
    </f7-table>
    </f7-card>
     <!-- </f7-page> -->
  </f7-page>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入饼图组件
  require('echarts/lib/chart/line')
  // require('echarts/lib/component/dataZoom');
  require('echarts/lib/component/tooltip');
  require('echarts/lib/component/markLine');
  var moment
  require.ensure('moment',function(){
    moment = require('moment');
  }, 'moment')
  // import moment from 'moment'
  export default {
    data () {
      return {
        ds:' ',
        columnStyle_right: 'border-right: 1px solid #e5e5e5;border-bottom:1px solid #e5e5e5; text-align: center',
        columnStyle_right_end: 'border-bottom:1px solid #e5e5e5; text-align: center',
        columnStyle_left: 'border-right: 1px solid #e5e5e5;border-bottom:1px solid #e5e5e5; text-align: center',
        columnStyle_head: 'border-right: 1px solid #e5e5e5;background-color:#fa7190;color:#ffffff; text-align: center;font-size:17px;white-space:nowrap',
        columnStyle_end:'border-right: 1px solid #e5e5e5; text-align: center;',
        isNoData:true,
        page:1,
        pageCount:10,
        isPreloader:true,
        chartData:[],
        weightInfo:[
          // {
          //   recordDate:'2017-5-1',
          //   week:'0',
          //   weight:30,
          //   result:'正常'
          // },
          // {
          //   recordDate:'2017-5-1',
          //   week:'1',
          //   weight:41,
          //   result:'正常'
          // },
          // {
          //   recordDate:'2017-5-1',
          //   week:'2',
          //   weight:45,
          //   result:'正常'
          // },
          // {
          //   recordDate:'2017-5-1',
          //   week:'3',
          //   weight:50,
          //   result:'正常'
          // },
          // {
          //   recordDate:'2017-5-1',
          //   week:'4',
          //   weight:100,
          //   result:'正常'
          // }
        ]
      }
    },
    methods:{
      //显示图表
      showCharts() {
        var self = this;
        var options = {
          title: {
              text: '体重'
          },
          tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                  return '孕期:第' + params[0].data[0] + '周' + '<br>体重: ' + params[0].data[1] + 'kg';
              }
          },
          xAxis: {
              name: '孕期 (周)',
              nameLocation: 'middle',
              nameGap: 20,
              // interval:1,
              boundaryGap: false,
              type: 'value',
              min: 0,
              max: 40
              // interval:1,
              // data: self.chartData.map(function (item) {
              //     return item.week;
              // })
          },
          yAxis: {
              splitLine: {
                  show: true
              },
              name:'体重 (kg)',
              min: 30
          },
          // toolbox: {
          //     left: 'center',
          //     feature: {
          //         dataZoom: {
          //             yAxisIndex: 'none'
          //         },
          //         restore: {},
          //         saveAsImage: {}
          //     }
          // },
          // dataZoom: [{
          //     startValue: 0
          // }, {
          //     type: 'inside'
          // }],
          series: {
              name: '体重',
              type: 'line',
              data: self.chartData.map(function (item) {
                  if (item.week <= 40)
                    return [item.week, item.weight];
              }),
              smooth:true,
              areaStyle: {normal: {
                color:'#dd5555'
              }},
              // markLine: {
              //     silent: true,
              //     data: [{
              //         yAxis: 30
              //     }, {
              //         yAxis: 40
              //     }, {
              //         yAxis: 50
              //     }, {
              //         yAxis: 60
              //     }, {
              //         yAxis: 70
              //     }]
              // }
          }
        }

        let chartBox = document.getElementById('charts')
        let myChart = document.getElementById('myChart')

        // 用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
        function resizeCharts () {
          console.log("en?")
          console.log(chartBox.offsetWidth)
          myChart.style.width = chartBox.offsetWidth + 'px'
          myChart.style.height = chartBox.style.height + 'px'
        }
        // 设置容器高宽
        resizeCharts()
              
        let mainChart = echarts.init(myChart)
        mainChart.setOption(options)
      },
      onInfinite(event, done){
        //获取数据
        this.getWeightData(done);
      },

      getRecordDate(date){
        console.log(date)
        var date = moment(date).format("YYYY-MM-DD")
        // date = new Date(date).toLocaleString(); //转化成本地时间
        return date
      },
      getChartData(data) {
        //取折线图数据
        this.$store.dispatch('getWeightChart',{
          self:this,
          info:{
            // wxid:this.$store.state.wxid
          },
          callback(self,res) {
            if (res.body.ok != 0) {
              self.chartData = res.body.ok
              if (self.chartData[0] && self.chartData[0].week != 0) {
                self.chartData.unshift({
                  week: 0,
                  weight: self.$store.state.userinfo.weight
                })
              }
              self.showCharts();
            }
          }
        })
      },
      getWeightData(callback) {
        this.$store.dispatch('getWeightData',{
          self:this,
          info:{
              wxid:this.$store.state.wxid,
              offset:(this.page - 1) * this.pageCount,
              limit:this.pageCount
          },
          callback:(self,res)=>{
              self.weightInfo = self.weightInfo.concat(res.body.ok)
              if (res.body.ok.length > 0) {
                  self.isNoData = false;
                  this.getChartData();
              }
              if (res.body.ok.length < self.pageCount) {
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
      }
    },

    mounted () {
      // this.$f7.resize()
      this.$f7.initPageInfiniteScroll('#app');

      //取每条记录
      this.getWeightData();
    }
  }
</script>

<style scoped>
 
 .data-table td, .data-table th{
    padding: 0;
    position:0;
    padding-left: 0px;
    padding-right: 0px;
    height: 44px;
 }
 .data-table table{
   text-align:center;
 }
</style>

