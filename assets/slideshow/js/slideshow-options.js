;(function($){
    var
        props = ['Width', 'Height'],
        prop;

    while (prop = props.pop()) {
        (function (natural, prop) {
            $.fn[natural] = (natural in new Image()) ?
                function () {
                    return this[0][natural];
                } :
                function () {
                    var
                        node = this[0],
                        img,
                        value;

                    if (node.tagName.toLowerCase() === 'img') {
                        img = new Image();
                        img.src = node.src,
                            value = img[prop];
                    }
                    return value;
                };
        }('natural' + prop, prop.toLowerCase()));
    }
}(jQuery));
;(function($){
  $(document).ready(function() {
      var options = {
        nextButton: '.controls .next',
        prevButton: '.controls .prev',
        pauseButton: '.controls .pause',
        pagination: '.pagination',
        animateStartingFrameIn: true,
        autoPlay: true,
        autoPlayDelay: 4000
      };

      var index, preEleArr = $(".language-slideshow").parent();
      for (index = 0; index < preEleArr.length; index++) {
          var preEle = preEleArr.get(index);
          $(preEle).before($(preEle).children(".language-slideshow").text());
          $(preEle).remove();
      }

      // resize handler
      var lastWidth = 0, scale = 1;
      function doneResizing(){
          // do something
          if (lastWidth != $(".w3-slideshow").width()) {
              lastWidth = $(".w3-slideshow").width();

              var slideShowArr = $(".w3-slideshow");
              for (var i = 0; i < slideShowArr.length; i++) {
                  var slideShow = $(slideShowArr.get(i));
                  scale = $(slideShow.find("img")[0]).naturalWidth() / $(slideShow.find("img")[0]).naturalHeight();
                  slideShow.css( "min-height", lastWidth/scale);
                  //console.log("doneResizing");
              }
          }
      };
      var id;
      $(window).resize(function() {
          clearTimeout(id);
          id = setTimeout(doneResizing, 10);
      });

      // handler to img load event
      var slideShowArr = $(".w3-slideshow");
      for (var i = 0; i < slideShowArr.length; i++) {
          var slideShow = $(slideShowArr.get(i));
          $(slideShow.find("img")[0]).load(function(){
              //var scale = $(this).naturalWidth() / $(this).naturalHeight();
              //$(this).parents(3).css( "min-height", $(".w3-slideshow").width()/scale);
              //console.log("load");
              lastWidth = 0;
              doneResizing();
          });
      }

      // init sequence
      var sequence = $(".w3-slideshow").sequence(options).data("sequence");
  });
})(jQuery);
