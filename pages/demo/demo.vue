<template>
	<!-- 只能有一個view根標籤，相當於透明圖層 -->
	<view>
		<view>{{username}}</view>
		<view v-for="one in tel">{{one}}</view>
		<view v-if="age>=18">
			<button @tap="signUp()">我要報名</button>
		</view>
		<view>
			<!-- 雙向綁定 -->
			<input type="text" v-model="address" placeholder="輸入地址"/>
		</view>
		<view>
			{{address}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "Scott",
				tel:['12345','123456'],
				age:20,
				address:""
			}
		},
		methods: {
			signUp:function(){
				// 點了後會像麵包屑一樣出現了又消失
				uni.showToast({ 
					title: "點擊報名按鈕"
				})
			}
		}
	}
</script>

<style>

</style>
