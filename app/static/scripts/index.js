// Text to be written in simulated terminal
const textToWrite = `import { Life } from 'Diego';
  import { Projects } from 'Diego/Projects';
  import { Skills } from 'Diego/Skills';
  import { Contact } from 'Diego/Contact';

  cd ~/Documents
  cd People
  cd Diego

  execute Diego.js
  `;

// Variable taht holds current text being written in terminal
let currentText = '';

// time in ms to wait before writing next character
const minTime = 50;
const maxTime = 150;

window.onload = () => {
  setTimeout(async () => {
    // remove loading text and show writing text
    $('.loading-text').remove();
    $('.monitor-writing-text').removeClass('hidden');

    // Iterate over each character of the text to write and add it to the current text
    for (var i = 0; i < textToWrite.length; i++) {
      // check for new lines
      if (textToWrite[i] === '\n') {
        currentText += '<br>';
      }

      currentText += textToWrite[i];

      // set the current text to the monitor
      $('.monitor-writing-text').html(currentText);

      // await a random time before writing the next character
      await new Promise(r => setTimeout(r, Math.floor(Math.random() * (maxTime - minTime + 1) + minTime)));
    }

    transitionOut();
  }, 3000);
};

function transitionOut() {
  // transition the whole page out
  $('.wrapper').css('opacity', 0);

  setTimeout(() => {
    $('.noise-wrapper').css('opacity', 0.05);
  }, 3000);

  // redirect the user to the next page
  setTimeout(() => {
    window.location.href = '/welcome';
  }, 4500);
}