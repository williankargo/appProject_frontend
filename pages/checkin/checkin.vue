<template>
	<view>
		<camera device-position="front" flash="off" class="camera" @error="error" v-if="showCamera"></camera>
		<image mode="widthFix" class="image" :src="photoPath" v-if="showImage"></image>
		<view class="operate-container">
			<!-- 如果can not check in就disable button -->
			<button type="primary" class="btn" @tap="clickBtn" :disabled="!canCheckin">{{btnText}}</button>
			<button type="warn" class="btn" @tap="afresh" :disabled="!canCheckin">重拍</button>
		</view>
		<view class="notice-container">
			<text class="notice">注意事項</text>
			<text class="desc">拍照簽到的時候，必須要拍攝自己的正面照片，側面照片會導致無法識別。另外，拍照的時候不要戴墨鏡或者帽子，避免影響拍攝簽到的準確度。</text>
		</view>
	</view>
</template>

<script>
	var QQMapwx = require('../../lib/qqmap-wx-jssdk.min.js');
	var qqmapsdk;

	export default {
		data() {
			return {
				canCheckin: true,
				photoPath: '',
				btnText: '拍照',
				showCamera: true,
				showImage: false
			}
		},
		onLoad: function() { // uni-app的頁面生命週期函數: 頁面加載時觸發，且只會加載一次，每次跳轉回該頁面不會再加載
			qqmapsdk = new QQMapwx({
				key: "CQMBZ-NUEEJ-M7LFG-KMHNI-SQGFF-O5B7N"
			})
		},
		onShow: function(){  // uni-app的頁面生命週期函數: 頁面加載時觸發，每次跳轉回該頁面都會加載
			let that = this
			that.ajax(that.url.validCanCheckIn, "GET", null, function(resp){
				let msg = resp.data.msg
				if(msg != "可以考勤"){
					that.canCheckin = false
					setTimeout(function(){
						uni.showToast({
							title: msg,
							icon: "none"
						})
					},1000)// 一秒鐘後跳出消息
					that.canCheckin = false
				}
			})
		},
		methods: {
			clickBtn: function() {
				let that = this; // 如果在下面的匿名函數裡用this，會指到當前的函數，而不是VUE對象
				if (that.btnText == "拍照") {
					let ctx = uni.createCameraContext();
					ctx.takePhoto({
						quality: "high",
						success: function(resp) {
							console.log(resp.tempImagePath)
							that.photoPath = resp.tempImagePath
							that.showCamera = false
							that.showImage = true
							that.btnText = "簽到"
						}
					})
				} else { // 點擊簽到
					uni.showLoading({
						title: "簽到中請稍後"
					})
					setTimeout(function() {
						uni.hideLoading()
					}, 30000) // 30s後隱藏上面的訊息

					uni.getLocation({
						type: "wgs84",
						success: function(resp) {
							let latitude = resp.latitude
							let longitude = resp.longitude
							// console.log(latitude)
							// console.log(longitude)
							qqmapsdk.reverseGeocoder({ // 將經緯度轉成地方
								location: {
									latitude: latitude,
									longitude: longitude
								},
								success: function(resp) {
									// console.log(resp.result);
									let address = resp.result.address;
									let addressComponent = resp.result.address_component;
									let nation = addressComponent.nation;
									let province = addressComponent.province;
									let city = addressComponent.city;
									let district = addressComponent.district;
									uni.uploadFile({
										url: that.url.checkin, // 要傳到的後端
										filePath: that.photoPath, // 檔案原始的位置
										name: "photo", // 上傳的檔案的名字，Content-Type: multipart/form-data
										header: {
											token: uni.getStorageSync("token")
										},
										formData: { // Content-Type: multipart/form-data
											address: address,
											country: nation,
											province: province,
											city: city,
											district: district
										},
										success:function(resp){ // 回調函數
											if(resp.statusCode == 500 && resp.data == "不存在人臉模型"){
												uni.hideLoading();
												uni.showModal({
													title: "提示信息",
													content: "EMOS系統中不存在你的人臉模型，是否用當前這張照片作為人臉識別模型？",
													success: function(res){
														if(res.confirm){
															uni.uploadFile({
																url: that.url.createFaceModel,
																filePath: that.photoPath,
																name: "photo",
																header:{
																	token: uni.getStorageSync("token")
																},
																success:function(resp){
																	if(resp.statusCode == 500){
																		uni.showToast({
																			title: resp.data,
																			icon: "none"
																		})
																	}else if(resp.statusCode == 200){
																		uni.showToast({
																			title: "人臉建模成功",
																			icon: "none"
																		})
																	}
																}
															})
														}
													}
												})
											}
											else if(resp.statusCode == 200){ // 代表簽到成功了，這裡是http狀態碼
												let data = JSON.parse(resp.data)
												let code = data.code
												let msg = data.msg
												if(code == 200){ // 和上面那個有什麼關係？這裡這個東西是後端R傳來的
													uni.hideLoading()
													uni.showToast({
														title: "簽到成功",
														complete: function(){ // Toast消失後要做什麼動作
															uni.navigateTo({
																url: "../checkin_result/checkin_result"
															})
														}
													})
												}
											}
											else if(resp.statusCode == 500){ // 其他錯誤
												uni.showToast({
													title: resp.data,
													icon: "none"
												})
											}
										}
									})
								}
							})
						}
					})
				}
			},
			afresh: function() {
				let that = this;
				that.showCamera = true;
				that.showImage = false;
				that.btnText = "拍照"
			}
		}
	}
</script>


<style lang="less">
	@import url("checkin.less");
</style>
