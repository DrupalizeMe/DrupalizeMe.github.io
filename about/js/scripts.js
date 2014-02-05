$(function() {
    // Tooltip initializer
  $('.tooltip').tooltipster({
    theme: 'tooltipster-dme',
    delay: 150,
    speed: 200
  });

  $(window).load(function() {
    $('h2, .about--paragraph, .about--team-member, .about--team--banner, .about--offices-button').addClass('active');
  });

});
