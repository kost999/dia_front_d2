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

  ymaps.ready(init);
  var myMap,
    myPlacemark;

  function init() {
    console.log('hey');
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
});