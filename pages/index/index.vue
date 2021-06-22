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
			<view class="notify-title">
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

				<view class="nav">
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


	</view>

</template>

<script>
	export default {
		data() {
			return {
				unreadRows: 0
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style lang="less">
	@import url("index.less");
</style>
