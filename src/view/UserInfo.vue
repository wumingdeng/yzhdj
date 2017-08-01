<template>
	<f7-page>
		<f7-card style="margin: 10px 0;box-shadow: 0 1px 1px rgba(0,0,0,.3);">
			<f7-card-content>
				<f7-grid>
					<f7-col width=30>
						<img src='static/client/teacher/head.png' style='width:100%'>
					</f7-col>
					<f7-col width=70>
						<f7-grid style='margin-top:10px'>
							姓名 :
						</f7-grid>
						<f7-grid :no-gutter='true' style='margin-top:20px'>
							<f7-col width=30>
								<f7-label>孕周{{7}}</f7-label>
							</f7-col>
							<f7-col width=70>
								<f7-button style='width:90%' @click="$router.push('/record')">编辑个人资料</f7-button>
							</f7-col>
						</f7-grid>
					</f7-col>
				</f7-grid>
			</f7-card-content>
		</f7-card>
		<f7-card style="margin: 10px 0;box-shadow: 0 1px 1px rgba(0,0,0,.3);">
			<f7-card-header>
				孕期百宝箱
			</f7-card-header>
			<f7-card-content>
				<appExt :swipeData='content'></appExt>
			</f7-card-content>
		</f7-card>
		<f7-list style="margin:15px 0">
			<f7-list-item title="我的订单" link="/order" @click="$router.push('/order')"></f7-list-item>
			<f7-list-item title="我的产检" link="/check" @click="$router.push('/check')"></f7-list-item>
			<f7-list-item title="我的管家" link="/manger" @click="$router.push('/manger')"></f7-list-item>
			<f7-list-item title="帮助信息" link="/"></f7-list-item>
		</f7-list>
	</f7-page>
</template>

<script>
import moment from 'moment'
import appExt from "./appExt";
export default {
	data() {
		return {
			isNecessary: false,
			radio_0: false,
			radio_1: false,
			content: [
				'/static/client/teacher/pro.png',
				'/static/client/teacher/pro.png',
				'/static/client/teacher/pro.png',
				'/static/client/teacher/pro.png'
			]
		}
	},
	components: {
		"appExt": appExt,
	},
	computed: {
		userWeight() {
			return this.$store.state.userinfo.weight;
		},
		userHeight() {
			return this.$store.state.userinfo.height;
		},
		userLastPeroid() {
			// var last = new Date(this.$store.state.userinfo.lastPeriod).toLocaleDateString('yyyy-MM-dd')
			var last = moment(this.$store.state.userinfo.lastPeriod).format("YYYY-MM-DD")
			console.log(last)
			if (last) {
				// last = last.replace(/\-/g,'/')
				return last;
			}
			return '';
		},
		userIsSingle() {
			return this.$store.state.userinfo.isSingle;
		}
	},

	methods: {
		radio_0_fun(event) {
			this.radio_0 = !this.radio_0
			this.radio_1 = false
		},
		radio_1_fun(event) {
			this.radio_1 = !this.radio_1
			this.radio_0 = false
		},
		checkInput() {
			var height = document.getElementById("heightInput").value
			if (!height) {
				this.$f7.alert('', '请输入身高 单位:cm')
				return false
			}
			if (height < 100 || height > 300) {
				this.$f7.alert('', '请输入身高 单位:cm')
				return false
			}
			var weight = document.getElementById("weightInput").value
			if (!weight) {
				this.$f7.alert('', '请输入体重 单位:kg')
				return false
			}

			var lastPeriod = document.getElementById("lastPeriodInput").value
			if (!lastPeriod) {
				this.$f7.alert('', '请选择末次月经时间')
				return false
			}
			var lastTime = new Date(lastPeriod).getTime();
			var now = new Date().getTime();
			if (lastTime + 24 * 60 * 60 * 1000 > now) {
				this.$f7.alert('', '请选择当日之前的时间')
				return false
			}

			var isSingle = this.radio_0 ? 1 : 0
			if (!this.$data.radio_0 && !this.$data.radio_1) {
				this.$f7.alert('', '请选择单胎妊娠')
				return false
			}

			return true;
		},
		onUpdateInfo() {
			if (!this.checkInput()) return;
			this.$f7.showPreloader('保存中...')

			//结果保存到服务端
			var info = {
				// wxid:this.$store.state.wxid,
				height: document.getElementById("heightInput").value,
				weight: document.getElementById("weightInput").value,
				isSingle: this.$data.radio_0 ? 1 : 0,
				lastPeriod: document.getElementById("lastPeriodInput").value
			}
			this.$store.dispatch('updateInfo', {
				self: this,
				info: info,
				callback: function (self, res) {
					self.$store.commit('USERINFO', info);
					//返回
					self.$f7.alert('', '保存成功', () => {
						self.$router.push('/check');
					})
				}
			})
		}
	},

	beforeCreate() {
		document.title = '个人资料'
	},

	mounted() {
		this.$f7.resize()
		this.$f7.init()
		this.isNecessary = this.$route.query.isNecessary || false;
		this.radio_0 = this.$store.state.userinfo.isSingle == 1;
		this.radio_1 = this.$store.state.userinfo.isSingle == 0;
		if (!this.radio_0 && !this.radio_1) {
			this.radio_1 = true;
		}
		document.getElementById('lastPeriodInput').value = this.userLastPeroid
	}
}
</script>

<style scoped>
.custom {
	width: 70%;
}

.custom input {
	text-align: right;
}

.page-content {
	padding-top: 5px;
}

.datainput {
	margin-right: 100px;
}
</style>
