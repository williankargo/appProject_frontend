<template>
	<view>
		我的
	</view>
</template>

<script>
	import uniList from '@/components/uni-list/uni-list.vue'; // (1)引用第三方組件，名字自己設
	import uniListItem from '@/components/uni-list-item/uni-list-item.vue';
	
	export default {
		components:{ // (2)引用後還要註冊組件
			uniList,
			uniListItem
		},
		data() {
			return {
				name:"";
				deptName:"";
				photo:""
			}
		},
		methods: {
			
		}
	}
</script>

<style lang = "less">
	@import url("mine.less");
</style>
