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
			<uni-calendar :insert="true" :lunar="false" :select="list"></uni-calendar>
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
		methods: {
			
		}
	}
</script>

<style lang="less">
	@import url('my_checkin.less');
</style>