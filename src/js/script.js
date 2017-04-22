import { asyncConnect } from './asyncService';

const CLASS_LIST_HIDE = 'search-list--hide';
const CLASS_LIST_ITEM = 'search-list__item';
const CLASS_LIST_ITEM_SELECTED = `${CLASS_LIST_ITEM}--selected`;
let input;
let inputValue = '';
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
	input.addEventListener('keyup', search, false);
	input.addEventListener('focus', focusIn, false);
	searchList.addEventListener('mousemove', selectListItem, false);
	document.addEventListener('click', focusOut, true);
	document.addEventListener('keydown', keyDown, false);
}

/**
 * KeyDownイベント
 * @param {KeyEvent} e 
 */
function keyDown(e) {
	const keyCode = e.code;
	keyArrow(keyCode);
}

function keyArrow(keyCode) {
	if (!searchList.classList.contains(CLASS_LIST_HIDE)) {
		switch (keyCode) {
			case 'ArrowUp':
				moveItem(false);
				break;
			case 'ArrowDown':
				moveItem(true);
				break;
		}
	}
}

function selectListItem(e) {
	const target = e.target;
	if(target.classList.contains(CLASS_LIST_ITEM_SELECTED)) return;

	const items = searchList.querySelectorAll(`.${CLASS_LIST_ITEM_SELECTED}`);
	for(let i=0,len=items.length;i<len;++i) {
		items[i].classList.remove(CLASS_LIST_ITEM_SELECTED);
	}
	target.classList.add(CLASS_LIST_ITEM_SELECTED);
}

function moveItem(isNext) {
	const selectedApp = document.querySelector(`.${CLASS_LIST_ITEM}.${CLASS_LIST_ITEM_SELECTED}`);
	if (selectedApp) {
		const targetApp = isNext ? selectedApp.nextElementSibling : selectedApp.previousElementSibling;
		if (!targetApp) return;
		selectedApp.classList.remove(CLASS_LIST_ITEM_SELECTED);
		targetApp.classList.add(CLASS_LIST_ITEM_SELECTED);
	} else {
		document.querySelector(`.${CLASS_LIST_ITEM}`).classList.add(CLASS_LIST_ITEM_SELECTED);
	}
}

/**
 * 検索
 */
function search() {
	const value = input.value.toLowerCase();
	if (value === inputValue) return;

	let tmpItems = [];
	inputValue = value;
	if (inputValue === '') {
		tmpItems = appData.items;
	} else {
		tmpItems = getItems(inputValue)
	}
	createList(tmpItems);
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
	const ID_CONTENT_SEARCH = 'contentSearch';
	let target = e.target;
	let tagName = target.tagName.toLowerCase();
	let noFocusOut = false;
	while (tagName !== 'html' && !noFocusOut) {
		if (target.id === ID_CONTENT_SEARCH) {
			noFocusOut = true;
		}
		target = target.parentElement;
		tagName = target.tagName.toLowerCase();
	}

	if (!noFocusOut) {
		searchList.classList.add(CLASS_LIST_HIDE);
	}
}

/**
 * リストの項目をクリックしたときの処理
 * @param {MouseEvent} e 
 */
function listItemClick(e) {
	const target = e.currentTarget;
	const id = +target.dataset['id'];
	const item = getItem(id);
	if (!item) return;

	input.value = item.name;
	search();
	input.focus();
}

/**
 * appのデータの取得
 * @param {number} id 
 */
function getItem(id) {
	let item = null;
	for (let i = 0, len = appData.items.length; i < len; ++i) {
		if (appData.items[i].id === id) {
			item = appData.items[i];
			break;
		}
	}
	return item;
}

/**
 * 一致するデータ取得
 * @param {string} name 
 */
function getItems(name) {
	let items = [];
	for (let i = 0, len = appData.items.length; i < len; ++i) {
		const item = appData.items[i];
		const itemName = item.name.toLowerCase();
		if (itemName.indexOf(name) > -1) {
			items.push(item);
		}
	}
	return items;
}

/**
 * リスト作成
 * @param {} items 
 */
function createList(items) {
	searchList.innerHTML = '';
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
