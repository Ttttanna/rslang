import {
	CARD_CONTAINER,
	INPUT_WIDTH_UNIT,
	DISPLAY_NONE_CLASS,
	HIDDEN_CLASS,
	FADE_CLASS,
} from './CardConstants';
import WORDS_EVENTS from '../observer/WordsEvents';
import GlobalState from './GlobalState';
import InputHandler from './InputHandler';

const globalState = new GlobalState();

function input() {
	globalState.inputHandler = new InputHandler();
	globalState.inputHandler.element.style.width = `${globalState.inputHandler.wordHidden.offsetWidth}${INPUT_WIDTH_UNIT}`;
}

function checkDifficulty() {
	const complexityGroup = document.querySelector('.button-group__complexity');
	if (!complexityGroup.classList.contains(DISPLAY_NONE_CLASS)) {
		complexityGroup.classList.remove(HIDDEN_CLASS);
	}
}

function showTranslate() {
	// translateHandler.checkMeaning();
	// translateHandler.checkExample();
}

function correctAnswerHandler() {
	globalState.wasError = false;
	globalState.increasePosition();
	document.querySelector('.card').classList.add(FADE_CLASS);
	checkDifficulty();

	setTimeout(() => {
		globalState.updateCard();
		if (globalState.currentPosition < globalState.cards.length) {
			document.querySelector('.card').classList.remove(FADE_CLASS);
			input();
		}else {
			globalState.finishGame();
		}
	}, 500);
}

function errorAnswerHandler() {
	if (!globalState.wasError) {
		globalState.wasError = true;
		globalState.addCurrentWordToEnd();
		showTranslate();
	}
	globalState.inputHandler.showError();
}

function againHandler() {
	globalState.addCurrentWordToEnd();
}

function addListeners() {
	document.addEventListener(WORDS_EVENTS.CORRECT_ANSWER, correctAnswerHandler);
	document.addEventListener(WORDS_EVENTS.INCORRECT_ANSWER, errorAnswerHandler);
	document.addEventListener(WORDS_EVENTS.PUSHED_AGAIN, againHandler);
}

function removeListeners() {
	document.removeEventListener(
		WORDS_EVENTS.CORRECT_ANSWER,
		correctAnswerHandler
	);
	document.removeEventListener(
		WORDS_EVENTS.INCORRECT_ANSWER,
		errorAnswerHandler
	);
	document.removeEventListener(WORDS_EVENTS.PUSHED_AGAIN, againHandler);
}

function gameOverCallback() {
	removeListeners();
	CARD_CONTAINER.removeEventListener(WORDS_EVENTS.TRAINING_GAME_OVER, gameOverCallback);
}

CARD_CONTAINER.addEventListener(WORDS_EVENTS.TRAINING_GAME_OVER, gameOverCallback);

export default async function training() {
	await globalState.initGlobalState();
	addListeners();
	input();
}
