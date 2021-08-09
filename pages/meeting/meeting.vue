<template>
	<view class="page">
		<view class="header">
			<input type="text" class="title" v-model="title" placeholder="輸入會議標題"
				placeholder-class="title-placeholder" />
			<image src="../../static/icon-18.png" mode="widthFix" class="edit-icon"></image>
		</view>
		<view class="attr">
			<view class="list">
				<view class="item">
					<view class="key">日期</view>
					<picker v-if="canEdit" mode="date" :value="date">
						<view class="uni-input">{{date}}</view>
					</picker>
					<text v-if="!canEdit" class="value">{{date}}</text>
				</view>
				<view class="item">
					<view class="key">開始時間</view>
					<picker v-if="canEdit" mode="time" :value="start">
						<view class="uni-input">{{start}}</view>
					</picker>
					<text v-if="!canEdit" class="value">{{start}}</text>
				</view>
				<view class="item">
					<view class="key">結束時間</view>
					<picker v-if="canEdit" mode="time" :value="end">
						<view class="uni-input">{{end}}</view>
					</picker>
					<text v-if="!canEdit" class="value">{{end}}</text>
				</view>
				<view class="item">
					<view class="key">會議類型</view>
					<picker v-if="canEdit"></picker>
				</view>
				<view class="item">
					<view class="key">會議類型</view>
					<picker v-if="canEdit" :value="typeIndex" :range="typeArray">{{typeArray[typeIndex]}}</picker>
					<text v-if="!canEdit" class="value">{{typeArray[typeIndex]}}</text>
				</view>
			</view>
			<view class="item" v-if="typeArray[typeIndex] == '線下會議'">
				<view class="key">地點</view>
				<view class="value">{{place}}</view>
			</view>
		</view>
		<view>
			<text class="desc">{{desc}}</text>
		</view>
		<view class="members">
			<view class="number">參會者({{ members.length }}人)</view>
			<view class="member">
				<view class="user" v-for="one in members" :key="one.id">
					<image :src="one.photo" mode="widthFix" class="photo"></image>
					<text class="name">{{one.name}}</text>
				</view>
				<view class="add">
					<image src="../../static/icon-19.png" mode="widthFix" class="add-btn" @tap="toMembersPage()">
					</image>
				</view>
			</view>
		</view>
		<button class="btn">保存</button>
		<!-- 氣泡消息 -->
		<uni-popup ref="popupPlace" type="dialog">
			<uni-popup-dialog mode="input" title="編輯文字內容" placeholder="輸入會議地點" :value="place"></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupDesc" type="dialog">
			<uni-popup-dialog mode="input" title="編輯文字內容" placeholder="輸入會議內容" :value="desc"></uni-popup-dialog>
		</uni-popup>
	</view>

</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue';
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue';
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue';
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		data() {
			return {
				opt: null,
				id: null,
				uuid: null,
				canEdit: true,
				title: '',
				date: '',
				start: '',
				end: '',
				typeArray: ['線上會議', '線下會議'],
				typeIndex: 0,
				place: '',
				desc: '會議内容',
				members: [{
					id: 1,
					name: "王三",
					photo: "https://enos-resource-1306307505.cos.ap-hongkong.myqcloud.com/img/System.JPG"
				}],
				instanceId: null
			};
		},
		onShow: function() {
			let that = this
			let pages = getCurrentPages()
			let currPage = pages[pages.length - 1]
			// 判斷是不是從會議列表頁面進入的
			if (!currPage.hasOwnProperty("finishMembers") || !currPage.finishMembers) { // true -> 不是從members.vue來的
				//todo 未完成
			} else {
				let members = []
				// 把array中的String轉換成數字
				for (let one of currPage.members) { // 此時members裡的數據是members.vue傳來userID
					members.push(Number(one))
				}
				// 查詢數據
				that.ajax(that.url.searchMembers, 'POST', {
					members: JSON.stringify(members)
				}, function(resp) {
					that.members = resp.data.result
				});
			}
		},
		methods: {
			toMembersPage: function() {
				let array = []
				for (let one of this.members) {
					array.push(one.id);
				}
				uni.navigateTo({
					url: "../members/members?members=" + array.join(",")
				});
			}
		}
	};
</script>

<style lang="less">
	@import url('meeting.less');
</style>
