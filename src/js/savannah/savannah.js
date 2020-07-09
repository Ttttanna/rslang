import generateElements from './generateElements'
import createMainPage from './createMainPage'

export default function savannah() {
  window.addEventListener('load', () => {
    createMainPage();
    const startingButton = document.querySelector('.starting-button');
    const infoContainer = document.querySelector('.info');
    const main = document.querySelector('.info-wrapper');
    const hint = document.querySelector('.hint');
    const volumeContainer = document.querySelector('.volume-settings');
    const volumeOn = document.querySelector('.volume-up-icon');
    const volumeOff = document.querySelector('.volume-mute-icon');

    async function game() {
      const loader = document.createElement('DIV');
      loader.classList.add('loader');
      infoContainer.remove();
      hint.style.visibility = 'visible';
      main.prepend(loader);
      generateElements();
    }

    startingButton.addEventListener('click', game);

    volumeContainer.addEventListener('click', () => {
      if (volumeOn.style.display === 'none') {
        volumeContainer.classList.remove('silence-mode');
        volumeOn.style.display = 'block';
        volumeOff.style.display = 'none';
      } else {
        volumeContainer.classList.add('silence-mode');
        volumeOn.style.display = 'none';
        volumeOff.style.display = 'block';
      }
    });
  });
}