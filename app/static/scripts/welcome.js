window.onload = () => {
  $('.wrapper').css('opacity', 1);
};


function showContactInfo() {
  if ($('.buttons-wrapper').hasClass('show-button-wrapper') == false) {
    $('.buttons-wrapper').addClass('show-button-wrapper');

    setTimeout(() => {
      $('.mail-text').removeClass('hidden-text');
      const mailTextWidth = $('.mail-text').width();
      $('.mail-text').addClass('shown-text');
      setTimeout(() => {
        $('.shown-text').css('width', `${mailTextWidth}px`);
      }, 10);
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
}

function copyToClipboard(text) {
  navigator.clipboard.writeText(text);
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