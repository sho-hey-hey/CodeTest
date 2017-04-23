# CodeTest

## behavior

1. Search app to entry word in input form.
	- Matching characters are in bold.
2. Click, tap or press enter to select what you were looking for.
	- You can select items with the up and down arrow keys or mouse on item.
	- Input form is updated to the selected application name.
3. Search again, it will be displayed in descending order of search count.
	- If delete your search history, you select `×` and click `remove history`.

## environment

### taskrunner

* npm-script
* gulp

|package|version|
|:--|:--|
|babel|`^6.23.0`|
|babel-core|`^6.24.1`|
|babel-loader|`^6.23.0`|
|babel-preset-es2015|`^6.24.1`|
|gulp|`^3.9.1`|
|gulp-autoprefixer|`^3.1.1`|
|node-sass|`^4.5.2`|
|npm-run-all|`^4.0.2`|
|rimraf|`^2.6.1`|
|webpack|`^2.4.1`|

### CSS
* SASS
* autoPrefixer
	|browser|version|
	|:--|:--|
	|InternetExplorer|`ie >= 9`|
	|Andrid|`Android >= 2`|
	|iOS|`iOS >= 7`|
	|Other|`last 2 versions`|

### JS
* webpack
	- Convert ES2015 to ES5 using `babel-preset-es2015`
	- Place `./src/js/**/*.js` compiled on `./js/**/*.js`
	- Place `scripts.js` under `./src/js/` as `scripts.js` under `./js/`


