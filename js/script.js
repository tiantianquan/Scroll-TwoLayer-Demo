// $('ul a').on('click', function(e) {
//   e.preventDefault();
//   console.log(this.hash);
//   var targetEl = $($(this).attr('href'));
//   $('body,html').animate({
//     scrollTop: targetEl.offset().top
//   })
// })
window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;


var lis = document.querySelectorAll('ul a')
var body = document.querySelector('body')

for (var i = 0; i < lis.length; i++) {
  var el = lis[i];
  el.addEventListener('click', function(e) {
    e.preventDefault()
      // body.scrollTop = document.querySelector(this.hash).offsetTop
    var startTop = body.scrollTop
    var endTop = document.querySelector(this.hash).offsetTop
    var gapPx = getGapPx(startTop, endTop);
    a = setInterval(function() {
      body.scrollTop += gapPx;
      if(gapPx>0&&body.scrollTop>=endTop)
        window.clearInterval(a);
      if(gapPx<0&&body.scrollTop<=endTop)
        window.clearInterval(a);
    }, 15)

    // requestAnimationFrame(animateFn)

  })
}





function getGapPx(startTop, endTop) {
  var gapTime = 15
  var wholeTime = 1000
  return (endTop - startTop) * (gapTime / wholeTime)
}