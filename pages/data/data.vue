<template>
	<view class="data">
		<view class="data-body">
			<view class="data-body-usrname">
				<text>用户昵称：</text>
				{{usrname}}
			</view>
			<view class="data-body-usrphone">
				<text>用户手机：</text>
				{{usrphone}}
			</view>
			<view class="data-body-usrmail">
				<text>用户邮箱：</text>
				{{usrmail}}
				<view class="data-body-usrmail-btn" @click="navigateToBindMail">去绑定</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usrname: '凉风有信',
				usrphone: '19850051861',
				usrmail: '201821017132@njtech.edu.cn'
			}
		},
		methods: {
			navigateToBindMail() {
				uni.navigateTo({
					url: '../bindmail/bindmail'
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%;
	}
	
	.data {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 80rpx 80rpx;
		background-color: #f6f6f7;
		
		.data-body-usrname,
		.data-body-usrphone,
		.data-body-usrmail {
			position: relative;
			width: 100%;
			height: 80rpx;
			line-height: 80rpx;
			font-size: 30rpx;
			border-top-left-radius: 40rpx;
			border-bottom-left-radius: 40rpx;
			background-color: #FFFFFF;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			margin-bottom: 40rpx;
			
			text {
				display: inline-block;
				background-color: blue;
				height: 80rpx;
				padding-left: 10rpx;
				border-top-left-radius: 40rpx;
				border-bottom-left-radius: 40rpx;
				background-color: #efefef;
			}
			
			.data-body-usrmail-btn {
				position: absolute;
				top: 10rpx;
				right: 0;
				width: 100rpx;
				height: 60rpx;
				font-size: 28rpx;
				border-radius: 20rpx;
				box-sizing: border-box;
				text-align: center;
				line-height: 60rpx;
				border: 2px solid #f3ae3c;
				color: #f3ae3c;
				background-color: rgba(255, 255, 255, .8);
			}
		}
	}
</style>
