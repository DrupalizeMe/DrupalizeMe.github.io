$(function() {

  // Embed JWPlayer
  jwplayer("video").setup({
    playlist: [{
      image: "images/bg.png",
      sources: [{
        file: "https://s3.amazonaws.com/drupalize.me/_testing_joe_/jwp6/2013-10-31-Using-Drupal-4-01-960x540-300k.mp4",
        label: "360p SD"
      },{
        file: "https://s3.amazonaws.com/drupalize.me/_testing_joe_/jwp6/2013-10-31-Using-Drupal-4-01-960x540-1200k.mp4",
        label: "720p HD"
      }]
    }],
    file: "http://developer.longtailvideo.com/trac/export/944/trunk/html5/test/files/bunny.mp4",
    skin: "jwplayer/skins/bekle.xml",
    width: "100%",
    aspectratio: "16:9"
  });

  // Once the first video is played, add our custom buttons.
  jwplayer().onPlay(function(){
    playerSetup(this);
  });

  function playerSetup(player) {
    // Add 2x speed button when in HTML5 mode
    if (player.getRenderingMode() == 'html5') {
      player.addButton(
        "images/1x.png",
        "Speed",
        function() {
          var video = document.getElementById('video').querySelector("video");

          if (video.playbackRate == 1.0) {
            video.playbackRate = 1.5;
            $('#video_dock_speed').css('background-image', "url('images/15x.png')");
          }
          else if (video.playbackRate == 1.5) {
            video.playbackRate = 2.0;
            $('#video_dock_speed').css('background-image', "url('images/2x.png')");
          }
          else {
            video.playbackRate = 1.0;
            $('#video_dock_speed').css('background-image', "url('images/1x.png')");
          }
        },
        "speed"
      );
    }

    // Add a transcript toggle button
    player.addButton(
      "images/1x.png",
      "Transcript",
      function() {
        $('.transcript').toggle();
      },
      "transcript"
    );

    // Add a layout toggle button
    player.addButton(
      "images/1x.png",
      "Layout",
      function() {
        $('.hero').toggleClass('stacked');
      },
      "layout"
    );
  }

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

  // Transcript close button
  $('.close').click(function() {
    $('.transcript').hide();
  });

  // Playlist navigation
  $('.playlist-content a').click(function() {
    $('.playlist-content a').removeClass('active');
    $(this).addClass('active');

    var title = $(this).find('.playlist-item-title').html();
    $('#page-title').html(title);
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
        file: "https://s3.amazonaws.com/drupalize.me/_testing_joe_/jwp6/2013-10-31-Media-01-960x540-1200k.mp4",
        label: "720p HD"
      }]
    }]);

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
      $(this).find('.text').html('In your Queue');
    }
    else {
      $(this).find('.text').html('Add to Queue');
    }

    return false;
  });

  // Animate series progress water
  var percent = $('.series-progress').attr('data-percent');
  var position = (80 / 100) * percent;
  var position = 80 - position;
  $('.series-progress .water').css('top', position + 'px');

  // Animate series progress percent
  $({number: 0}).animate({number: percent}, {
    duration: 2000,
    easing: 'linear',
    step: function() {
      $('.series-progress .percent').text(Math.floor(this.number) + '%');
    },
    complete: function() {
      $('.series-progress .percent').text(this.number + '%');
    }
  });
});