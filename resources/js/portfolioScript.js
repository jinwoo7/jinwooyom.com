$(document).ready(function() {
   // first jQuery practice!
    /*
   $('h1').click(function(){
       $(this).css('background-color','#ff0000');
   })
   */

    /* For Sticky Navigation */
    $('.js--section-projects').waypoint(function(direction){
        if (direction == "down"){
            $('nav').addClass('sticky');
        }
        else{
            $('nav').removeClass('sticky');
        }
    },{
        offset: '60px;'
    });
    
    /* Navigation scroll */
    $(function() {
      $('a[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 1000);
            return false;
          }
        }
      });
    });
    
    /* Animations on scroll */
    $('.js--myPic').waypoint(function(direction) {
        $('.js--myPic').addClass('animated tada');
    },{
        offset: '50%'
    });
    
    $('.js--wp-1').waypoint(function(direction) {
        $('.js--wp-1').addClass('animated pulse');
    },{
        offset: '50%'
    });
    
    $('.js--wp-2').waypoint(function(direction) {
        $('.js--wp-2').addClass('animated pulse');
    },{
        offset: '50%'
    });
    
    $('.js--wp-3').waypoint(function(direction) {
        $('.js--wp-3').addClass('animated pulse');
    },{
        offset: '50%'
    });
    
    $('.js--wp-4').waypoint(function(direction) {
        $('.js--wp-4').addClass('animated pulse');
    },{
        offset: '50%'
    });
    
    $('.js--wp-5').waypoint(function(direction) {
        $('.js--wp-5').addClass('animated pulse');
    },{
        offset: '50%'
    });
    
    $('.js--wp-6').waypoint(function(direction) {
        $('.js--wp-6').addClass('animated pulse');
    },{
        offset: '50%'
    });
    
    $('.js--wp-7').waypoint(function(direction) {
        $('.js--wp-7').addClass('animated pulse');
    },{
        offset: '50%'
    });
    
    $('.js--wp-8').waypoint(function(direction) {
        $('.js--wp-8').addClass('animated pulse');
    },{
        offset: '50%'
    });
    
    
    /* Mobile Nav */
    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');
        
        nav.slideToggle(200);
        if (icon.hasClass('ion-navicon-round')){
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        } else{
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');
        }
        
    });
});