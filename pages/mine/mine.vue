<template>
	<view class="page">
		<view class="user-info">
			<view class="border-outer">
				<view class="border-inner">
					<image :src="photo" mode="widthFix" class="photo"></image>
				</view>
			</view>
			<view class="summary">
				<view>
					<text class="title">姓名</text>
					<text class="value">{{name}}</text>
				</view>
				<view>
					<text class="title">部門</text>
					<text class="value">{{deptName}}</text>
				</view>
				<view>
					<text class="title">狀態</text>
					<text class="value">在職</text>
				</view>

			</view>
		</view>
		<view class="list-little">用戶信息欄目</view>
		<uni-list>
			<uni-list-item title="個人資料" link to=""></uni-list-item>
			<uni-list-item title="我的考勤" link to="/pages/my_checkin/my_checkin"></uni-list-item>
			<uni-list-item title="罰款紀錄" link to=""></uni-list-item>
		</uni-list>
		
		<view class="list-little">系統管理欄目</view>
		<uni-list>
			<uni-list-item title="員工管理" v-show="checkPermission(['ROOT','EMPLOYEE:SELECT'])" link to=""></uni-list-item>
			<uni-list-item title="部門管理" v-show="checkPermission(['ROOT','DEPT:SELECT'])" link to="/pages/my_checkin/my_checkin"></uni-list-item>
			<uni-list-item title="權限管理" v-show="checkPermission(['ROOT','ROLE:SELECT'])" link to=""></uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'; // (1)引用第三方組件，名字自己設
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	
	export default {
		components:{ // (2)引用後還要註冊組件
			uniList,
			uniListItem
		},
		data() {
			return {
				name:"",
				deptName:"",
				photo:""
			}
		},
		onShow: function(){
			let that=this
			that.ajax(that.url.searchUserSummary, "GET", null, function(resp){
				let result=resp.data.result
				that.name=result.name
				that.deptName=result.deptName
				that.photo=result.photo
			})
		},
		methods: {
			
		}
	}
</script>

<style lang = "less">
	@import url("mine.less");
</style>
