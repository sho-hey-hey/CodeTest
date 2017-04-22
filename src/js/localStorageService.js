export const LocalStorageService = {};

const localStorage = window['localStorage'] ? window['localStorage'] : null;
const noSupported = !localStorage;

/**
 * ローカルストレージすべて削除
 */
LocalStorageService.allClear = function() {
	if (noSupported) return false;

	localStorage.clear();
	return true;
}

/**
 * ローカルストレージに登録
 * @param {string} key 
 * @param {any} value 
 */
LocalStorageService.setItem = function(key, value) {
	if (noSupported) return false;

	const type = typeof value;
	let data = {
		type: type,
		value: value
	}
	localStorage.setItem(key, JSON.stringify(data));
	return true;
}

/**
 * 対象のデータを取得
 * @param {string} key 
 */
LocalStorageService.getItem = function(key) {
	if (noSupported) return null;

	const data = localStorage.getItem(key);
	if(!data) return null;

	return data.value;
}

/**
 * 対象のデータを削除
 * @param {string} key 
 */
LocalStorageService.removeItem = function(key) {
	if (noSupported) return false;

	localStorage.removeItem(key);
	return true;
}

/**
 * indexでkey取得
 * @param {number} index 
 */
LocalStorageService.getKey = function(index) {
	if (noSupported) return null;

	return localStorage.key(index);
}
