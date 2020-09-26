<template>
	<view class="enroll">
		<view class="enroll-header">
			登录
		</view>
		<view class="enroll-body">

			<view class="enroll-body-usrname">
				<input v-model.lazy="usrphone" placeholder-class="placeholder-style" placeholder="请输入手机号" type="number" class="enroll-body-usrname-input">
			</view>

			<view class="enroll-body-usrpwd">
				<input v-model.lazy="usrpwd" placeholder-class="placeholder-style" password="true" placeholder="请输入密码" type="text"
				 class="enroll-body-usrpwd-input">
			</view>

		</view>
		<view class="enroll-footer">
			<view class="enroll-footer-enrollbtn" @click="signIn">登录</view>
			<view class="enroll-footer-reg" @click="toRegisterPage">没有账号?去注册</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				usrphone: '',
				usrpwd: ''
			}
		},
		methods: {
			toRegisterPage() {
				uni.redirectTo({
					url: '../register/register'
				})
			},
			signIn() {
				let _this = this
				_this.$myRequest({
					url: 'signin',
					method: 'GET',
					data: {
						'phone': _this.usrphone,
						'userPwd': _this.usrpwd
					}
				}).then(res => {
					if (res.data === true) {
						_this.bus.$emit('showInfo');
						_this.bus.$emit('startWebSocket');
						uni.switchTab({
							url: '../profile/profile'
						});
					}
				});
			}
		}
	}
</script>

<style lang="less">
	page {
		// display: flex;
		// justify-content: center;
		// align-items: center;
		height: 100%;
		width: 100%;
		background-color: #f6f6f7;
	}

	.placeholder-style {
		font-size: 28rpx;
	}

	.enroll {

		width: 100%;
		box-sizing: border-box;
		padding: 100rpx 100rpx;

		.enroll-header {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 600;
			margin-bottom: 50rpx;
		}

		.enroll-body {
			width: 100%;
			background-color: #f6f6f7;

			.enroll-body-usrname,
			.enroll-body-usrpwd {
				box-sizing: border-box;
				width: 100%;
				height: 80rpx;
				border: 1px solid #c9c9c9;
				border-radius: 40rpx;
				margin-bottom: 50rpx;

				.enroll-body-usrname-input,
				.enroll-body-usrpwd-input {
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					padding-left: 20rpx;
					border-radius: 40rpx;
					color: #333333;
					background-color: #FFFFFF;
				}
			}

		}

		.enroll-footer {
			position: relative;
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.enroll-footer-enrollbtn {
				box-sizing: border-box;
				height: 100%;
				width: 150rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 40rpx;
				border: 1px solid #c9c9c9;
				background-color: #FFFFFF;
			}

			.enroll-footer-reg {
				position: absolute;
				right: 0;
				top: 90rpx;
				height: 100%;
				font-size: 28rpx;
				color: #57bd6a;
				// background-color: yellow;
			}
		}
	}
</style>
