<template>
	<view>
		<input type="image" src="../../static/logo-2.png" mode="widthFix" class="logo"/>
		<view class="register-container">
			<input type="text" placeholder="輸入你的邀請碼" class="register-code"
			 maxlength="6" v-model="register-code" />
			 <view class="register-desc">
			 	管理員創建員工證帳號後，你可以從你的個人郵箱中獲取註冊邀請碼
				<button class="register-btn" open-type="getUserInfo" @tap="register()"></button>
			 </view>
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
			
		}
	}
</script>

<style lang="less"> 
	@import url("register.less");
</style>
