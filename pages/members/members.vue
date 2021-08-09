<template>
	<view class="page">
		<checkbox-group @change="selected">
			<block v-for="dept in list" :key="dept.id">
				<view class="list-title">{{dept.deptName}} ({{ dept.count }}人)</view>
				<view class="item" v-for="member in dept.members" :key="member.userId">
					<view class="key">{{ member.name }}</view>
					<checkbox class="value" :value="member.userId" :checked="member.checked"></checkbox>
				</view>
			</block>
		</checkbox-group>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [{
						id: 1,
						deptName: "管理部",
						count: 2,
						members: [{
								userId: 10,
								name: "張浩南",
								checked: true
							},
							{
								userId: 11,
								name: "許莉莉",
								checked: false
							}
						],
					},
					{
						id: 2,
						deptName: "技術部",
						count: 3,
						members: [{
								userId: 12,
								name: "陳婷與",
								checked: false
							},
							{
								userId: 13,
								name: "陳軍翔",
								checked: false
							},
							{
								userId: 14,
								name: "劉洋狗",
								checked: false
							}
						],
					},
				],
				members: []
			}
		},
		onShow: function(){
			this.loadData(this)
		},
		onLoad: function(options){ // 接收meeting.vue透過navigateTo()傳過來的參數
			if(options.hasOwnProperty('members')){
				let members = options.members
				this.members = members.split(',') // String轉換成array
			}
			
		},
		methods: {
			loadData: function(ref){
				ref.ajax(ref.url.searchUserGroupByDept, "POST", {keyword:ref.keyword}, function(resp){
					let result = resp.data.result
					ref.list = result
					for(let dept of ref.list){
						for(let member of dept.members){
							if(ref.members.indexOf(members.userId +"") != -1){ // 後面的members哪裡來的？onLoad()時meeting.vue透過url傳過來的，因為傳過來是數字，要轉成string
								member.checked = true
							}else{
								member.checked = false
							}
						}
					}
				})
			},
			selected: function(e){
				let that = this
				that.members = e.detail.value // 當前所有選中的成員的userId
				let pages = getCurrentPages() // 當前頁面棧數組
				let prePage = pages[pages.length - 2] // -2到上一個頁面 -1是當前頁
				prevPage.members = that.members // 當這個頁面的數據綁定到上一個頁面
				prePage.finishMembers = true // 且給上個頁面賦予finishMembers
			}
		}
	}
</script>

<style lang="less">
	@import url('members.less');
</style>
