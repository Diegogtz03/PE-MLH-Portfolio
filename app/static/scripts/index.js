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

window.onload = () => {
  document.body.onkeyup = async function(e) {
    if ((e.key == " " || e.code == "Space") && !animationStared) {
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
          const fadeOutData = playFadeOutSound();
        }, 500);


        setTimeout(() => {
          // stop the sound effects
          startUpData.gainsource.gain.linearRampToValueAtTime(0.01, startUpData.context.currentTime + 3);
          keyboardData.gainsource.gain.linearRampToValueAtTime(0.01, keyboardData.context.currentTime + 3);
        }, 1000);
    
        transitionOut();
      }, 3000);
    }
  }
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


async function playStartUp() {
  // Start background computer noise
  const audioContext = new AudioContext();

  const audioURL = '../static/sounds/computer_startup.mp3';

  try {
    const response = await fetch(audioURL);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    const gainSource = audioContext.createGain();
    gainSource.gain.value = 0.7;
    gainSource.connect(audioContext.destination);
    source.connect(gainSource);
    source.loop = true;
    source.start(0);

    return {
      context: audioContext,
      gainsource: gainSource
    };
  } catch (error) {
    console.error('Error loading audio:', error);
    return null;
  }
}

async function playKeyboard() {
  // Start keyboard typing noise
  const audioContext = new AudioContext();

  const audioURL = '../static/sounds/keyboard_typing.mp3';

  try {
    const response = await fetch(audioURL);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    const gainSource = audioContext.createGain();
    gainSource.gain.value = 0.7;
    gainSource.connect(audioContext.destination);
    source.connect(gainSource);
    source.loop = true;
    source.start(0);

    return {
      context: audioContext,
      gainsource: gainSource
    };
  } catch (error) {
    console.error('Error loading audio:', error);
    return null;
  }
}


async function playFadeOutSound() {
  // Start keyboard typing noise
  const audioContext = new AudioContext();

  const audioURL = '../static/sounds/fadeout_sound.mp3';

  try {
    const response = await fetch(audioURL);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    const gainSource = audioContext.createGain();
    gainSource.gain.value = 1;
    gainSource.connect(audioContext.destination);
    source.connect(gainSource);
    source.start(0);

    return {
      context: audioContext,
      gainsource: gainSource
    };
  } catch (error) {
    console.error('Error loading audio:', error);
    return null;
  }
}