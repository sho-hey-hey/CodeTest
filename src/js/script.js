import { asyncConnect } from './asyncService';
import { LocalStorageService } from './localStorageService';

const CLASS_LIST_HIDE = 'search-list--hide';
const CLASS_LIST_ITEM = 'search-list__item';
const CLASS_LIST_ITEM_SELECTED = `${CLASS_LIST_ITEM}--selected`;
const CLASS_LIST_ITEM_BUTTON = `${CLASS_LIST_ITEM}-button`;
const CLASS_LIST_ITEM_REMOVE = `${CLASS_LIST_ITEM}-remove`;
const CLASS_LIST_ITEM_REMOVE_HIDE = `${CLASS_LIST_ITEM_REMOVE}--hide`;
let input;
let inputValue = '';
let searchList;
let appData = {};
let enableMouseMoveEventTimerId = 0;
let enableMouseMoveEvent = true;

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
	searchList.addEventListener('scroll', hideRemoveButton, false);
	searchList.addEventListener('click', clickSearchList, false);
	searchList.addEventListener('mousemove', mouseMoveSearchList, false);
	document.addEventListener('click', focusOut, true);
	document.addEventListener('keyup', keyUp, false);
	document.addEventListener('keydown', keyDown, false);
}

/**
 * リストクリックイベント
 * @param {MouseEvent} e 
 */
function clickSearchList(e) {
	let target = e.target;
	while (searchList !== target) {
		// 削除ボタンを押したときのメソッドを返す
		if(target.classList.contains(CLASS_LIST_ITEM_REMOVE)) {
			console.log(`you clicked ".${CLASS_LIST_ITEM_REMOVE}" element`);
			const id = +target.parentElement.dataset['id'];
			target.classList.add(CLASS_LIST_ITEM_REMOVE_HIDE);
			LocalStorageService.removeItem(`${id}`);
			search(true);
			break;
		}

		// 削除確認ボタンをおした時のメソッドを返す
		if(target.classList.contains(CLASS_LIST_ITEM_BUTTON)) {
			hideRemoveButton();
			target.nextElementSibling.classList.remove(CLASS_LIST_ITEM_REMOVE_HIDE);
			break;
		}

		// リストの項目をクリックしたときの処理
		if(target.classList.contains(CLASS_LIST_ITEM)) {
			const id = +target.dataset['id'];
			// モバイルで文字入力途中の場合入力文字を残さないために遅延させる
			input.blur();
			setTimeout(() => {
				entryLog(id);
				setInputValue(id);
			}, 20);
			break;
		}

		target = target.parentElement;
	}
}

/**
 * KeyDownイベント
 * @param {KeyEvent} e 
 */
function keyDown(e) {
	const keyCode = e.code;
	keyEventVisibleList(keyCode);
}

/**
 * KeyUpイベント
 * @param {KeyEvent} e 
 */
function keyUp(e) {
	const target = e.target;
	if(input === target) {
		search();
	}
}


/**
 * リストが表示されているときに受けるイベント
 * @param {string} keyCode 
 */
function keyEventVisibleList(keyCode) {
	if (!searchList.classList.contains(CLASS_LIST_HIDE)) {
		switch (keyCode) {
			case 'ArrowUp':
				changeSelectedItem(false);
				break;
			case 'ArrowDown':
				changeSelectedItem(true);
				break;
			case 'Enter':
				const selectedItem = searchList.querySelector(`.${CLASS_LIST_ITEM_SELECTED}`);
				const id = selectedItem ? +selectedItem.dataset['id'] : null;
				entryLog(id);
				setInputValue(id);
				break;
			default:
				break;
		}
	}
}

/**
 * リストのmoveイベント
 * @param {MouseEvent} e 
 */
function mouseMoveSearchList(e) {
	const target = e.target;
	if (
		!isTargetElement(target, searchList) ||
		!target.classList.contains(CLASS_LIST_ITEM) ||
		target.classList.contains(CLASS_LIST_ITEM_SELECTED) ||
		!enableMouseMoveEvent
	) return;

	const items = searchList.querySelectorAll(`.${CLASS_LIST_ITEM_SELECTED}`);
	for (let i = 0, len = items.length; i < len; ++i) {
		items[i].classList.remove(CLASS_LIST_ITEM_SELECTED);
	}
	target.classList.add(CLASS_LIST_ITEM_SELECTED);
}

/**
 * 選択中の項目を変更する
 * @param {boolean} isNext 
 */
function changeSelectedItem(isNext) {
	const selectedApp = document.querySelector(`.${CLASS_LIST_ITEM}.${CLASS_LIST_ITEM_SELECTED}`);
	if (selectedApp) {
		const targetApp = isNext ? selectedApp.nextElementSibling : selectedApp.previousElementSibling;
		if (!targetApp) return;
		const listHeight = searchList.clientHeight;
		const listScrollTop = searchList.scrollTop;
		const targetHeight = targetApp.clientHeight;
		const targetTop = targetApp.offsetTop;

		selectedApp.classList.remove(CLASS_LIST_ITEM_SELECTED);
		targetApp.classList.add(CLASS_LIST_ITEM_SELECTED);

		// 一定時間リスト上ののmoveイベントを効かないようにする
		enableMouseMoveEvent = false;
		clearTimeout(enableMouseMoveEventTimerId);
		enableMouseMoveEventTimerId = setTimeout(() => { enableMouseMoveEvent = true; }, 200);
		if (listScrollTop > targetTop) {
			searchList.scrollTop = targetTop;
		} else if (listScrollTop + listHeight < targetTop + targetHeight) {
			searchList.scrollTop = targetTop + targetHeight - listHeight;
		}
	} else {
		document.querySelector(`.${CLASS_LIST_ITEM}`).classList.add(CLASS_LIST_ITEM_SELECTED);
	}
}

/**
 * すべての削除ボタンを隠す
 */
function hideRemoveButton() {
	const removeButtons = document.querySelectorAll(`.${CLASS_LIST_ITEM_REMOVE}:not(.${CLASS_LIST_ITEM_REMOVE_HIDE})`);
	for (let i = 0, len = removeButtons.length; i < len; ++i) {
		removeButtons[i].classList.add(CLASS_LIST_ITEM_REMOVE_HIDE);
	}
}

/**
 * 検索
 */
function search(isForce) {
	const value = input.value.toLowerCase();
	if (value === inputValue && !isForce) return;

	let tmpItems = [];
	inputValue = value;
	if (inputValue === '') {
		tmpItems = appData.items;
		for (let i = 0, len = tmpItems.length; i < len; ++i) {
			tmpItems[i].decolateName = tmpItems[i].name;
		}
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
	if (!isTargetElement(e.target, document.getElementById('contentSearch'))) {
		hideRemoveButton();
		searchList.classList.add(CLASS_LIST_HIDE);
	}
}

/**
 * 対象の要素が親要素に存在するかどうかを簡易的(座標は考慮せず)に調べる
 * @param {HTMLElement} currentElement 
 * @param {HTMLElement} targetElement 
 */
function isTargetElement(currentElement, targetElement) {
	let tagName = currentElement.tagName.toLowerCase();
	let isTarget = false;
	while (tagName !== 'html' && !isTarget) {
		if (currentElement === targetElement) {
			isTarget = true;
		}
		currentElement = currentElement.parentElement;
		tagName = currentElement.tagName.toLowerCase();
	}

	return isTarget;
}

/**
 * ログ追加
 * @param {number} id 
 */
function entryLog(id) {
	if (id === null) return;

	let log = LocalStorageService.getItem(`${id}`);
	if (log) {
		log.num++;
		LocalStorageService.removeItem(`${id}`);
	} else {
		log = { id: id, num: 1 };
	}
	LocalStorageService.setItem(`${id}`, log);
}

/**
 * ログの取得
 * @param {number} id 
 */
function getLog(id) {
	return LocalStorageService.getItem(`${id}`);
}

/**
 * 入力フォームの中身を対象IDの名前にする
 * @param {number} id 
 */
function setInputValue(id) {
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
		const reg = new RegExp(name, 'gi');
		const split = item.name.split(reg);
		const match = item.name.match(reg);
		if (itemName.indexOf(name) > -1) {
			item.decolateName = '';
			for (let i = 0, len = split.length; i < len; ++i) {
				item.decolateName += split[i];
				if (match[i]) item.decolateName += `<span class="search-list__item-bold">${match[i]}</span>`;
			}
			items.push(item);
		}
	}
	return items;
}

/**
 * ソートした項目取得
 * @param {[]} items 
 */
function getSortItems(items) {
	return items.sort((a, b) => {
		const aLog = getLog(a.id);
		const bLog = getLog(b.id);
		const aNum = aLog ? aLog.num : 0;
		const bNum = bLog ? bLog.num : 0;

		a.num = aNum;
		b.num = bNum;

		if (aNum < bNum) {
			return 1;
		} else if (aNum > bNum) {
			return -1;
		} else {
			if (a.id > b.id) {
				return 1;
			} else if (a.id < b.id) {
				return -1;
			}
			return 0;
		}
	});
}

/**
 * リスト作成
 * @param {} items 
 */
function createList(items) {
	searchList.innerHTML = '';
	const tmpItems = getSortItems(items);
	for (let i = 0, len = tmpItems.length; i < len; ++i) {
		const item = tmpItems[i];
		const itemElem = document.createElement('li');
		const itemImgElem = document.createElement('img');
		const itemNameElem = document.createElement('span');

		itemElem.classList.add(CLASS_LIST_ITEM);
		itemElem.dataset['id'] = item.id;
		itemElem.title = item.name;

		itemImgElem.classList.add('search-list__item-img');
		itemImgElem.src = item.logo;
		itemImgElem.width = 40;
		itemImgElem.height = 40;

		itemNameElem.classList.add('search-list__item-name');
		itemNameElem.innerHTML = item.decolateName || item.name;

		itemElem.appendChild(itemImgElem);
		itemElem.appendChild(itemNameElem);

		if (item.num) {
			const itemDeleteConfirmElem = document.createElement('span');
			const itemDeleteElem = document.createElement('div');
			itemElem.classList.add('search-list__item--history');
			itemDeleteConfirmElem.classList.add('search-list__item-button');
			itemDeleteConfirmElem.innerText = '×';
			itemDeleteElem.classList.add(CLASS_LIST_ITEM_REMOVE);
			itemDeleteElem.classList.add(CLASS_LIST_ITEM_REMOVE_HIDE);
			itemDeleteElem.innerHTML = 'remove<br>history';

			itemElem.appendChild(itemDeleteConfirmElem);
			itemElem.appendChild(itemDeleteElem);
		}

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
			createList(appData.items);
			setEvent();
		}
	);
}

initialize();
