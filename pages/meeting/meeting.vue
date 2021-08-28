<template>
	<view class="page" v-if="checkPermission(['ROOT', 'MEETING:INSERT', 'MEETING:UPDATE'])">
		<view class="header">
			<input type="text" class="title" v-model="title" placeholder="輸入會議標題"
				placeholder-class="title-placeholder" />
			<image src="../../static/icon-18.png" mode="widthFix" class="edit-icon"></image>
		</view>
		<view class="attr">
			<view class="list">
				<view class="item">
					<view class="key">日期</view>
					<picker v-if="canEdit" mode="date" :value="date" @change="dateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
					<text v-if="!canEdit" class="value">{{date}}</text>
				</view>
				<view class="item">
					<view class="key">開始時間</view>
					<picker v-if="canEdit" mode="time" :value="start" @change="startChange">
						<view class="uni-input">{{start}}</view>
					</picker>
					<text v-if="!canEdit" class="value">{{start}}</text>
				</view>
				<view class="item">
					<view class="key">結束時間</view>
					<picker v-if="canEdit" mode="time" :value="end" @change="endChange">
						<view class="uni-input">{{end}}</view>
					</picker>
					<text v-if="!canEdit" class="value">{{end}}</text>
				</view>
				<view class="item">
					<view class="key">會議類型</view>
					<picker v-if="canEdit" :value="typeIndex" :range="typeArray" @change="typeChange">
						{{typeArray[typeIndex]}}
					</picker>
					<text v-if="!canEdit" class="value">{{typeArray[typeIndex]}}</text>
				</view>
				<view class="item" v-if="typeArray[typeIndex] == '線下會議'" @tap="editPlace">
					<view class="key">地點</view>
					<view class="value">{{place}}</view>
				</view>
				<view @tap="editDesc">
					<text class="desc">{{desc}}</text>
				</view>
			</view>
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
		<button class="btn" @tap="save">保存</button>
		<!-- 氣泡消息 -->
		<uni-popup ref="popupPlace" type="dialog">
			<uni-popup-dialog mode="input" title="編輯文字內容" placeholder="輸入會議地點" :value="place" @confirm="finishPlace">
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupDesc" type="dialog">
			<uni-popup-dialog mode="input" title="編輯文字內容" placeholder="輸入會議內容" :value="desc" @confirm="finishDesc">
			</uni-popup-dialog>
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
				if (that.opt == "insert") { // 那說明要創建一個新的會議
					let now = new Date()

					now.setTime(now.getTime() + 30 * 60 * 1000) // 會議設定在半小時毫秒以後
					that.date = now.format("yyyy-MM-dd")
					that.start = now.format("hh:mm")

					now.setTime(now.getTime() + 60 * 60 * 1000) // 會議結束在一小時毫秒後
					that.end = now.format("hh:mm")
				} else if (that.opt == "edit") {
					that.ajax(that.url.searchMeetingbyId, "POST", {
						id: that.id
					}, function(resp) {
						let result = resp.data.result
						that.uuid = result.uuid;
						that.title = result.title;
						that.date = result.date;
						that.start = result.start;
						that.end = result.end;
						that.typeIndex = result.type - 1;
						that.place = result.place;
						let desc = result.desc;
						if (desc != null && desc != '') {
							that.desc = desc;
						}
						that.members = result.members;
						that.instanceId = result.instanceId;
					})
				}
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
		onLoad: function(options) {
			this.id = options.id
			this.opt = options.opt
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
			},
			dateChange: function(e) {
				this.date = e.detail.value
			},
			startChange: function(e) {
				this.start = e.detail.value
			},
			endChange: function(e) {
				this.end = e.detail.value
			},
			typeChange: function(e) {
				this.typeIndex = e.detail.value
			},

			editPlace: function() {
				if (!this.canEdit) {
					return
				}
				this.$refs.popupPlace.open()
			},
			finishPlace: function(done, value) {
				if (value != null && value != '') {
					this.place = value
					done() // 關閉氣泡消息
				} else {
					uni.showToast({
						icon: 'none',
						title: '地點不能為空'
					})
				}
			},
			editDesc: function() {
				if (!this.canEdit) {
					return
				}
				this.$refs.popupDesc.open()
			},
			finishDesc: function(done, value) {
				if (value != null && value != '') {
					this.desc = value
					done() // 關閉氣泡消息
				} else {
					uni.showToast({
						icon: 'none',
						title: '內容不能為空'
					})
				}
			},
			save: function() {
				let that = this
				let array = []
				for (let one of that.members) {
					array.push(one.id)
				}
				if ( // 驗證數據
					that.checkBlank(that.title, "會議題目") ||
					that.checkValidStartAndEnd(that.start, that.end) ||
					(that.typeIndex == "1" && that.checkBlank(that.place, "會議地點")) ||
					that.checkBlank(that.desc, "會議內容") ||
					array.length == 0
				) {
					return
				}
				let data = {
					title: that.title,
					date: that.date,
					start: that.start,
					end: that.end,
					type: Number(that.typeIndex) + 1, // 本來是 0 1
					members: JSON.stringify(array),
					desc: that.desc,
					id: that.id,
					instanceId: that.instanceId
				};
				if (that.typeIndex == "1") {
					data.place = that.place
				}
				let url;
				if (that.opt == "insert") { // opt是從上個頁面傳來的
					url = that.url.insertMeeting
				} else if (that.opt == "edit") {
					url = that.url.updateMeetingInfo
				}
				that.ajax(url, 'POST', data, function(resp) {
					uni.showToast({
						icon: 'success',
						title: '保存成功',
						complete: function() {
							setTimeout(function() {
								uni.navigateBack({});
							}, 2000) // 兩秒後執行
						}
					})
				})
			}
		}
	};
</script>

<style lang="less">
	@import url('meeting.less');
</style>
