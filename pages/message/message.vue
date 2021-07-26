<template>
	<view>
		<view class="message">
			<view class="header">
				<view class="desc">{{sendTime}}</view>
				<view class="opt" @tap="deleteMsg()">刪除</view>
			</view>
			<view class="content">{{msg}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: null, // 理解成訊息ID
				readFlag: null,
				refId: null, // 理解成使用者ID
				sendTime: '',
				msg: ''
			}
		},
		onShow: function(){
			let that = this
			uni.setNavigationBarTitle({
				title: "系統通知"
			})
			that.ajax(that.url.searchMessageById, "POST", {"id":that.id},function(resp){
				let result = resp.data.result
				that.sendTime = result.sendTime
				that.msg = result.msg
			})
		},
		onLoad: function(options){ // 只會加載一次，跳轉回該頁面不會再加載，options來自於message_list透過:to傳來的東西
			let that = this
			that.id = options.id
			that.readFlag = options.readFlag == "true" ? true : false
			that.refId = options.refId
			if(!that.readFlag){ //未讀時
				that.ajax(that.url.updateUnreadMessage, "POST", {"id": that.refId}, function(resp){
					console.log("消息更新成已讀狀態")
				})
			}
		},
		methods: {
			deleteMsg: function(){
				let that = this
				uni.showModal({ // 彈出對話塊
					title: "提示信息",
					content: "是否要刪除這條消息?",
					success: function(resp){
						if(resp.confirm){
							that.ajax(that.url.deleteMessageRefById, "POST", {"id": that.refId}, function(resp){
								uni.showToast({
									icon: "success",
									title: "刪除成功",
									complete: function(){ // Toast消失後要做什麼動作
										setTimeout(function(){
											uni.navigateBack({ // 退回到上一個頁面
												delta: 1
											})
										}, 1000)
									}
								})
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('message.less');
</style>
