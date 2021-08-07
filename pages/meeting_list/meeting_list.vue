<template>
	<view class="page">
		<image src="../../static/logo-3.jpg" mode="widthFix" class="logo"></image>
		<view class="add">
			<image src="../../static/icon-17.png" mode="widthFix" class="icon"></image>
			<text>創建會議</text>
		</view>
		<view v-for="one in list" :key="one.date">
			<view class="list-title">{{one.date}}</view>
			<view class="item" v-for="meeting in one.list" :key="meeting.id">
				<view class="header">
					<view class="left">
						<image v-if="meeting.type=='線上會議'" src="../../static/icon-11.png" mode="widthFix" class="icon"></image>
						<image v-if="meeting.type=='線下會議'" src="../../static/icon-11.png" mode="widthFix" class="icon"></image>
						<text>{{meeting.type}}</text>
						<text :class="meeting.status=='未開始'?'blue':'red'">（{{meeting.status}})</text>
					</view>
					<view class="right">
						<text>編輯</text>
					</view>
				</view>
				<view class="content">
					<view class="title">{{meeting.title}}</view>
					<view class="attr">
						<view class="timer">
							<image src="../../static/icon-14.png" mode="widthFix" class="icon"></image>
							<text>{{meeting.start}} - {{meeting.end}}</text>
						</view>
						<view class="creator">
							<image src="../../static/icon-15.png" mode="widthFix" class="icon"></image>
							<text>{{meeting.name}}</text>
						</view>
						<view class="place" v-if="meeting.type!='線上會議'">
							<image src="../../static/icon-16.png" mode="widthFix" class="icon"></image>
							<text>{{meeting.place}}</text>
						</view>
					</view>
					<view class="desc">{{meeting.desc}}</view>
					<button class="btn" v-if="meeting.type=='線上會議'">進入</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: 1,
				length: 20,
				list: [{
						date: '2021年02月08日',
						list: [{
								id: 1,
								date: '2021/02/08',
								start: '08:30',
								end: '10:30',
								type: '線上會議',
								name: '張爽',
								place: "網路會議室",
								status: "未開始",
								title: '年終大會',
								desc: "年終總結大會"
							},
							{
								id: 2,
								date: '2021/02/08',
								start: '08:30',
								end: '10:30',
								type: '線上會議',
								name: '張爽',
								place: "網路會議室",
								status: "未開始",
								title: '年終大會',
								desc: "年終總結大會"
							}
						]
					},
					{
						date: '2021年02月09日',
						list: [{
							id: 3,
							date: '2021/02/09',
							start: '08:30',
							end: '10:30',
							type: '線上會議',
							name: '張爽',
							place: "網路會議室",
							status: "未開始",
							title: '年終大會',
							desc: "年終總結大會"
						}]
					}
				],
				isLastPage: false
			};


		},
		onShow: function(){
			let that = this
			that.page = 1
			that.isLastPage = false
			that.list = []
			that.loadMeetingList(that)
		},
		onReachBottom: function(){  // 觸底會觸發
			let that = this
			if(that.isLastPage){
				return
			}
			that.page = that.page + 1
			that.loadMeetingList(that)
		},
		methods: {
			loadMeetingList :function(ref){
				let data={
					page: ref.page,
					length: ref.length
				}
				// ref 可傳入 that = this
				ref.ajax(ref.url.searchMyMeetingListByPage, "POST", data, function(resp){
					let result = resp.data.result
					if(result == null || result.length == 0){
						ref.isLastPage = true
						ref.page = ref.page - 1
						if(ref.page > 1){
							uni.showToast({
								icon: "none",
								title: "已經到底了"
							})
						}
					}
					else{
						for(let one of result){
							for(let meeting of one.list){
								if(meeting.type == 1){
									meeting.type = "線上會議"
								}
								else if(meeting.type = 2){
									meeting.type = "線下會議"
								}
								
								if(meeting.status == 3){
									meeting.status = "未開始"
								}
								else if(meeting.status = 4){
									meeting.status = "進行中"
								}
							}
							if(ref.list.length > 0){
								let last = ref.list[ref.list.length - 1]
								if(last.date == one.date){
									last.list = last.list.concat(one.list) // 將date一樣的list合併
								}else{
									ref.list.push(one) // 加到大list中
								}
							}else{
								ref.list.push(one)  // 加到大list中
							}
						}
					}
				})	
			}
		}
	}
</script>

<style lang="less">
	@import url("meeting_list.less");
</style>
