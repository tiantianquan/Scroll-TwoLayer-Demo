$('ul a').on('click', function(e) {
  e.preventDefault();
  console.log(this.hash);
  var targetEl = $($(this).attr('href'));
  $('body,html').animate({
    scrollTop: targetEl.offset().top
  })
})

var $body = document.querySelector('body')

var AutoScroll = function() {
  this.scrollList = document.querySelectorAll('.content-box')
  this.lastScrollTop = $body.scrollTop
  var that = this
  $(window).on('scroll', function(e) {
    that.scroll(e)
  })
}

AutoScroll.prototype.getTargetTop = function() {
  var nowScrollTop = this.getScrollTop()
  var scrollTopList = []
  Array.prototype.forEach.call(this.scrollList, function(d) {
    scrollTopList.push(d.offsetTop)
  })

  scrollTopList.push(nowScrollTop)
  scrollTopList.sort(function(a, b) {
    return a > b;
  })

  var nextTop = nowScrollTop > this.lastScrollTop ? scrollTopList[scrollTopList.indexOf(nowScrollTop) + 1] : scrollTopList[scrollTopList.indexOf(nowScrollTop) - 1]
  this.lastScrollTop = nextTop
  return nextTop
}
AutoScroll.prototype.getScrollTop = function() {
  return $body.scrollTop
}
AutoScroll.prototype.scroll = function(e) {
  $(window).off('scroll')
  var that = this
  console.log('a');
  $('body,html').animate({
    scrollTop: that.getTargetTop()
  }, 1000, function() {
    // $(window).on('scroll', function(e) {
    //   that.scroll(e)
    // })
  })
}
var as = new AutoScroll();

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