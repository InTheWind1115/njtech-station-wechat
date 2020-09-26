<template>
	<view class="chat-box">
		<view class="chat-header">
			<view class="chat-header-info">
				对方信息：紫霞仙子
			</view>
		</view>
		<view class="chat-body">

			<scroll-view class="scroll-view" scroll-y="true" id="scroll-view" :scroll-top="scrollTop">
				<view class="chat-body-content">
					<view v-for="(value, index) in mess" :key="index">

						<view class="chat-body-content-left" v-if="flag[index]">
							<image class="image" src="@/static/images/zhuyin.png" mode="" />
							<view class="chat-body-content-left-mess">{{value}}</view>
						</view>

						<view class="chat-body-content-right" v-else>
							<view class="chat-body-content-right-mess">
								{{value}}
							</view>
							<image class="image" src="@/static/images/zxc.png" mode="" />
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="chat-footer">
			<view @click="matchOrLeave" :style="{'color': functionNameColor}">{{functionName ? '匹配' : '离开'}}</view>
			<input :confirm-hold="true" v-model="inputValue" type="text" :placeholder-style="placeholderStyle" placeholder="输入内容"
			 :focus="inputFocus" @confirm="sendMessage" />
		</view>

		<modal>
			<template v-slot:body>
				<view>{{modalInfo}}</view>
			</template>
		</modal>

	</view>
</template>

<script>
	import modal from '@/components/modal/modal'
	export default {
		components: {
			modal
		},
		data() {
			return {
				modalInfo: '',
				websocket: null,
				inputFocus: false,
				inputValue: '',
				scrollTop: 0,
				functionName: true, // true为匹配，false为离开功能
				functionNameColor: '#00a1d6',
				oneMess: '',
				placeholderStyle: 'font-size: 28rpx',
				mess: ["我的意中人在附近", "啊，你看到他了？", "没有，因为我的紫青宝剑发出嘟嘟的声音", "哪儿来的嘟嘟声", "哎呀，我知道你听不见我才嘟给你听的嘛", "完了，我好害怕，我不骗你，我真的好害怕",
					"你怕什么？", "这段姻缘是上天安排的，你说我怕不怕？", "又来了......", "是啊！我的心在跳，我的宝剑在嘟，怎么办？", "怎么跟他说？怎么跟他说？"
				],
				flag: [true, false, true, false, true, true, false, true, false, true, true]
			}
		},
		methods: {
			functionChange() {
				let _this = this;
				_this.functionName = !_this.functionName;
				_this.functionNameColor = _this.functionName ? '#00a1d6' : '#fd4c5d';
			},
			sendMessage(e) {
				let _this = this;
				_this.oneMess = e.detail.value.replace(/[\r\n]/g, "").replace(/[\"]/g, "“").replace(/[\"]/g, "”");;
				if (_this.oneMess === '')
					return;
				let requestJson = `{"type": 1, "content": "${_this.oneMess}"}`;
				_this.websocket.send({
					data: requestJson
				});
				_this.mess.push(_this.oneMess);
				_this.flag.push(false);
				_this.inputValue = '';
				_this.inputFocus = true;
				let scroll = uni.createSelectorQuery().in(this).select('#scroll-view');
				scroll.scrollOffset(res => {
					_this.scrollTop = res.scrollHeight;
				}).exec();
			},
			matchOrLeave() {
				let _this = this;
				if (_this.functionName) {
					let requestJson = '{"type": 0, "content": ""}';
					_this.websocket.send({
						data: requestJson
					});
				} else {
					let requestJson = '{"type": -1, "content": ""}';
					_this.websocket.send({
						data: requestJson
					});
				}
			}
		},
		mounted() {
			let _this = this;
			_this.bus.$on('startWebSocket', function() {
				_this.websocket = uni.connectSocket({
					url: 'ws://localhost:7963/njtech/chat',
					header: {
						'Cookie': uni.getStorageSync('cookie')
					},
					complete: () => {}
				});

				_this.websocket.onMessage(mess => {
					let data = JSON.parse(mess.data);
					let content = data.content;
					if (data.type === -4) {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					} else if (data.type === -3) {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					} else if (data.type === -2) {
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					} else if (data.type === -1) {
						_this.functionChange();
						if (data.extra !== 'me') {
							_this.modalInfo = content;
							_this.bus.$emit('showModal');
						}
					} else if (data.type === 0) {
						_this.functionChange();
						_this.modalInfo = content;
						_this.bus.$emit('showModal');
					} else if (data.type === 1) {
						let messFrom = data.content;
						_this.mess.push(messFrom);
						_this.flag.push(true);
						let scroll = uni.createSelectorQuery().in(_this).select('#scroll-view');
						scroll.scrollOffset(res => {
							_this.scrollTop = res.scrollHeight;
						}).exec();
					}

				});

				// 客户端受到服务端发送的关闭连接的请求时，出发onclose事件
				_this.websocket.onClose = (mess) => {
					console.log(mess);
				}

				// 如果出现连接，处理，接收，发送数据失败的时候就会触发onerror事件
				_this.websocket.onError = mess => {
					console.log(mess);
				}
			})
		}
	}
</script>

<style lang="less">
	page {
		height: 100%;
		width: 100%;
	}

	.chat-box {
		height: 100%;
		width: 100%;

		.chat-header {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 10%;
			width: 100%;
			background-color: #f0ece7;
			color: #000000;

			.chat-header-info {
				font-size: 32rpx;
			}
		}

		.chat-body {
			height: 80%;
			width: 100%;
			box-sizing: border-box;
			border-top: 1px solid #e9ddce;
			border-bottom: 1px solid #e9ddce;
			background-color: #ededed;

			.scroll-view {
				height: 100%;
				width: 100%;

				.chat-body-content {
					position: relative;
					box-sizing: border-box;
					height: 100%;
					width: 100%;
					padding: 0 40rpx;

					.chat-body-content-left {
						position: relative;
						box-sizing: border-box;
						margin-bottom: 30rpx;

						.image {
							display: block;
							position: absolute;
							top: 0;
							left: 0;
							width: 68rpx;
							height: 68rpx;
							border-radius: 8rpx;
						}

						.chat-body-content-left-mess {
							display: inline-block;
							position: relative;
							box-sizing: border-box;
							margin-left: 90rpx;
							padding: 17rpx 20rpx;
							line-height: 34rpx;
							min-height: 68rpx;
							max-width: 460rpx;
							font-size: 28rpx;
							color: #1a1a1a;
							font-weight: 500;
							background-color: #ffffff;
							border-radius: 8rpx;
						}

						.chat-body-content-left-mess:before {
							position: absolute;
							top: 26rpx;
							left: -16rpx;
							content: '';
							width: 0;
							height: 0;
							border: 8rpx solid #ededed;
							border-right-color: #ffffff;
						}
					}

					.chat-body-content-right {
						display: flex;
						justify-content: flex-end;
						box-sizing: border-box;
						margin-bottom: 30rpx;

						.image {
							display: block;
							width: 68rpx;
							height: 68rpx;
							border-radius: 8rpx;
							margin-left: 22rpx;
						}

						.chat-body-content-right-mess {
							position: relative;
							display: inline-block;
							box-sizing: border-box;
							padding: 17rpx 20rpx;
							line-height: 34rpx;
							min-height: 68rpx;
							max-width: 460rpx;
							font-size: 28rpx;
							color: #1a1a1a;
							font-weight: 500;
							background-color: #a9ea7a;
							border-radius: 8rpx;
						}

						.chat-body-content-right-mess:after {
							position: absolute;
							top: 26rpx;
							right: -16rpx;
							z-index: 100;
							content: '';
							width: 0;
							height: 0;
							border: 8rpx solid #ededed;
							border-left-color: #a9ea7a;
						}
					}
				}
			}
		}

		.chat-footer {
			height: 10%;
			width: 100%;
			background-color: #f4f5f5;
			display: flex;
			justify-content: space-between;
			align-items: center;

			view {
				width: 15%;
				height: 80rpx;
				// background-color: red;
				color: #00a1d6;
				line-height: 80rpx;
				text-align: center;
			}

			input {
				background-color: #ffffff;
				box-sizing: border-box;
				height: 70rpx;
				width: 75%;
				padding-left: 20rpx;
			}
		}
	}
</style>
