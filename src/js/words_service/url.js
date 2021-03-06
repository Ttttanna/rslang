import {
	API,
	URL_WORDS,
	URL_GROUP,
	URL_USER,
	URL_AGGREGATED,
	URL_NEXT,
	URL_ET,
	URL_PAGE,
	URL_FILTER,
	URL_PARAM,
	MAX_WORDS_PARAMETER
} from '../shared/Constants';
import {
	USER,
} from '../utils/CookieConstants';
import CookieMonster from '../utils/CookieMonster';

function getUserId() {
	const biscuit = new CookieMonster();
	return biscuit.getCookie(USER.ID);
}

const url = {};

url.groupPage = function getUrlFromGroupAndPage(group, page) {
	return `${API}${URL_WORDS}${URL_PARAM}${URL_GROUP}${group}${URL_ET}${URL_PAGE}${page}`;
};

url.allWords = function getUrlForAllUserWords() {
	const userId = getUserId();
	return `${API}${URL_USER}${userId}${URL_WORDS}`;
};

url.oneWord = function getUrlForUserWord(wordId) {
	const userId = getUserId();
	return `${API}${URL_USER}${URL_NEXT}${userId}${URL_NEXT}${URL_WORDS}${URL_NEXT}${wordId}`;
};

url.aggregated = function getUrlForAggregatedWord(criteria) {
	const userId = getUserId();
	return `${API}${URL_USER}${URL_NEXT}${userId}${URL_NEXT}${URL_AGGREGATED}${URL_PARAM}${URL_FILTER}${criteria}${MAX_WORDS_PARAMETER}`;
};

export default url;
