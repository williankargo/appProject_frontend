<template>
	<view>
		<!-- 不按照比例縮放 -->
		<image src="../../static/logo-1.png" class="logo" mode="widthFix"></image> 
		<view class="loge-title">EMOS企業在線辦公系統</view>
		<view class="loge-subtitle">Ver 2050.2</view>
		<!-- open-type很重要？讓下面可以用getUserInfo -->
		<button class="login-btn" open-type="getUserInfo" @tap="login()" >登入系統</button>
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
			toRegister: function(){
				uni.navigateTo({
					url:'../register/register'
				});
			}
		}
	}
</script>

<style lang="less">
	@import url("login.less");
</style>
