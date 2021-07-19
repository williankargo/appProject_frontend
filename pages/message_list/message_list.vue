<template>
	<view class="page">
		<uni-list>
			<uni-list-chat v-for="one in list" :key="one.id" :title="one.senderName" :note="one.msg"
				:avatar="one.senderPhoto" badgePositon="left" :badgeText="one.readFlag?'':'dot'" link="navigateTo"
				:to="''">
				<view class="chat-custom-right">
					<text class="chat-custom-text">{{one.sendTime}}</text>
				</view>
			</uni-list-chat>
		</uni-list>
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue';
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';

	export default {
		components: {
			uniList,
			uniListItem
		},
		data() {
			return {
				page: 1,
				length: 20,
				list: [{
					id: "601027486863f742e88b1b22",
					refId: "6010274d6863f742e88b1b23",
					senderName: "系統消息",
					senderPhoto: "https://static-1258386385.cos.ap-beijing.myqcloud.com/img/System.jpg",
					msg: "HelloWorld",
					readFlag: false,
					sendTime: "2021-01-26 22:29:28"
				}],
				isLastPage: false
			};
		},
		onShow: function(){
			let that = this
			that.page = 1
			that.isLastPage = false
			uni.pageScrollTo({ // 滑動到最頂端
				scrollTop: "0"
			})
			that.loadMessageList(that) // 傳入this
		},
		onReachBottom: function(){ // 頁面觸底，會觸發回調函數，載入下一頁
			let that = this
			if(that.isLastPage){
				return
			}
			this.page = this.page + 1 // 增加一頁
			that.loadMessageList(this)
		},
		methods: {
			loadMessageList: function(ref){
				let data = {
					page: ref.page,
					length: ref.length
				}
				// ref 可傳入 that = this
				ref.ajax(ref.url.searchMessageByPage, "POST", data, function(resp){
					let result = resp.data.result
					if(result == null||result.length == 0){ // 沒有查出東西，已經到最後一頁了
						ref.isLastPage = true;
						ref.page = ref.page - 1; // todo: 下一頁已經沒有東西了，要翻回去
						uni.showToast({
							icon: 'none',
							title: '已經到底了'
						});
					}
					else{
						if(ref.page == 1){ // 例如我現在已經到第十頁了，跳出去，再跳回來第一頁，必須把本來十頁的數據清空
							ref.list = []
						}
						ref.list = ref.list.concat(result); // 合併
						if(ref.page > 1){
							uni.showToast({
								icon: 'none',
								titile: '又加載了' + result.length + '條消息'
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	@import url('message_list.less');
</style>
