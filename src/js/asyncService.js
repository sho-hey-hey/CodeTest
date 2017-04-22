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
		items: [
			{
				"id" : 0,
				"name": "B612",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/b612_190.png"
			},
			{
				"id" : 1,
				"name": "LOOKS",
				"logo": "https://d.line-scdn.net/stf/line-lp/line_looks_190x190.png"
			},
			{
				"id" : 2,
				"name": "LINE MAN",
				"logo": "https://d.line-scdn.net/stf/line-lp/line_android_190x190_1111.png"
			},
			{
				"id" : 3,
				"name": "LINE HEREWeb site",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/lp_here_appicon_190x190.png"
			},
			{
				"id" : 4,
				"name": "Emoji LINE",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/190X190_line_me.png"
			},
			{
				"id" : 5,
				"name": "LINE MomentsWeb site",
				"logo": "https://d.line-scdn.net/stf/line-lp/iOS_appcion_190-190.png"
			},
			{
				"id" : 6,
				"name": "LINE@Web site",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/lineat_96.png"
			},
			{
				"id" : 7,
				"name": "LINE TV",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/linelogo_96x96.png"
			},
			{
				"id" : 8,
				"name": "LINE CameraWeb site",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/linecamera_icon_96.png"
			},
			{
				"id" : 9,
				"name": "LINE Dictionary English-Indonesian Web site",
				"logo": "https://d.line-scdn.net/stf/line-lp/favicon_enid_96.png"
			},
			{
				"id" : 10,
				"name": "LINE DECO",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/LINE-DECO_96.jpg"
			},
			{
				"id" : 11,
				"name": "LINE PLAYWeb site",
				"logo": "https://d.line-scdn.net/stf/line-lp/FreeCoin_CHERRY_96_0314.png"
			},
			{
				"id" : 12,
				"name": "LINE SnapMovie",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/SnapMovie_96x96.png"
			},
			{
				"id" : 13,
				"name": "LINE Antivirus",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/LP_Family_icon_96_LINE-Antivirus.jpg"
			},
			{
				"id" : 14,
				"name": "LINE Brush",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/LINEbrush_icon_96.png"
			},
			{
				"id" : 15,
				"name": "LINE Greeting Card",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/LP_Family_icon_96_LINE-Card.jpg"
			},
			{
				"id" : 16,
				"name": "LINE Tools",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/LP_Family_icon_96_LINE-Tools.jpg"
			},
			{
				"id" : 17,
				"name": "LINE Dictionary English-Thai",
				"logo": "https://d.line-scdn.net/stf/line-lp/favicon_enth_96.png"
			},
			{
				"id" : 18,
				"name": "LINE Dictionary Chinese-English",
				"logo": "https://d.line-scdn.net/stf/line-lp/favicon_cnen_96.png"
			},
			{
				"id" : 19,
				"name": "LINE SHOP",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/lineshop_96.png"
			},
			{
				"id" : 20,
				"name": "Popcorn Buzz",
				"logo": "https://d.line-scdn.net/stf/line-lp/family/en/lp_pop_appicon_96x96.png"
			}
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
