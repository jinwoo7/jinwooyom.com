$(document).ready(function() {
   // first jQuery practice!
    /*
   $('h1').click(function(){
       $(this).css('background-color','#ff0000');
   })
   */

    /* For Sticky Navigation */
    $('.js--about-me').waypoint(function(direction) {
        if (direction == "down"){
            $('nav').addClass('sticky');
        }
        else{
            $('nav').removeClass('sticky');
        }
    },{
        offset: '60px;'
    });
    
    /* Scroll on buttons */    
    $('.js--top-btn').click(function(){
        $('html, body').animate({scrollTop: $('.js--top-of-page').offset().top}, 1000);
    });
    
    $('.js--btn-full').click(function(){
        $('html, body').animate({scrollTop: $('.js--section-form').offset().top}, 1000);
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
    
    $('.js--wp-ea').waypoint(function(direction) {
        $('.js--wp-ea').addClass('animated jello');
    },{
        offset: '50%'
    });
    
    $('.js--wp-other').waypoint(function(direction) {
        $('.js--wp-other').addClass('animated jello');
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
    
    /* Mobile Nav */
    $('.js--nav-icon').click(function() {
        var nav = $('.js--main-nav');
        var icon = $('.js--nav-icon i');
        
        nav.slideToggle(200);
        if (icon.hasClass('ion-navicon-round')){
            console.log("ADDING round");
            icon.addClass('ion-close-round');
            icon.removeClass('ion-navicon-round');
        } else{
            console.log("REMOVING STICKY");
            icon.addClass('ion-navicon-round');
            icon.removeClass('ion-close-round');
        }
    });
    
    /* type Writer */
    var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 1000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap" style="text-decoration:none">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 225;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        var cssText= "font-weight: 310; text-transform: uppercase; letter-spacing: 1px; margin: 0; color: #fff; margin-top: 0px; word-spacing: 4px; font-weight: 300; font-size: 100%; margin-bottom: 20px; text-decoration: none;"
        css.innerHTML = ".typewrite > .wrap { " + cssText +  "}";
        document.body.appendChild(css);
    };
});