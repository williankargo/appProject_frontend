<!-- 視圖層 -->
<template>
	<view class="page">
		<swiper circular="true" duration="1000" interval="8000" class="swiper">
			<swiper-item>
				<image mode="widthFix"
					src="https://enos-resource-1306307505.cos.ap-hongkong.myqcloud.com/img/banner/swiper-1.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://enos-resource-1306307505.cos.ap-hongkong.myqcloud.com/img/banner/swiper-2.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://enos-resource-1306307505.cos.ap-hongkong.myqcloud.com/img/banner/swiper-3.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://enos-resource-1306307505.cos.ap-hongkong.myqcloud.com/img/banner/swiper-4.jpg"></image>
			</swiper-item>
			<swiper-item>
				<image mode="widthFix"
					src="https://enos-resource-1306307505.cos.ap-hongkong.myqcloud.com/img/banner/swiper-5.jpg"></image>
			</swiper-item>
		</swiper>

		<view class="notify-container">
			<view class="notify-title" @tap="toPage('消息提醒', '/pages/message_list/message_list')">
				<image src="../../static/icon-1.png" mode="widthFix" class="notify-icon"></image>
				消息提醒
			</view>
			<view class="notify-content">
				你有{{unreadRows}}條未讀消息
			</view>
			<image src="../../static/icon-2.png" mode="widthFix" class="more-icon"></image>
		</view>

		<view class="nav-container">
			<view class="nav-row">

				<view class="nav" @tap="toPage('線上簽到','../checkin/checkin')">
					<image src="../../static/nav-1.png" mode="widthFix" class="icon"></image>
					<text class="name">線上簽到</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-2.png" mode="widthFix" class="icon"></image>
					<text class="name">員工健康</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-3.png" mode="widthFix" class="icon"></image>
					<text class="name">線上請假</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-4.png" mode="widthFix" class="icon"></image>
					<text class="name">公務出差</text>
				</view>
			</view>

			<view class="nav-row">
				<view class="nav">
					<image src="../../static/nav-5.png" mode="widthFix" class="icon"></image>
					<text class="name">員工日報</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-6.png" mode="widthFix" class="icon"></image>
					<text class="name">我的加班</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-7.png" mode="widthFix" class="icon"></image>
					<text class="name">付款申請</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-8.png" mode="widthFix" class="icon"></image>
					<text class="name">費用報銷</text>
				</view>
			</view>

			<view class="nav-row">
				<view class="nav">
					<image src="../../static/nav-9.png" mode="widthFix" class="icon"></image>
					<text class="name">公告通知</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-10.png" mode="widthFix" class="icon"></image>
					<text class="name">線上審批</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-11.png" mode="widthFix" class="icon"></image>
					<text class="name">物品領用</text>
				</view>
				<view class="nav">
					<image src="../../static/nav-12.png" mode="widthFix" class="icon"></image>
					<text class="name">採購申請</text>
				</view>
			</view>

		</view>
		<!-- 氣泡消息 -->
		<uni-popup ref="popupMsg" type="top">
			<uni-popup-message type="success" :message="'接收到' + lastRows + '條消息'" :duration="2000"></uni-popup-message>
		</uni-popup>

	</view>

</template>

<script>
	// 引入組件且後面註冊組件
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	export default {
		components:{
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				unreadRows: 0,
				lastRows: 0,
				timer: null
			}
		},
		onLoad:function(){
			let that=this
			uni.$on("showMessage", function(){ // 創建監聽事件
				that.$refs.popupMsg.open()
			})
			that.ajax(that.url.refreshMessage, "GET", null, function(resp){ // 一進入頁面就會看到輪詢請求，所以不會等五秒才看到
				that.unreadRows=resp.data.unreadRows
				that.lastRows=resp.data.lastRows
				if(that.lastRows>0){
					uni.$emit("showMessage")
				}
			})
		},
		onUnload:function(){  // 關閉頁面時觸發
			uni.$off("showMessage") // 解除監聽事件
		},
		onShow:function(){
			let that=this
			that.timer=setInterval(function(){ // 定時器已經寫在模型層
				that.ajax(that.url.refreshMessage, "GET", null, function(resp){
					that.unreadRows=resp.data.unreadRows
					that.lastRows=resp.data.lastRows
					if(that.lastRows>0){
						uni.$emit("showMessage") // 觸發監聽事件
					}
				})
			},5000)
		},
		onHide: function(){ // 隱藏頁面(例如到其他頁面)時觸發
			let that=this
			clearInterval(that.timer) // 刪除定時器
		},
		methods: {
			toPage: function(name, url){
				// TODO 驗證用戶權限
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("index.less");
</style>
