import axios from 'axios';
import env from '../config/env';
var qs = require('qs');

let util = {

};
util.title = function (title) {
    title = title || 'lambo';
    window.document.title = title;
};

const ajaxUrl = env === 'development'
    ? ''
    : env === 'production'
    ? '/auth'
    : '';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});
util.params = function (obj){
	return qs.stringify(obj);
}

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};

util.handleTitle = function (vm, item) {
    return item.title;
};

util.openNewPage = function (name, argu, query) {
    let pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [];
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) {  // 页面已经打开
            let openedPage = pageOpenedList[i];
            if (argu) {
                openedPage.argu = argu;
            }
            if (query) {
                openedPage.query = query;
            }
            pageOpenedList.splice(i, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        var tagsList = JSON.parse(localStorage.tagsList);
        let tag = tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        tag = tag.children ? tag.children[0] : tag;
        if (argu) {
            tag.argu = argu;
        }
        if (query) {
            tag.query = query;
        }
        pageOpenedList.push(tag);
        localStorage.pageOpenedList = JSON.stringify(pageOpenedList);
    }
    localStorage.currentPageName = name;
};

export default util;
