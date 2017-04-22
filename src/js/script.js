import { asyncConnect } from './asyncService';

const CLASS_LIST_HIDE = 'search-list--hide';
let input;
let searchList;
let appData = {};

/**
 * 要素の設定
 */
function setElement() {
	input = document.getElementById('input');
	searchList = document.getElementById('list');
}

/**
 * イベント設定
 */
function setEvent() {
	input.addEventListener('focus', focusIn, false);
	input.addEventListener('focusout', focusOut, false);
}

/**
 * 入力フォームにフォーカスしたときのイベント
 * @param {MouseEvent} e 
 */
function focusIn(e) {
	searchList.classList.remove(CLASS_LIST_HIDE);
}

/**
 * 入力フォームのフォーカスを外したしたときのイベント
 * @param {MouseEvent} e 
 */
function focusOut(e) {
	searchList.classList.add(CLASS_LIST_HIDE);
}

function listItemClick(e) {
	const target = e.currentTarget;
	const id = target.dataset['id'];
}

function createList(items) {
	for (let i = 0, len = items.length; i < len; ++i) {
		const item = items[i];
		const itemElem = document.createElement('li');
		const itemImgElem = document.createElement('img');
		const itemNameElem = document.createElement('span');

		itemElem.classList.add('search-list__item');
		itemElem.dataset['id'] = item.id;
		itemElem.addEventListener('click', listItemClick, false);

		itemImgElem.classList.add('search-list__item-img');
		itemImgElem.src = item.logo;
		itemImgElem.width = 40;
		itemImgElem.height = 40;

		itemNameElem.classList.add('search-list__item-name');
		itemNameElem.innerText = itemNameElem.title = item.name;

		itemElem.appendChild(itemImgElem);
		itemElem.appendChild(itemNameElem);
		searchList.appendChild(itemElem);
	}
}

/**
 * 初期化
 */
function initialize() {
	setElement();
	asyncConnect(
		'https://line.me/en/family-apps',
		(data) => {
			appData = data;
			console.log('connected');
			console.log(data);
			createList(appData.items);
			setEvent();
		}
	);
}

initialize();
