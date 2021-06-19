<template>
	<view>
		<image src="../../static/logo-2.png" mode="widthFix" class="logo"/>
		<view class="register-container">
			<input type="text" placeholder="輸入你的邀請碼" class="register-code"
			 maxlength="6" v-model="registerCode" />
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
			register:function(){ // 得到臨時授權字符串
				uni.login({
					provider: "weixin",
					success: function(resp){
						//console.log(resp.code)
						let code = resp.code;
						uni.getUserProfile({
							desc: '獲取用戶信息',
							success: function(resp){
								let nickName = resp.userInfo.nickName;
								let avatarUrl = resp.userInfo.avatarUrl; // 頭像
								console.log(nickName)
								console.log(avatarUrl)
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
