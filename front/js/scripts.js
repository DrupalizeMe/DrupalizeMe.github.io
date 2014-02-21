$(function() {

  // Plugin to animate an elements background position regardless of browser.
  jQuery.fn.extend({
    animateApp: function() {
      $(this).animate({
        'border-spacing': 0
      }, {
        step: function(now, fx) {
          $(this).css('background-position', '0 ' + now + 'px');
        },
        duration: 750,
        easing: 'easeOutBounce'
      });
    }
  });

  // Initialize the video watched ticket.
  $('.tick').ticker({
    delay: 1000,
    separators: true
  });

  // Initialize our hero video modal.
  $('.home--hero--video-link').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade'
  });

  // Initialize the responsive carousel sliders.
  $(".rslides").responsiveSlides({
    auto: false,
    pager: true,
    nav: false
  });

  // Quick tabs for the video library.
  $('.home--library--tab').click(function() {
    $('.home--library--tab').removeClass('active');
    $(this).addClass('active');

    var tab = $(this).attr('data-tab');
    $('.home--library--tab-content').removeClass('active');
    $('.home--library--tab-content.' + tab).addClass('active');

    return false;
  });

  // When the app devices element scrolls entirely into view, scroll up the
  // individual device images.
  $(window).scroll(function() {
    if ($('.home--apps--devices.scroll-processed').length === 0) {
      var devicesTop = $('.home--apps--devices').offset().top;
      var devicesBottom = devicesTop + $('.home--apps--devices').height();
      var docViewTop = $(window).scrollTop();
      var docViewBottom = docViewTop + $(window).height();

      if ((devicesBottom <= docViewBottom) && (devicesTop >= docViewTop)) {
        $('.home--apps--devices').addClass('scroll-processed');
        $('.home--apps--tablet').animateApp();

        setTimeout(function() {
          $('.home--apps--desktop').animateApp();
        }, 250);

        setTimeout(function() {
          $('.home--apps--mobile').animateApp();
        }, 600);
      }
    }
  });

  // The list of all of our client logos.
  var clients = ['fossil', 'ge', 'maxim', 'nasa', 'nbc', 'npr', 'nvidia', 'redhat', 'smithsonian', 'sonypictures', 'ds', 'ebay', 'hhs', 'ky', 'marthastewart'];

  // Helper function to randomnly animate a client logo.
  function randomizeClients(replace) {
    var random = Math.floor(Math.random() * (clients.length - 1));
    var index = replace != null ? replace : Math.floor(Math.random() * 5);

    if ($('.home--world--logo a.' + clients[random]).length > 0) {
      randomizeClients(replace);
    }
    else {
      $('.home--world--logo').eq(index).find('a').css('background-image', "url('images/client-" + clients[random] + ".png')").removeClass().addClass(clients[random]);

      if (replace == null) {
        setTimeout(randomizeClients, 3000);
      }
    }
  }

  // Sets the interval duration between each call of our animate function.
  // This is in milliseconds. The higher this is, the slower the animations.
  var tick = 20;

  // Animate our background changes after this number of ticks.
  var bgAnimateTicks = 4;

  // A new video icon will be spawned after this number of ticks.
  var vidIconSpawnTicks = 25;

  // We use this value to despawn video icons once they are out of view.
  var vidIconThreshold = $('.home--vid-icons').outerHeight() + 40;

  // This array will store all active vidIcon objects.
  var vidIcons = [];

  // Defines the available video icon colors.
  var vidIconColors = ['blue', 'darkblue', 'orange', 'green'];

  // Set our default animation values.
  var vidIconCount = 1;
  var vidIconTickCount = 0;
  var bgTIckCount = 0;
  var headerY = 0;
  var cloudsX = 0;

  function createVidIcon() {
    var windowWidth = $(window).width() - 40;

    var vidIcon = {
      id: vidIconCount,
      color: vidIconColors[Math.floor(Math.random() * vidIconColors.length)],
      size: Math.floor(Math.random() * 10) + 30, // Size between 30px-40px
      x: Math.floor(Math.random() * windowWidth),
      y: 0,
      angle: Math.floor(Math.random() * 360),
      clockwise: Math.random() < 0.5 ? true : false
    };

    // Create the new DOM element and append it to our wrapper.
    $('.home--vid-icons').append('<div id="vid-icon-' + vidIcon.id + '" class="home--vid-icon ' + vidIcon.color + '"></div>');
    $('#vid-icon-' + vidIcon.id).css({width: vidIcon.size, height: vidIcon.size, left: vidIcon.x});

    // Add the new icon to our storage array.
    vidIcons.push(vidIcon);

    // Increment our global video icon counter.
    vidIconCount++;
  }

  function animate() {
    // Increment tick counters.
    vidIconTickCount++;
    bgTIckCount++;

    if (bgTIckCount == bgAnimateTicks) {
      // Reset tick counter.
      bgTIckCount = 0;

      // Decrement scrolling animation position values.
      headerY++;
      cloudsX--;

      // Vertically move the header background to simulate scrolling.
      $('div.home--hero--header').css("background-position", '0 ' + headerY + 'px');

      // Horizontally move the clouds to simulate scrolling.
      $('div.home--apps--clouds').css('background-position', cloudsX + 'px 0');
    }

    if (vidIconTickCount == vidIconSpawnTicks) {
      // Reset tick counter.
      vidIconTickCount = 0;

      // Create a new vidIcon.
      createVidIcon();
    }

    // Loop through each video icon and adjust it's position. Once the icon
    // has reached our threshold, we can safely remove it.
    vidIcons = $.grep(vidIcons, function(vidIcon, i) {
      vidIcon.clockwise ? vidIcon.angle++ : vidIcon.angle--;
      vidIcon.y++;

      if (vidIcon.y > vidIconThreshold) {
        $('#vid-icon-' + vidIcon.id).remove();
        return false;
      }
      else {
        $('#vid-icon-' + vidIcon.id).css('top', vidIcon.y + 'px');
        $('#vid-icon-' + vidIcon.id).rotate(vidIcon.angle);
        return true;
      }
    });

    setTimeout(animate, tick);
  }

  // Calls our animation function at every tick interval.
  $(window).load(function() {
    animate();

    // Upon page load, randomnly load the initial 5 client logos.
    for (i=0;i<=4;i++) {
      randomizeClients(i);
    }

    // Change a logo every 3 seconds.
    setTimeout(randomizeClients, 3000);
  });
});