<template>
	<view>
		<!-- 不按照比例縮放 -->
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image>
		<view class="loge-title">EMOS企業在線辦公系統</view>
		<view class="loge-subtitle">Ver 2050.2</view>
		<!-- open-type很重要？讓下面可以用getUserInfo -->
		<button class="login-btn" open-type="getUserInfo" @tap="login()">登入系統</button>
		<view class="register-container">
			沒有帳號？
			<text class="register" @tap="toRegister()">立即註冊</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			toRegister: function() {
				uni.navigateTo({
					url: '../register/register'
				});
			},
			login: function() {
				let that = this
				uni.login({
					provider: "weixin",
					success: function(resp) { // resp來自於weixin
						let code = resp.code // 臨時授權字符串，微信每次login會自動提供
						that.ajax(that.url.login, "POST", {
							"code": code // Content-Type: application/json編碼格式 後端對應 @RequestBody 接收
						}, function(resp) { // resp來自於後端
							let permission = resp.data.permission
							uni.setStorageSync("permission", permission)
						})
						console.log("success")

						// 跳轉到登入頁面
						uni.switchTab({
							url: "../index/index"
						})
					},
					fail: function(e) { // 對應login的success,不是對應ajax的success, ajax自己也已經封裝異常了
						console.log(e)
						uni.showToast({
							icon: "none",
							titile: "執行異常"
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less");
</style>
