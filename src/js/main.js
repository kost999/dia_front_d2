$(document).ready(function () {
  $('.menu-toggle').on('click', function() {
    $('.main-navigation').toggleClass('open');
    $('.menu-toggle__icon').toggleClass('open');
  });


  //  Tabs

  var tabLinks = $('[data-toggle="tab"]');
  var tabContents = $('[data-content="tab-content"]');

  tabLinks.each(function () {
    $(this).on('click', function (e) {
      e.preventDefault();
      showTab($(this));
      $(this).addClass('active');
    });
  });

  function showTab(el) {
    var tabId = el.attr('href');
    tabContents.each(function () {
      $(this).removeClass('active');
    });
    tabLinks.each(function () {
      $(this).removeClass('active');
    });
    tabContents.filter(tabId).addClass('active');
  }

  //  Youtube video
  var videoSrc = 'https://www.youtube.com/embed/EXS_sMYdqco?rel=0&showinfo=0';
  $('.video__play').on('click', function(e) {
    e.preventDefault();
    $('.video__cover').hide();
    $('#video').attr('src', videoSrc);
  });

  if($('.js_slick-features') && window.innerWidth > 1024) {
    $('.js_slick-features').slick({
      slidesToShow: 4,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            arrows: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true
          }
        }
      ]
    });
  }

  if ($('.js_slick-doctors')) {
    $('.js_slick-doctors').slick({
      dots: true,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
            arrows: true
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: true,
            arrows: true
          }
        }
      ]
    });
  }

  if ($('.js_slick-certificates')) {
    $('.js_slick-certificates').each(function() {
      $(this).slick({
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToShow: 6,
        slidesToScroll: 1,
        variableWidth: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }]
      });
    });
  }

  if (ymaps) {
    ymaps.ready(init);
    var myMap,
      myPlacemark;

    function init() {
      myMap = new ymaps.Map("map", {
        center: [56.00816307, 37.85472750],
        zoom: 16,
        controls: ['zoomControl', 'geolocationControl']
      });

      myPlacemark = new ymaps.Placemark([56.00816307, 37.85472750], {
        hintContent: 'Диадент!',
        balloonContent: 'Московский проспект, 27'
      }, {
        preset: 'islands#redDotIcon'
      });

      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom');
    }
  }
});