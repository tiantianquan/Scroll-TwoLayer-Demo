$('ul a').on('click', function(e) {
  e.preventDefault();
  console.log(this.hash);
  var targetEl = $($(this).attr('href'));
  $('body,html').animate({
    scrollTop: targetEl.offset().top
  })
})

var $body = document.querySelector('body')

var AutoScroll = function(scrollList) {
  this._scrollList = scrollList;
  this._startTop = $body.scrollTop
  this._isInAnimate = false
  var that = this
  $(window).on('mousewheel',function(e) {
    console.log(e)
    e.preventDefault()
    that.scroll(e)
    return false
  })
}
AutoScroll.prototype.getEndTop = function(currentTop,e) {
  var scrollTopList = []
  Array.prototype.forEach.call(this._scrollList, function(d) {
    scrollTopList.push(d.offsetTop)
  })
  // scrollTopList.push(currentTop)
  scrollTopList.sort(function(a, b) {
    return a > b
  })
  if (e.originalEvent.wheelDelta<0)
    return scrollTopList[scrollTopList.indexOf(currentTop) + 1]
  // else if (currentTop === this._startTop)
  //   return currentTop
  else
    return scrollTopList[scrollTopList.indexOf(currentTop) - 1]
}
AutoScroll.prototype.scroll = function(e) {
  console.log(1);
  var startTop
  var endTop
  var currentTop
  var that = this
  if (!this._isInAnimate) {
    startTop = this._startTop
    currentTop = $body.scrollTop
    endTop = this.getEndTop(currentTop,e)
    this._isInAnimate = true
    var durTime = 1000
    if (startTop === endTop) {
      that._isInAnimate = false
      return
    }
    $('body').animate({
      scrollTop: endTop
    }, durTime, function() {
      that._startTop = $body.scrollTop
      that._isInAnimate = false
    })
  }
}


var as = new AutoScroll(document.querySelectorAll('.content-box'));

// window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


// var lis = document.querySelectorAll('ul a')
// var body = document.querySelector('body')

// for (var i = 0; i < lis.length; i++) {
//   var el = lis[i];
//   el.addEventListener('click', function(e) {
//     e.preventDefault()
//       // body.scrollTop = document.querySelector(this.hash).offsetTop
//     var startTop = body.scrollTop
//     var endTop = document.querySelector(this.hash).offsetTop
//     var gapPx = getGapPx(startTop, endTop);

//     function animateFn() {
//       var lastScrollTop = body.scrollTop;
//       body.scrollTop += gapPx;
//       if (gapPx > 0 && body.scrollTop >= endTop)
//         return
//       else if (gapPx < 0 && body.scrollTop <= endTop)
//         return
//       else if(body.scrollTop == lastScrollTop)
//         return
//       else
//         requestAnimationFrame(animateFn)
//     }

//     requestAnimationFrame(animateFn)

//   })
// }





// function getGapPx(startTop, endTop) {
//   // var gapTime = 5
//   // var wholeTime = 1000
//   // return (endTop - startTop) * (gapTime / wholeTime)
//   var gapPx = 20
//   return endTop - startTop >= 0 ? gapPx : -gapPx;
// }