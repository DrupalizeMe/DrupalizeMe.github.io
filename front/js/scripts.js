$(function() {
    $( '.tick' ).ticker({
      delay: 1000,
      separators: true
    });

    // Sets the interval duration between each call of our animate function.
    // This is in milliseconds. The higher this is, the slower the animations.
    var tick = 100;

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
    var windowWidth = $(window).width() - 40;
    var headerY = 0;
    var cloudsX = 0;

    function createVidIcon() {
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
      // Increment tick counter.
      vidIconTickCount++;

      // Decrement scrolling animation position values.
      headerY--;
      cloudsX--;

      // Vertically move the header background to simulate scrolling.
      $('div.home--hero--header').css("background-position", '0 ' + headerY + 'px');

      // Horizontally move the clouds to simulate scrolling.
      $('div.home--apps--clouds').css('background-position', cloudsX + 'px 0');

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
    }

    // Calls our animation function at every tick interval.
    setInterval(animate, tick);
});