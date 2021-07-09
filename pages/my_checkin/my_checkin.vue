<template>
	<view>
		<view class="statistics">
			<image src="../../static/big-icon-1.png" class="big-icon" mode="widthFix"></image>
			<view class="report-title">
				<text class="days">{{sum_1}}</text>
				<text class="unit">天</text>
			</view>
			<view class="sub-title">
				<text>本月簽到</text>
			</view>
			<view class="report">
				<view class="column green">
					<text class="column-title">正常簽到</text>
					<text class="number">{{sum_1}}</text>
				</view>
				<view class="column orange">
					<text class="column-title">遲到簽到</text>
					<text class="number">{{sum_2}}</text>
				</view>
				<view class="column red">
					<text class="column-title">缺勤簽到</text>
					<text class="number">{{sum_3}}</text>
				</view>
			</view>
		</view>
		<view class="calendar-container">
			<!-- 插入模式，不顯示農曆，顯示小紅點 -->
			<uni-calendar :insert="true" :lunar="false" :selected="list" 
			@monthSwitch="changeMonth" @confirm="changeMonth" ></uni-calendar>
		</view>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'; // 引入日歷插件
	export default {
		components:{
			uniCalendar
		},
		data() {
			return {
				list:[],
				sum_1: 0,
				sum_2: 0,
				sum_3: 0
			}
		},
		onShow: function(){
			let that=this
			let date=new Date() // 現在
			let year=date.getFullYear() // 四位數年
			let month=date.getMonth()+1 // 因為本來是0-11
			that.searchCheckin(that,year,month)
		},
		methods: {
			searchCheckin: function(ref,year,month){
				let that=ref
				that.sum_1=0 // 歸零
				that.sum_2=0
				that.sum_3=0
				that.list.length=0 // 徹底把本來的東西回收
				that.ajax(that.url.searchMonthCheckin, "POST", {year:year, month:month}, function(resp){
					for(let one of resp.data.list){
						if(one.status!=null && one.status!=""){
							let color=""
							if(one.status=="正常"){
								color="green"
							}
							else if(one.status=="遲到"){
								color="orange"
							}
							else if(one.status=="缺勤"){
								color="red"
							}
							that.list.push({
								data: one.date,
								info: one.status,
								color: color
							})
						}
					}
					that.sum_1=resp.data.sum_1
					that.sum_2=resp.data.sum_2
					that.sum_3=resp.data.sum_3
				})
			},
			changeMonth: function(e){ //回調函數e
				let that=this
				let year=e.year
				let month=e.month
				that.searchCheckin(that, year, month)
			}
		}
	}
</script>

<style lang="less">
	@import url('my_checkin.less');
</style>