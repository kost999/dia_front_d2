$(document).ready(function () {

  $('.menu-toggle').on('click', function() {
    $('.main-navigation').toggleClass('open');
    $('.menu-toggle__icon').toggleClass('open');
  });

  $(document).on('click', 'a[href^="#"]:not(.menu-toggle, .video__play)', function (event) {
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

  if ($('.video')) {
      var video = document.querySelector('video');
      video.addEventListener('ended', function() {
          $('.video__play').fadeIn();
          $('.video__cover').fadeIn();
      }, false);
      $('.video')
          .on('click', '.video__play', function(e) {
              e.preventDefault();
              $('.video__cover').fadeOut();
              if (video.paused) {
                  video.play();
                  $('.video__play').fadeOut();
              } else {
                  video.pause();
                  $('.video__play').fadeIn();
              }
          })
          .on('click', 'video', function(e) {
              if(!video.paused && $('.video__play').css('display') === 'none') {
                  video.pause();
                  $('.video__play').fadeIn();
              }
          });
  }


  if($('.js_slick-features') && $(window).width() < 1024) {
    $('.js_slick-features').slick({

      slidesToShow: 3,
      slidesToScroll: 1,
      infinite: true,
      dots: false,
      arrows: true,
      prevArrow: $('.features-wrapper .arrow_l'),
      nextArrow: $('.features-wrapper .arrow_r'),

      responsive: [
        // {
        //   breakpoint: 1024,
        //   settings: {
        //     slidesToShow: 3,
        //     slidesToScroll: 1,
        //     infinite: false,
        //     dots: false,
        //     arrows: false,
        //     prevArrow: $('.features-wrapper .arrow_l'),
        //     nextArrow: $('.features-wrapper .arrow_r'),
        //   }
        // },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            infinite: true,
            dots: true,
          }
        }
      ]
    });
  }

  var maxDoctorsListItems = 5;

  if ($(window).width() < 1024) maxDoctorsListItems = 3;
  if ($(window).width() < 768) maxDoctorsListItems = 1;


  if ($('.js_slick-doctors') && $('.doctors-list__item').length > maxDoctorsListItems) {
    $('.our-doctors .arrow-container').show();
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

  var r = document.querySelector(".js_slick_doc-certificates");
  if (r) {
    tns({
        container: r,
        items: 5,
        slideBy: 1,
        gutter: 20,
        controlsText: ["", ""],
        nav: !1,
        responsive: {
            320: {
                items: 2
            },
            600: {
                items: 3
            },
            1024: {
                items: 5
            }
        }
    })
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
        iconImageHref: '/local/templates/dia_d2/img/icons/placemark.png',
        iconImageSize: [80, 80],
        iconImageOffset: [-40, -80]
      });

      myMap.geoObjects.add(myPlacemark);
      myMap.behaviors.disable('scrollZoom');
      setTimeout(function() {
        myMap.container.fitToViewport();
      }, 4000);
    }
  }
});
