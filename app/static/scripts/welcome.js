let startX, startY;
let active = false;

$( document ).ready(function() {
  new ClipboardJS('.copy-btn');
});

window.addEventListener('touchstart', function(event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

window.addEventListener('touchend', function(event) {
  const endX = event.changedTouches[0].clientX;
  const endY = event.changedTouches[0].clientY;

  const diffX = Math.abs(startX - endX);
  const diffY = Math.abs(startY - endY);

  if (diffX < 10 && diffY < 10 && event.target.className == 'contact-button' && !active) {
    $('.contact-button').hover();
  } else if (active && !document.getElementsByClassName('buttons-wrapper')[0].contains(event.target)){
    hideContactInfo();
    setTimeout(() => {
      $('.wrapper').focus();
    }, 1000);
    active = false;
  }
});

window.onload = () => {
  $('.wrapper').css('opacity', 1);
};

function showContactInfo() {
  active = true;
  if ($('.buttons-wrapper').hasClass('show-button-wrapper') == false) {
    $('.buttons-wrapper').addClass('show-button-wrapper');

    setTimeout(() => {
      $('.mail-text').removeClass('hidden-text');
      const mailTextWidth = $('.mail-text').width();
      $('.mail-text').addClass('shown-text');
      setTimeout(() => {
        $('.shown-text').css('width', `${mailTextWidth}px`);
      }, 20);
      $('.contact-menu-button').css('column-gap', '5px');
    }, 800);
  } else {
    hideContactInfo();
  }
}

function hideContactInfo() {
  $('.shown-text').css('width', '');
  $('.contact-menu-button').css('column-gap', '0px');
  setTimeout(() => {
    $('.mail-text').removeClass('shown-text');
    $('.mail-text').addClass('hidden-text');
  }, 10);

  setTimeout(() => {
    $('.buttons-wrapper').removeClass('show-button-wrapper');
  }, 800);

  setTimeout(() => {
    $('.wrapper').focus();
  }, 3000);
}

window.addEventListener('click', (e) => {
  if ($('.buttons-wrapper').hasClass('show-button-wrapper') && 
      !document.getElementsByClassName('buttons-wrapper')[0].contains(e.target) && 
      $(e.target)[0].className!= 'contact-button'
    ) {
    hideContactInfo();
  }
});

$('.buttons-wrapper').click((e) => {
  e.stopPropagation();
});