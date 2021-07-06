import Vue from 'vue'
import App from './App'

// 項目入口文件，用來初始化VUE對象，定義全局組件

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()


let baseUrl = "http://192.168.50.65:8080/emos-wx-api"
// protorype用來擴增本來VUE實例的東西
Vue.prototype.url = {
	register: baseUrl + "/user/register",
	login: baseUrl + "/user/login",
	checkin: baseUrl + "/checkin/checkin",
	createFaceModel: baseUrl + "/checkin/createFaceModel",
	validCanCheckIn: baseUrl + "/checkin/validCanCheckIn",
	searchTodayCheckin: baseUrl + "/checkin/searchTodayCheckin",
	searchUserSummary: baseUrl+"/user/searchUserSummary"
}

// 定義全局驗證函數
Vue.prototype.checkPermission = function(perms){
	let permission=uni.getStorageSync("permission")
	let result=false
	for(let one of perms){
		if(permission.indexOf(one)!= -1){ // 看permission裡面有沒有需要的permission
			result=true
			break
		}
	}
	return result;
}

Vue.prototype.ajax = function(url, method, data, fun) {
	uni.request({
		"url": url,
		"method": method,
		"header": {
			token: uni.getStorageSync('token')
		},
		"data": data,
		// 當請求成功時呼叫的函式。這個函式會得到resp：從伺服器返回的資料。
		success: function(resp) {
			if (resp.statusCode == 401) {
				uni.redirectTo({
					url: "/pages/login/login.vue"
				})
			} else if (resp.statusCode == 200 && resp.data.code ==
				200) { // 前面是http的狀態碼，後面resp.data是R對象的code
				let data = resp.data
				if (data.hasOwnProperty("token")) {
					let token = data.token
					//console.log(token)
					uni.setStorageSync("token", token) // 把伺服器發來的token存到本地
				}
				fun(resp) // 參數傳入的匿名函數，自己定義看移動端想從resp中提取什麼東西
			} else { // 其他異常
				uni.showToast({
					icon: "none",
					title: resp.data
				})
			}

		}
	})
}
