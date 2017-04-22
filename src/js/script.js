import { asyncConnect } from './asyncService';

const CLASS_LIST_HIDE = 'search-list--hide';
let input;
let searchList;

function setElement() {
	input = document.getElementById('input');
	searchList = document.getElementById('list');
}

function initialize() {
	setElement();
	asyncConnect(
		'https://line.me/en/family-apps',
		(data) => {
			console.log('connected');
			console.log(data);
		}
	);
}

initialize();
