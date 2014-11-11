$('ul a').on('click',function(e){
  e.preventDefault();
  console.log(this.hash);
  var targetEl = $($(this).attr('href'));
  $('body,html').animate({
    scrollTop:targetEl.offset().top
  })
})

