<template>
	<view>
		<image src="../../static/logo-2.png" mode="widthFix" class="logo" />
		<view class="register-container">
			<input type="text" placeholder="輸入你的邀請碼" class="register-code" maxlength="6" v-model="registerCode" />
			<view class="register-desc">
				管理員創建員工證帳號後，你可以從你的個人郵箱中獲取註冊邀請碼
				<button class="register-btn" open-type="getUserInfo" @tap="register()">執行註冊</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				registerCode: null
			}
		},
		methods: {
			register: function() { // 得到臨時授權字符串

				let that = this // 這裡指VUE對象
				if (that.registerCode == null || that.registerCode.length == 0) {
					uni.showToast({
						icon: "none",
						title: "邀請碼不能為空"
					})
					return
				} else if (/^[0-9]{6}$/.test(that.registerCode) == false) {
					uni.showToast({
						icon: "none",
						title: "邀請碼必須是6位數"
					})
					return
				}

				uni.login({
					provider: "weixin",
					success: function(resp) { // 這個resp來自於weixin
						console.log(resp.code)
						let code = resp.code;
						uni.getUserProfile({
							desc: '獲取用戶信息',
							success: function(resp) {
								let nickName = resp.userInfo.nickName;
								let avatarUrl = resp.userInfo.avatarUrl; // 頭像
								//console.log(nickName)
								//console.log(avatarUrl)
								
								// 把數據集中起來準備傳到ajax
								let data = {
									code: code,
									nickname: nickName,
									photo: avatarUrl,
									registerCode: that.registerCode
								}
								// url.register -> 請求路徑，表示後端web方法的地址
								that.ajax(that.url.register, 'POST', data, function(resp){ // 這個resp來自於後端
									let permission = resp.data.permission
									uni.setStorageSync("permission", permission)
									// console.log(permission)
									
									// 跳轉到index頁面
									uni.switchTab({ // 跳轉到tab跟跳轉到普通頁面用的代碼是不一樣的
										url: "../index/index"
									})
								})
								
							}
						})
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url("register.less");
</style>
