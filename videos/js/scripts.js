$(function() {
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
      file: "https://archive.org/download/MyLittlePonyFim-Season01/My.Little.Pony.Friendship.Is.Magic.S01E01.Friendship.Is.Magic.Part.1.mp4",
      image: "images/pony.jpg"
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
      $(this).find('a').html('In your Queue');
    }
    else {
      $(this).find('a').html('Add to Queue');
    }

    return false;
  });
});