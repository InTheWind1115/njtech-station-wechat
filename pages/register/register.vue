<template>
	<view class="register">
		<view class="register-header">
			注册
		</view>
		<view class="register-body">

			<view class="register-body-usrname">
				<input @input="testUsrname" v-model="usrname" placeholder-class="placeholder-style" placeholder="昵称(15个中文或字母或数字以内)"
				 type="text" class="register-body-usrname-input">
				<view class="register-body-usrname-hint">{{usrnameHint}}</view>
			</view>

			<view class="register-body-usrpwd">
				<input @input="testUsrpwd1" v-model="usrpwd1" placeholder-class="placeholder-style" password="true" placeholder="密码(6-16个字母或数字组成,区分大小写)"
				 type="text" class="register-body-usrpwd-input">
				<view class="register-body-usrpwd-hint1">{{usrpwd1Hint}}</view>
			</view>

			<view class="register-body-usrpwd-confirm">
				<input @input="testUsrpwd2" v-model="usrpwd2" placeholder-class="placeholder-style" password="true" placeholder="确认密码"
				 type="text" class="register-body-usrpwd-input">
				<view class="register-body-usrpwd-hint2">{{usrpwd2Hint}}</view>
			</view>

			<view class="register-body-phone">
				<input @input="testUsrphone" v-model="usrphone" type="number" placeholder-class="placeholder-style" placeholder="填写常用手机号"
				 class="register-body-usrpwd-input">
				<view class="register-body-phone-hint">{{usrphoneHint}}</view>
			</view>

			<view class="register-body-code">
				<input @input="clear" v-model="usrcode" type="number" placeholder-class="placeholder-style" placeholder="请输入短信验证码" class="register-body-usrpwd-input">
				<view class="register-body-code-btn" @click="clickCodeBtn">{{usrcodeHint}}</view>
				<view class="register-body-code-hint">{{usrcodeInfo}}</view>
			</view>

		</view>
		<view class="register-footer">
			<view class="register-footer-registerbtn" @click="register">注册</view>
			<view class="register-footer-reg" @click="toEnrollPage">已有账号?去登录</view>
		</view>
		
		<modal>
			<template v-slot:body>
				<view>{{modalInfo}}</view>
			</template>
		</modal>
	</view>
</template>

<script>
	import modal from '../../components/modal/modal.vue'
	export default {
		components: {
			modal
		},
		nmae: 'register',
		data() {
			return {
				usrname: '',
				usrpwd1: '',
				usrpwd2: '',
				usrphone: '',
				usrcode: '', //按钮上的文字
				usrcodeInfo: '',
				usrnameFlag: false,
				usrpwd1Flag: false,
				usrpwd2Flag: false,
				usrphoneFlag: false,
				usrcodeFlag: true, //用于判断验证码按钮是否能按
				usrnameHint: '',
				usrpwd1Hint: '',
				usrpwd2Hint: '',
				usrphoneHint: '',
				usrcodeHint: '获取验证码',
				modalInfo: '注册页面'
			}
		},
		methods: {
			toEnrollPage() {
				uni.redirectTo({
					url: '../enroll/enroll'
				});
			},
			testUsrname() {
				let regExp_name = new RegExp('^[\u4e00-\u9fffa-zA-Z0-9]{0,15}$');
				let info = "请将昵称控制在15个字符以内";
				let _this = this;
				if (regExp_name.test(_this.usrname)) {
					_this.usrnameHint = '';
					_this.usrnameFlag = true;
				} else {
					_this.usrnameHint = info;
					_this.usrnameFlag = false;
				}
			},
			testUsrpwd1() {

				let reg = new RegExp("^([0-9]|[a-zA-Z]){6,16}$");
				let _this = this;
				if (!reg.test(_this.usrpwd1)) {
					_this.usrpwd1Hint = '密码不合法';
					_this.usrpwd1Flag = false;
				} else {
					_this.usrpwd1Hint = '';
					_this.usrpwd1Flag = true;
				}

			},
			testUsrpwd2() {
				let _this = this;
				if (_this.usrpwd1 !== _this.usrpwd2) {
					_this.usrpwd2Hint = '两次密码不一致';
					_this.usrpwd2Flag = false;
				} else {
					_this.usrpwd2Hint = '';
					_this.usrpwd2Flag = true;
				}
			},
			testUsrphone() {
				let _this = this;
				let reg = new RegExp('^1[3-9]\\d{9}$');
				if (!reg.test(_this.usrphone)) {
					_this.usrphoneHint = '请输入正确的手机号';
					_this.usrphoneFlag = false;
				} else {
					_this.usrphoneHint = '';
					_this.usrphoneFlag = true;
				}
			},
			clickCodeBtn() {
				let _this = this;
				if (!_this.usrcodeFlag) {
					return;
				}
				_this.usrcodeFlag = false;
				_this.$myRequest({
					url: 'phonecode',
					method: 'GET',
					data: {
						phone: _this.usrphone
					}
				}).then(res => {
					if (res.data === 0)
						_this.usrphoneHint = '此手机号已被注册';
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
			register() {
				let _this = this;
				if (_this.usrnameFlag && _this.usrpwd1Flag && _this.usrpwd2Flag && _this.usrphoneFlag) {
					_this.$myRequest({
						url: 'signup',
						data: {
							username: _this.usrname,
							userPwd: _this.usrpwd1,
							phone: _this.usrphone,
							code: _this.usrcode
						}
					}).then(res => {
						if (res.data === 0) {
							_this.usrcodeInfo = '这个验证码已经失效';
						} else if (res.data === -1) {
							_this.usrcodeInfo = '您的验证码输入错误';
						} else if (res.data === 1) {
							_this.modalInfo = '注册成功，2s后跳转到登录界面。';
							_this.bus.$emit('showModal');
							setTimeout(function() {
								uni.redirectTo({
									url: '../enroll/enroll'
								});
							}, 2000);
						}
					})
				} else
					return;
			},
			clear() {
				this.usrcodeInfo = '';
			}
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		width: 100%;
		background-color: #f6f6f7;
	}

	.placeholder-style {
		font-size: 28rpx;
	}

	.register {

		width: 100%;
		box-sizing: border-box;
		padding: 100rpx 100rpx;

		.register-header {
			width: 100%;
			height: 100rpx;
			line-height: 100rpx;
			text-align: center;
			font-size: 36rpx;
			font-weight: 600;
			margin-bottom: 50rpx;
		}

		.register-body {
			width: 100%;
			background-color: #f6f6f7;

			.register-body-usrname,
			.register-body-usrpwd,
			.register-body-usrpwd-confirm,
			.register-body-phone,
			.register-body-code {
				position: relative;
				box-sizing: border-box;
				width: 100%;
				height: 80rpx;
				border: 2rpx solid #c9c9c9;
				border-radius: 40rpx;
				margin-bottom: 50rpx;

				input {
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					padding-left: 20rpx;
					border-radius: 40rpx;
					color: #333333;
					background-color: #FFFFFF;
				}

				.register-body-code-btn {
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
					background-color: #00a1d6;
					color: #FFFFFF;
					z-index: 100;
				}

				.register-body-usrname-hint,
				.register-body-usrpwd-hint1,
				.register-body-usrpwd-hint2,
				.register-body-phone-hint,
				.register-body-code-hint {
					position: absolute;
					font-size: 26rpx;
					top: 80rpx;
					left: 20rpx;
					// background-color: blue;
					color: #f45d90;
					text-align: center;
				}
			}

		}

		.register-footer {
			position: relative;
			width: 100%;
			height: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.register-footer-registerbtn {
				box-sizing: border-box;
				height: 100%;
				width: 150rpx;
				line-height: 80rpx;
				text-align: center;
				border-radius: 40rpx;
				border: 1px solid #c9c9c9;
				background-color: #FFFFFF;
			}

			.register-footer-reg {
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
