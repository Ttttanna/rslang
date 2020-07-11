import giveWords from './giveWords';
import generateWordContainers from './generateWordContainers';
import {arrForUniqness, arrForRandFunc, fetchInfo} from './consts';

export default	async function defineArrays() {
	fetchInfo.round += 1;
	const allWords = await giveWords(fetchInfo.level, fetchInfo.round);
	allWords.forEach(item => {
		arrForUniqness.push(item);
	});
	allWords.forEach(item => {
		arrForRandFunc.push(item);
	});
	generateWordContainers(arrForUniqness, arrForRandFunc);
}
