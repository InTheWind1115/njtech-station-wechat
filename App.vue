<script>
	export default {
		onLaunch: function() {
			this.$myRequest({
				url: 'signin',
			}).then(res => {
				console.log("App.vue中的执行");
				uni.setStorageSync('cookie', res.header['Set-Cookie']);
			});
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
			uni.removeStorageSync('cookie');
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import url("style.css");
</style>
