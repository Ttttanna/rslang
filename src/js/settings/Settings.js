import TAGS from '../shared/Tags.json';
import DOMElementCreator from '../utils/DOMElementCreator';
import {
	TEXT
} from '../shared/Text';

export default class Settings {
	static getUserSettings() {
		const inputs = [].slice.call(document.forms.settings.elements);
		const settings = {};
		inputs.forEach(input => {
			if (input.getAttribute('type') === 'number') {
				settings[input.getAttribute('name')] = input.value;
			} else if (input.getAttribute('type') === 'checkbox') {
				settings[input.getAttribute('name')] = input.checked;
			}
		});
		return settings;
	}

	static checkUserSettings() {
		const settings = this.getUserSettings();
		if (settings.translate || settings.meaning || settings.example) {
			this.showSuccessMessage();
			return settings;
		}
		return this.showError();
	}

	static showSuccessMessage() {
		const newElem = new DOMElementCreator();
		const message = newElem.create({
			elem: TAGS.SPAN,
			classes: 'success__message',
			child: TEXT.settingsPage.successMessage,
		});
		const form = document.querySelector('.settings__form');
		const previousErrorMessage = document.querySelector('.settings__wrapper > .error__message');
		const previousSuccessMessage = document.querySelector('.settings__wrapper > .success__message');
		if (previousErrorMessage) {
			previousErrorMessage.remove();
		}
		if (!previousSuccessMessage) {
			form.after(message);
		}
	}

	static showError() {
		const newElem = new DOMElementCreator();
		const message = newElem.create({
			elem: TAGS.SPAN,
			classes: 'error__message',
			child: TEXT.settingsPage.errorMessage,
		});
		const form = document.querySelector('.settings__form');
		const previousMessage = document.querySelector('.settings__wrapper > .error__message');
		const previousSuccessMessage = document.querySelector('.settings__wrapper > .success__message');
		if (previousSuccessMessage) {
			previousSuccessMessage.remove();
		}
		if (!previousMessage) {
			form.after(message);
		}
	}
}