$(document).ready(function () {

  $('.menu-toggle').on('click', function() {
    $('.main-navigation').toggleClass('open');
    $('.menu-toggle__icon').toggleClass('open');
  });

  $(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();

    $('html, body').animate({
      scrollTop: $($.attr(this, 'href')).offset().top
    }, 600);
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

  if($('.js_slick-features') && $(window).width() < 1024) {
    $('.js_slick-features').slick({
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
      dots: false,
      arrows: true,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 1,
      prevArrow: $('.our-doctors .arrow_l'),
      nextArrow: $('.our-doctors .arrow_r'),
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
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
        prevArrow: $('.certificates-block .arrow_l'),
        nextArrow: $('.certificates-block .arrow_r'),
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

  if (typeof ymaps !== 'undefined') {
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
        // preset: 'islands#redDotIcon'
        iconLayout: 'default#image',
        iconImageHref: '../img/icons/placemark.png',
        iconImageSize: [120, 120],
        iconImageOffset: [-60, -120]
      });

      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom');
    }
  }
  $(window).resize();
});