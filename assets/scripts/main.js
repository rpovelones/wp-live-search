/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @link https://davidwalsh.name/javascript-debounce-function
 */
function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this, args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
}

/**
 * Append html markup to the posts wrapper.
 *
 * @param object | data
 */
function appendHTML( data ) {

  var $wrapper = jQuery('#js-results-wrapper');

  var html = '<div class="card w-75">'+
    '<div class="card-body">'+
      '<h5 class="card-title">'+ data.title.rendered +'</h5>'+
      '<p class="card-text">'+ data.excerpt.rendered +'</p>'+
      '<a href="'+ data.link +'" class="btn btn-primary" target="_blank">Read More</a>'+
    '</div>'+
  '</div>';

  $wrapper.append(html);

}

/**
 * Get request from WP-API posts endpoint.
 * Note: currently only passes with search arg.
 *
 *
 */
function getRequest( query ) {

  var $wrapper = jQuery('#js-results-wrapper');

  axios.get('/wp-json/wp/v2/posts?search='+query)
    .then(function (response) {

      jQuery('.loader').addClass('d-none');

      if ( response.data.length > 0 ) {
        jQuery(response.data).each(function() {
          appendHTML( this );
        });
      } else {
        $wrapper.append('<div class="alert alert-warning" role="alert">No posts found.</div>');
      }

    })
    .catch(function (error) {
      $wrapper.append('<div class="alert alert-danger" role="alert">Aw snap! There was an error.</div>');
    });

}

/**
 * Clear posts from wrapper.
 */
function clearPosts() {
  var $wrapper = jQuery('#js-results-wrapper');
  jQuery('.loader').removeClass('d-none');
  $wrapper.empty();
}

/**
 * Init ajax search.
 */
function initAjaxSearch() {

  jQuery('#js-search').on('keypress paste', debounce(function(e) {

    var query = jQuery(this).val();
    clearPosts();
    getRequest(query);

  }, 500));

}

/* ========================================================================
 * DOM-based Routing
 * Based on http://goo.gl/EUTi53 by Paul Irish
 *
 * Only fires on body classes that match. If a body class contains a dash,
 * replace the dash with an underscore when adding it to the object below.
 *
 * .noConflict()
 * The routing is enclosed within an anonymous function so that you can
 * always reference jQuery with $, even when in .noConflict() mode.
 * ======================================================================== */

(function($) {

  // Use this variable to set up the common and page specific functions. If you
  // rename this variable, you will also need to rename the namespace below.
  var Sage = {
    // All pages
    'common': {
      init: function() {
        // JavaScript to be fired on all pages
      },
      finalize: function() {
        // JavaScript to be fired on all pages, after page specific JS is fired
        initAjaxSearch();
      }
    },
    // Home page
    'home': {
      init: function() {
        // JavaScript to be fired on the home page
      },
      finalize: function() {
        // JavaScript to be fired on the home page, after the init JS
      }
    },
    // About us page, note the change from about-us to about_us.
    'about_us': {
      init: function() {
        // JavaScript to be fired on the about us page
      }
    }
  };

  // The routing fires all common scripts, followed by the page specific scripts.
  // Add additional events for more control over timing e.g. a finalize event
  var UTIL = {
    fire: function(func, funcname, args) {
      var fire;
      var namespace = Sage;
      funcname = (funcname === undefined) ? 'init' : funcname;
      fire = func !== '';
      fire = fire && namespace[func];
      fire = fire && typeof namespace[func][funcname] === 'function';

      if (fire) {
        namespace[func][funcname](args);
      }
    },
    loadEvents: function() {
      // Fire common init JS
      UTIL.fire('common');

      // Fire page-specific init JS, and then finalize JS
      $.each(document.body.className.replace(/-/g, '_').split(/\s+/), function(i, classnm) {
        UTIL.fire(classnm);
        UTIL.fire(classnm, 'finalize');
      });

      // Fire common finalize JS
      UTIL.fire('common', 'finalize');
    }
  };

  // Load Events
  $(document).ready(UTIL.loadEvents);

})(jQuery); // Fully reference jQuery after this point.
