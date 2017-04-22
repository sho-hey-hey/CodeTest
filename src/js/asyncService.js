const xhr = new XMLHttpRequest();

xhr.open = (callback, url) => {
	let result = {};

	switch (url) {
		case 'https://line.me/en/family-apps':
			result = getFamilyAppData();
			break;
		case 'https://line.me/en/download':
			result = getDownloadData();
			break;
		default:
			result = {};
			break;
	}
	setTimeout(() => { callback(result); }, 1000);
};

function getFamilyAppData() {
	return {
		total: 13,
		items: [
			{
				name: 'LINE HERE',
				logo: 'https://d.line‐scdn.net/stf/line‐lp/family/it/lp_here_appicon_190x190.png'
			},
		]
	};
}

function getDownloadData() {
	return {
		total: 13,
		items: [
			{
				name: 'LINE HERE',
				logo: 'https://d.line‐scdn.net/stf/line‐lp/family/it/lp_here_appicon_190x190.png'
			},
		]
	};
}

function asyncConnect(url, callback) {
	xhr.open((data) => { callback(data); }, url);
}

export { asyncConnect };
