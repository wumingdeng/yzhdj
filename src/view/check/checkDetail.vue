<template>
	<f7-page>
		<f7-card v-for='check in dataList' :key='check.data'>
			<f7-card-content>
				<f7-grid :no-gutter='true'>
					<f7-col width=20 >
						<div>
							{{check.data}}周
						</div>
					</f7-col>
					<f7-col width=80>
						<div>
							计划体检日期：{{check.pre_data}}<span style='float:right'>{{sortStatusLabel(check.status)}}</span>
						</div>		
						<div>
							实际体检日期：{{check.act_data}}
						</div>		
						<div>
							体检内容：{{check.con}}
						</div>		
						<div>
							注意事项：{{check.care}}
						</div>		
					</f7-col>
				</f7-grid>
				<f7-grid v-if='check.status==0||3'>
					<f7-col>
						<div style='float:right'>
							<f7-button @click="$router.push('/record')">{{sortButtonTitle(check.status)}}</f7-button>
						</div>
					</f7-col>
				</f7-grid>
			</f7-card-content>
		</f7-card>
	</f7-page>
</template>

<script type="text/javascript">
	export default {
		data() {
			return {
				content:[]
			}
		},
		props:['dataList'],
		mounted() {
			
		},
		computed:{
			
		},
		methods:{
			sortButtonTitle(status) {
				switch(status){
					case 1:
						return '预约陪检'
					case 2:
						return '体检完成'
					default:return '';
				}
				return '';
			},
			sortStatusLabel(status) {
				switch(status){
					case 0:
						return '未开始'
					case 1:
						return '未预约时间'
					case 2:
						return '已预约未完成'
					case 3:
						return '已完成'
					default:return '';
				}
				return '';
			}
		}
	}
</script>

<style>
	
</style>