<template>
	<view class="profile">
		<view class="profile-header">
			<view class="profile-header-info" v-if="showChange">
				<view class="profile-header-info-header">
					<image src="@/static/images/zxc.png" mode=""></image>
				</view>
				<view class="profile-header-info-usrname">凉风有信</view>
				<view class="profile-header-info-change" @click="navigateToData">修改资料</view>
			</view>
			<view class="profile-header-regOrin" v-else>
				<view class="profile-header-regOrin-in" @click="toEnrollPage">登录</view>
				<view class="profile-header-regOrin-reg" @click="toRegisterPage">注册</view>
			</view>
		</view>
		<view class="profile-body">
			<view class="profile-body-email" @click="navigateToBindMail"><text></text>邮箱验证</view>
			<view @click="navigateToAboutus" class="profile-body-aboutUs"><text></text>关于我们</view>
			<view @click="navigateToAboutprivacy" class="profile-body-aboutPrivacy"><text></text>关于隐私</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'profile',
		data() {
			return {
				showChange: true
			}
		},
		methods: {
			toEnrollPage() {
				uni.navigateTo({
					url: '../enroll/enroll'
				})
			},
			toRegisterPage() {
				uni.navigateTo({
					url: '../register/register'
				})
			},
			navigateToBindMail() {
				uni.navigateTo({
					url: '../bindmail/bindmail'
				})
			},
			navigateToData() {
				uni.navigateTo({
					url: '../data/data'
				})
			},
			navigateToAboutus() {
				uni.navigateTo({
					url: '../aboutus/aboutus'
				})
			},
			navigateToAboutprivacy() {
				uni.navigateTo({
					url: '../aboutprivacy/aboutprivacy'
				})
			}
		},
		mounted() {
			let _this = this;
			_this.bus.$on('showInfo', function() {
				_this.showChange = true;
			})
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		width: 100%;
		background-color: #f6f6f7;
	}
	.profile {
		width: 100%;
		
		.profile-header {
			width: 100%;
			height: 150rpx;
			background-color: #ffffff;
			
			.profile-header-info {
				position: relative;
				box-sizing: border-box;
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-left: 40rpx;
				
				.profile-header-info-header {
					width: 120rpx;
					height: 120rpx;
					margin-right: 30rpx;
					
					image {
						width: 100%;
						height: 100%;
						border-radius: 60rpx;
					}
				}
				
				.profile-header-info-usrname {
					color: #333333;
					font-weight: 600;
				}
				
				.profile-header-info-change {
					position: absolute;
					box-sizing: border-box;
					border: 1px solid #f3ae3c;
					top: 45rpx;
					right: 20rpx;
					height: 60rpx;
					width: 160rpx;
					text-align: center;
					line-height: 60rpx;
					border-radius: 30rpx;
					color: #f3ae3c;
					font-size: 28rpx;
				}
			}
			
			.profile-header-regOrin {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: space-around;
				align-items: center;
				
				.profile-header-regOrin-in, .profile-header-regOrin-reg {
					box-sizing: border-box;
					width: 200rpx;
					height: 70rpx;
					text-align: center;
					line-height: 70rpx;
					border-radius: 35rpx;
					background-color: #FFFFFF;
					border: 1px solid #e6e6e6;
					color: #636363;
				}
				
				
			}
		}
		
		.profile-body {
			width: 100%;
			box-sizing: border-box;
			padding: 0 20rpx;
			background-color: #FFFFFF;
			
			.profile-body-email, .profile-body-aboutUs, .profile-body-aboutPrivacy {
				font-family: 'icomoon';
				width: 100%;
				height: 100rpx;
				box-sizing: border-box;
				margin-top: 20rpx;
				padding-left: 20rpx;
				border-bottom: 1px solid #f4f4f4;
				line-height: 99rpx;
				background-color: #FFFFFF;
				color: #333333;
				
				text {
					color: #aaabad;
					margin-right: 10rpx;
				}
			}
			
			.profile-body-aboutPrivacy {
				border: none!important;
			}
			
		}
	}
</style>
