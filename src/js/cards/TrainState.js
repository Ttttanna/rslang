import {
	DEFAULT_POSITION,
	CARD_CONTAINER,
	START_LEVEL,
	START_PAGE,
	INPUT_ID,
	EMPTY_STRING,
	FADE_CLASS
} from './CardConstants';
import getNewWordsArray from './GetWord';
import Card from './Card';

export default class TrainState {
	constructor() {
		this.currentPosition = DEFAULT_POSITION;
		this.container = CARD_CONTAINER;
		this.wasError = false;
	}

	increasePosition() {
		this.currentPosition += 1;
	}

	removeCard() {
		this.container.removeChild(this.container.lastChild);
	}

	addCard() {
		if (this.currentPosition < this.cards.length) {
			this.container.append(this.getCurrentCard());
			this.container.querySelector(`#${INPUT_ID}`).value = EMPTY_STRING;
			this.container.querySelector(`#${INPUT_ID}`).focus();
		} else {
			this.finishGame();
		}
	}

	updateCard() {
		this.removeCard();
		this.addCard();
	}

	getCurrentCard() {
		return this.cards[this.currentPosition];
	}

	async initGlobalState() {
		this.words = await getNewWordsArray(START_LEVEL, START_PAGE);
		this.cards = this.words.map((word) => {
			const cardUnit = new Card(word);
			const cardElem = cardUnit.create();
			return cardElem;
		});
		this.addCard();
		this.container.querySelector('.card').classList.remove(FADE_CLASS);
	}

	finishGame() {
		alert('Все карточки на сегодня!');
		this.removeCard();
		delete this.currentPosition;
		delete this.words;
		delete this.cards;
		delete this.container;
	}

	addCurrentWordToEnd() {
		this.cards.push(this.getCurrentCard());
	}
}
