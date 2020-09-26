<template>
	<view class="modal-backdrop" :style="{'visibility': showModal? 'visible' : 'hidden'}">
		<view class="modal">
			<view class="modal-header">			
					<view class="modal-header-info">
						<slot name="header">
							<view class="modal-header-info-text">提示</view>
							<view class="modal-header-info-close" @click="closeModal"></view>
						</slot>
					</view>
			</view>
			<view class="modal-body">
				
					<view class="modal-body-info">
						<slot name="body">
							测试信息测试信息测试信息测试信息测试信息测试信息测试信息测试信
						</slot>
					</view>
				
			</view>
			<view class="modal-footer">
				<slot name="footer">
					<view class="modal-footer-info">
						<view class="modal-footer-info-btn" @click="closeModal">确认</view>
					</view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		name: 'modal',
		data() {
			return {
				showModal: false
			}
		},
		methods: {
			closeModal() {
				this.showModal = false;
			},
			openModal() {
				this.showModal = true;
			}
		},
		mounted() {
			let _this = this;
			
			_this.bus.$on('showModal', function() {
				_this.openModal();
			});
			
			_this.bus.$on('closeModal', function() {
				_this.closeModal();
			});
		}
	}
	
</script>

<style lang="less">
	page {
		width: 100%;
		height: 100%;
	}
	
	.modal-backdrop {
		display: flex;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, .3);
		z-index: 101;
		
		.modal {
			width: 400rpx;
			height: 420rpx;
			background-color: #FFFFFF;
			border-radius: 8rpx;
			box-shadow: 0 4rpx 8rpx rgba(0, 0, 0, .16);
			
			.modal-header {
				box-sizing: border-box;
				width: 100%;
				height: 80rpx;
				border-bottom: 4rpx solid #eeeeee;
				
				.modal-header-info {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding: 0 30rpx;
					
					.modal-header-info-text {
						height: 100%;
						font-size: 30rpx;
						line-height: 60rpx;
						color: #222222;
					}
					
					.modal-header-info-close {
						font-family: 'icomoon';
						height: 100%;
						width: 50rpx;
						text-align: center;
						line-height: 60rpx;
						font-size: 28rpx;
					}
				}
			}
			
			.modal-body {
				box-sizing: border-box;
				width: 100%;
				height: 260rpx;
				border-bottom: 4rpx solid #eeeeee;
				// background-color: blue;
				
				.modal-body-info {
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					padding: 10rpx 30rpx;
					font-size: 30rpx;
					line-height: 36rpx;
				}
			}
			
			.modal-footer {
				box-sizing: border-box;
				width: 100%;
				height: 80rpx;
				
				.modal-footer-info {
					height: 100%;
					width: 100%;
					box-sizing: border-box;
					padding: 0 30rpx;
					display: flex;
					justify-content: flex-end;
					align-items: center;
					
					.modal-footer-info-btn {
						height: 50rpx;
						width: 80rpx;
						box-sizing: border-box;
						text-align: center;
						line-height: 50rpx;
						// background-color: blue;
						border: 1px solid #c9c9c9;
						font-size: 30rpx;
					}
				}
			}
		}
	}
	
</style>
