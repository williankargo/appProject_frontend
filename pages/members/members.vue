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
		}
	}
</script>

<style lang="less">
	@import url('members.less');
</style>
