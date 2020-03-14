var heroImg = $('.hero-img');
var teamBg = $('.home-team-bg');
var win = $(window);

$.fn.isInViewport = function () {
  if ($(this).offset()) {
    var elementTop = $(this).offset().top;
    var elementBottom = elementTop + $(this).outerHeight();
    var viewportTop = $(window).scrollTop();
    var viewportBottom = viewportTop + $(window).height();
    return elementBottom > viewportTop && elementTop < viewportBottom;
  }
};

function imagePos() {
  var pos = win.scrollTop();

  heroImg.css('margin-top', '-' + (pos / 3.5) + 'px');

  if (teamBg.isInViewport()) {
    teamPos = teamBg.offset().top - pos;
    teamBg.css('margin-top', (teamPos / 3) + 'px');
  }
}

imagePos();

win.on('scroll', imagePos);