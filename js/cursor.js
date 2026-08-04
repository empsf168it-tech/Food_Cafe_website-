/* ============================================
   BREW HAVEN — Custom Coffee Cursor Logic
   ============================================ */
(function () {
    // Inject cursor HTML into the page
    var cursorHTML =
        '<div id="brew-cursor" class="hidden">' +
            '<div class="cursor-steam">' +
                '<span></span><span></span><span></span>' +
            '</div>' +
            '<div class="cursor-icon">' +
                '<i class="fa fa-coffee"></i>' +
            '</div>' +
            '<div class="cursor-ring"></div>' +
        '</div>' +
        '<div id="brew-trail" class="hidden"></div>';

    document.body.insertAdjacentHTML('afterbegin', cursorHTML);

    var cursor  = document.getElementById('brew-cursor');
    var trail   = document.getElementById('brew-trail');
    var body    = document.body;

    // Smooth trailing positions
    var mouseX = 0, mouseY = 0;
    var trailX = 0, trailY = 0;

    // Track mouse position
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Move main cursor instantly
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';

        // Show cursors when mouse enters
        cursor.classList.remove('hidden');
        trail.classList.remove('hidden');
    });

    // Smooth trail animation loop
    function animateTrail() {
        // Trail lags behind with lerp
        trailX += (mouseX - trailX) * 0.15;
        trailY += (mouseY - trailY) * 0.15;

        trail.style.left = trailX + 'px';
        trail.style.top  = trailY + 'px';

        requestAnimationFrame(animateTrail);
    }
    animateTrail();

    // Hover effect on interactive elements
    var hoverTargets = 'a, button, input, textarea, select, label, [role="button"], .nav-link, .btn, .carousel-control-prev, .carousel-control-next';

    document.addEventListener('mouseover', function (e) {
        if (e.target.closest(hoverTargets)) {
            body.classList.add('cursor-hover');
        }
    });

    document.addEventListener('mouseout', function (e) {
        if (e.target.closest(hoverTargets)) {
            body.classList.remove('cursor-hover');
        }
    });

    // Click squish effect
    document.addEventListener('mousedown', function () {
        body.classList.add('cursor-click');
    });

    document.addEventListener('mouseup', function () {
        body.classList.remove('cursor-click');
    });

    // Hide when cursor leaves browser window
    document.addEventListener('mouseleave', function () {
        cursor.classList.add('hidden');
        trail.classList.add('hidden');
    });

    document.addEventListener('mouseenter', function () {
        cursor.classList.remove('hidden');
        trail.classList.remove('hidden');
    });
})();
