$(function() {
  // If available, sets the initial resume position.
  // TODO on production, use Drupalize.settings.resumePosition.
  var resumePosition = 0;

  // Preloads the JWPlayer dock icon image states.
  function preload(arrayOfImages) {
    $(arrayOfImages).each(function(){
      $('<img/>')[0].src = this;
    });
  }

  preload([
    "images/jwplayer/speed-normal.png",
    "images/jwplayer/speed-fast.png",
    "images/jwplayer/speed-fastest.png",
    "images/jwplayer/layout-normal.png",
    "images/jwplayer/layout-stacked.png",
    "images/jwplayer/transcript.png"
  ]);

  // Embed JWPlayer
  jwplayer("video").setup({
    playlist: [{
      image: "images/bg.png",
      sources: [{
        file: "https://s3.amazonaws.com/drupalize.me/_testing_joe_/jwp6/2013-10-31-Using-Drupal-4-01-960x540-300k.mp4",
        label: "360p SD"
      },{
        file: "http://drupalize.me.s3.amazonaws.com/_testing_joe_/jwp6/2013-10-31-Using-Drupal-4-01-960x540-300k.webm",
        label: "360p SD"
      },{
        file: "https://s3.amazonaws.com/drupalize.me/_testing_joe_/jwp6/2013-10-31-Using-Drupal-4-01-960x540-1200k.mp4",
        label: "720p HD",
        default: true
      },{
        file: "http://drupalize.me.s3.amazonaws.com/_testing_joe_/jwp6/2013-10-31-Using-Drupal-4-01-960x540-1200k.webm",
        label: "720p HD",
        default: true
      }],
      tracks: [{
        file: "jwplayer/english.vtt",
        label: "English",
        kind: "captions"
      },{
        file: "jwplayer/french.vtt",
        label: "French",
        kind: "captions"
      }]
    }],
    skin: "jwplayer/skins/bekle.xml",
    width: "100%",
    primary: "html5",
    aspectratio: "16:9"
  });

  // Once the first video is played, add our custom buttons.
  jwplayer().onReady(function(){
    playerSetup(this);
  });

  function playerSetup(player) {
    // Add 2x speed button when in HTML5 mode
    if (player.getRenderingMode() == 'html5') {
      player.addButton(
        "images/jwplayer/speed-normal.png",
        "Speed",
        function() {
          if (player.getState() !== 'IDLE') {
            var video = document.getElementById('video').querySelector("video");
            if (video.playbackRate == 1.0) {
              video.playbackRate = 1.5;
              $('#video_dock_speed').css('background-image', "url('images/jwplayer/speed-fast.png')");
            }
            else if (video.playbackRate == 1.5) {
              video.playbackRate = 2.0;
              $('#video_dock_speed').css('background-image', "url('images/jwplayer/speed-fastest.png')");
            }
            else {
              video.playbackRate = 1.0;
              $('#video_dock_speed').css('background-image', "url('images/jwplayer/speed-normal.png')");
            }
          }
        },
        "speed"
      );
    }

    // Add a transcript toggle button
    player.addButton(
      "images/jwplayer/transcript.png",
      "Transcript",
      function() {
        $('.transcript').toggle();
        if ($('.transcript').is(':visible')) {
          $('#video_dock_transcript').css('background-color', "#13a0d8");
        }
        else {
          $('#video_dock_transcript').css('background-color', "transparent");
        }
      },
      "transcript"
    );

    // Add a layout toggle button
    player.addButton(
      "images/jwplayer/layout-stacked.png",
      "Layout",
      function() {
        $('.hero').toggleClass('stacked');
        if ($('.hero.stacked').length) {
          $('#video_dock_layout').css('background-image', "url('images/jwplayer/layout-normal.png')");
        }
        else {
          $('#video_dock_layout').css('background-image', "url('images/jwplayer/layout-stacked.png')");
        }
      },
      "layout"
    );

    // When the user clicks play, resume where they last played up to.
    player.onPlay(function() {
      if (resumePosition) {
        player.seek(resumePosition);
      }
    });
  }

  // Tooltip initializer
  $('.tooltip').tooltipster({
    theme: 'tooltipster-dme',
  });

  // Transcript filter
  $('#transcript-filter').keyup(function() {
    if ($(this).val().length) {
      $('.transcript-list li').hide().filter(function () {
        return $(this).text().toLowerCase().indexOf($('#transcript-filter').val().toLowerCase()) != -1;
      }).show();
    }
    else {
      $('.transcript-list li').show();
    }
  });

  // Transcript seek links
  $('.time').click(function() {
    var position = $(this).attr('data-offset');
    jwplayer().seek(position);
  });

  // Transcript close button
  $('.close').click(function() {
    $('.transcript').hide();
    $('#video_dock_transcript').css('background-color', "transparent");
  });

  // Playlist navigation
  $('.playlist-content a').click(function() {

    // Set the resume position if it's available
    if ($(this).attr('data-resume')) {
      resumePosition = $(this).attr('data-resume');
    }

    $('.playlist-content a').removeClass('active');
    $(this).addClass('active');

    var title = $(this).find('.playlist-item-title').html();
    $('#page-title .video-title').html(title);
    $(document).attr("title", title);

    if (!$('.js-tabs a.description').hasClass('active')) {
      $('.js-tabs a.description').click();
    }

    $('.node').hide();
    $('.loading').show();

    // Mimics the loading of a node content. On production, we will make an
    // AJAX call to return the node content.
    setTimeout(function() {
      $('.loading').hide();
      $('.node').fadeIn('fast');
    }, 1000);

    // Simulates a file load. On production, the file and image uris will be
    // taken from attributes applied to each playlist item DOM element.
    jwplayer().load([{
      image: "images/bg2.jpg",
      sources: [{
        file: "https://s3.amazonaws.com/drupalize.me/_testing_joe_/jwp6/2013-10-31-Media-01-960x540-300k.mp4",
        label: "360p SD"
      },{
        file: "http://drupalize.me.s3.amazonaws.com/_testing_joe_/jwp6/2013-10-31-Media-01-960x540-300k.webm",
        label: "360p SD"
      },{
        file: "https://s3.amazonaws.com/drupalize.me/_testing_joe_/jwp6/2013-10-31-Media-01-960x540-1200k.mp4",
        label: "720p HD",
        default: true
      },{
        file: "http://drupalize.me.s3.amazonaws.com/_testing_joe_/jwp6/2013-10-31-Media-01-960x540-1200k.webm",
        label: "720p HD",
        default: true
      }]
    }]).play();

    return false;
  });

  // Tab navigation
  $('.js-tabs a').click(function() {
    $('.js-tabs a').removeClass('active');
    $(this).addClass('active');

    var selector = $(this).attr('data-tab');
    $('.tab-content').hide();
    $('.' + selector).show();

    return false;
  });

  // Add to Queue
  $('.add-to-queue').click(function() {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $(this).find('.text').html('Remove');
    }
    else {
      $(this).find('.text').html('Queue');
    }

    return false;
  });

  $('.add-to-queue').hover(function() {
    if ($(this).hasClass('active')) {
      $(this).find('.text').html('Remove');
    }
  }, function() {
    if ($(this).hasClass('active')) {
      $(this).find('.text').html('Queued');
    }
  });

  $('.embed').click(function() {
    $('.embed-wrapper').slideToggle();
    $('.embed-wrapper textarea').select();
    return false;
  });

  // Animate series progress water
  $(window).load(function() {
    var watched = $('.series-progress').attr('data-watched');
    var total = $('.series-progress').attr('data-total');

    // Calculate percentage watched
    var percent = (watched / total) * 100;

    // Calculate water background position based on percentage
    var position = (80 / 100) * percent;
    var position = 80 - position;

    $('.series-progress').css('background', '#137cc1');
    $('.series-progress .water').css('top', position + 'px');

    // Animate series progress percent
    $({number: 0}).animate({number: watched}, {
      duration: 2000,
      easing: 'linear',
      step: function() {
        $('.series-progress .percent').text(Math.floor(this.number) + '/' + total);
      },
      complete: function() {
        $('.series-progress .percent').text(this.number + '/' + total);
      }
    });
  });
});