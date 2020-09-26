// const BASE_URL = 'http://39.102.69.4:8080/njtech/';
const BASE_URL = 'http://localhost:7963/njtech/';
export const myRequest = (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: {
				'content-type': 'application/x-www-form-urlencoded',//解决请求不到数据
				'cookie': uni.getStorageSync('cookie') || {}
			},
			success: (res) => {
				resolve(res);
			},
			fail: (err) => {
				reject(err)
			}
		});
	});
};