$(function() {
    // Tooltip initializer
  $('.tooltip').tooltipster({
    theme: 'tooltipster-dme',
    delay: 150,
    speed: 200
  });

  $(window).load(function() {
    $('.about--team-member, .about--team--banner').addClass('active');
  });

});
