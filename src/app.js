import './sass/style.scss';

import './js/authorization/NewUser';
import './js/authorization/StartPage';
import './js/authorization/WindowOnload';
import Settings from './js/settings/Settings';
// import training from './js/cards/Training';

async function initial() {
	let settings = new Settings();
	await Settings.init();
	settings = await Settings.getInstance();
	// await training();
	return settings;
}

initial();
