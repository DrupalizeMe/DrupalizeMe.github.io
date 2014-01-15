$(function() {
  // Add 2x speed button for HTML5
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
    skin: "jwplayer/six/six.xml",
    width: "100%",
    aspectratio: "16:9"
  });

  jwplayer().onPlay(function(){
    playerSetup(this);
  });

  function playerSetup(player) {
    if (player.getRenderingMode() == 'html5') {
      player.addButton(
        "images/1x.png",
        "Current Speed",
        function() {
          var video = document.getElementById('video');

          if (video.querySelector("video").playbackRate == 1.0) {
            video.querySelector("video").playbackRate = 1.5;
            $('#video_dock_transcript').css('background-image', "url('images/15x.png')");
          }
          else if (video.querySelector("video").playbackRate == 1.5) {
            video.querySelector("video").playbackRate = 2.0;
            $('#video_dock_transcript').css('background-image', "url('images/2x.png')");
          }
          else {
            video.querySelector("video").playbackRate = 1.0;
            $('#video_dock_transcript').css('background-image', "url('images/1x.png')");
          }
        },
        "transcript"
      );
    }
  }

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

  $('.js-tabs a').click(function() {
    $('.js-tabs a').removeClass('active');
    $(this).addClass('active');

    var selector = $(this).attr('data-tab');
    $('.tab-content').hide();
    $('.' + selector).show();

    return false;
  });

  $('.add-to-queue').click(function() {
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
      $(this).html('In your Queue');
    }
    else {
      $(this).html('Add to Queue');
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