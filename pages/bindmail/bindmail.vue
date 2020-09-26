<template>
	<view class="mail">
		<view class="mail-get">
			<input v-model.lazy="mail" class="mail-get-input" type="text" placeholder="请输入学校邮箱">
			<view class="mail-get-btn" @click="clickCodeBtn">{{usrcodeHint}}</view>
		</view>
		<view class="mail-confirm">
			<input v-model.lazy="code" class="mail-confirm-input" type="number" placeholder="请输入验证码">
			<view class="mail-confirm-btn">绑定</view>
		</view>
	</view>
</template>

<script>
	import modal from '../../components/modal/modal.vue'
	export default {
		data() {
			return {
				mail: '',
				code: '',
				usrcodeFlag: true,
				usrcodeHint: '获取验证码',
				modalInfo: ''
			}
		},
		methods: {
			clickCodeBtn() {
				let _this = this;
				if (!_this.usrcodeFlag) {
					return;
				}
				_this.usrcodeFlag = false;
				_this.$myRequest({
					url: 'sendmailcode',
					method: 'GET',
					data: {
						email: _this.mail
					}
				}).then(res => {
					let type = res.data.type;
					let content = res.data.content;
					if (type === -2) {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					} else if (type === -1) {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					} else if (type === 0) {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					} else {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					}
				});

				let second = 60;
				_this.usrcodeHint = second + 's..';
				let countDown = setInterval(function() {
					_this.usrcodeHint = --second + 's..';
					if (second == -1) {
						clearTimeout(countDown);
						_this.usrcodeHint = '获取验证码';
						_this.usrcodeFlag = true;
					}
				}, 1000);
			},
			confirmEmailCode() {
				let _this = this;
				_this.bus.$myRequest({
					url: 'confirmmailcode',
					method: 'POST',
					data: {
						code: _this.code
					}
				}).then(res => {
					let type = res.data.type;
					let content = res.data.content;
					if (type === -2) {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					} else if (type === -1) {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					
					} else if (type === 0) {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					
					} else {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					}
				})
			}
		},
	}
</script>

<style lang="less">
	page {
		height: 100%;
		width: 100%;
		background-color: #f6f6f7;
	}

	.mail {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 100rpx 100rpx;

		.mail-get,
		.mail-confirm {
			position: relative;
			width: 100%;
			height: 80rpx;
			margin-bottom: 80rpx;

			.mail-get-btn {
				position: absolute;
				box-sizing: border-box;
				top: 4rpx;
				right: 4rpx;
				height: 70rpx;
				width: 200rpx;
				line-height: 70rpx;
				border-radius: 35rpx;
				text-align: center;
				background-color: blue;
				font-size: 28rpx;
				font-weight: 600;
				background-color: #00a1d6;
				color: #FFFFFF;
				z-index: 100;
			}

			.mail-confirm-btn {
				width: 200rpx;
				height: 80rpx;
				margin: 0 auto;
				margin-top: 40rpx;
				line-height: 80rpx;
				text-align: center;
				background-color: #00a1d6;
				color: #FFFFFF;
				border-radius: 20rpx;
			}

			.mail-get-input,
			.mail-confirm-input {
				width: 100%;
				height: 100%;
				font-size: 24rpx;
				box-sizing: border-box;
				padding-left: 20rpx;
				border: 2rpx solid #c9c9c9;
				border-radius: 40rpx;
				background-color: #FFFFFF;
			}
		}
	}
</style>
