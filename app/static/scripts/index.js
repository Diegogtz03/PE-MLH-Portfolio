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
let animationStared = false;

// time in ms to wait before writing next character
const minTime = 50;
const maxTime = 150;
let startX, startY;

window.onload = () => {
  if (window.innerWidth < 768) {
    $('.loading-text.text-promt').html('Tap to continue');
  }

  document.body.onkeyup = async function(e) {
    if ((e.key == " " || e.code == "Space") && !animationStared) {
      exectuteTransition();
    }
  }


  // Phone on click event
  window.addEventListener('touchstart', function(event) {
    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
  });

  window.addEventListener('touchend', function(event) {
    const endX = event.changedTouches[0].clientX;
    const endY = event.changedTouches[0].clientY;

    const diffX = Math.abs(startX - endX);
    const diffY = Math.abs(startY - endY);

    if (diffX < 10 && diffY < 10 && !animationStared) {
      exectuteTransition();
    }
  });
};



async function exectuteTransition() {
  animationStared = true;
  $('.text-promt').css('opacity', 0);

  // Start playing computer startup noise
  const startUpData = await playStartUp();

  setTimeout(async () => {
    // remove loading text and show writing text
    $('.loading-text').remove();
    $('.monitor-writing-text').removeClass('hidden');
    
    // Start playing keyboard typing noise
    const keyboardData = await playKeyboard();

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

    // Start exit sound effect
    setTimeout(() => {
      playFadeOutSound();
      // stop the sound effects
      startUpData.sound.fade(0.7, 0, 1000, startUpData.id1);
      keyboardData.sound.fade(0.9, 0, 1000, keyboardData.id1);
    }, 500);

    transitionOut();
  }, 3000);
}


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

async function playStartUp() {
  const audioURL = '../static/sounds/computer_startup.mp3';

  var sound = new Howl({
    src: [audioURL],
    loop: true,
    volume: 0.7
  });
  
  var id1 = sound.play();

  return {
    sound: sound,
    id1: id1
  }
}

async function playKeyboard() {
  const audioURL = '../static/sounds/keyboard_typing.mp3';

  var sound = new Howl({
    src: [audioURL],
    loop: true,
    volume: 0.9
  });
  
  var id1 = sound.play();

  return {
    sound: sound,
    id1: id1
  }
}


async function playFadeOutSound() {
  const audioURL = '../static/sounds/fadeout_sound.mp3';

  var sound = new Howl({
    src: [audioURL],
    volume: 1.1
  });
  
  sound.play();
}