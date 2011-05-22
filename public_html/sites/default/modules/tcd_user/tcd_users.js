(function($){
  Drupal.behaviors.tcd_users = {
    attach: function (context, settings) {
     // first lets remove the default behaviors for the password field.
     Drupal.detachBehaviors($('#user-register-form .password-field'), settings);
     // Attached our iphone like password.
     $('.form-type-password input:password').dPassword({
        duration: 1000
     });

     $('#user-login-form-register-page form').hide();
     $('ul.primary li').eq(0).hide();
     $('ul.primary li').eq(2).hide();
     

     var click_link = 0;

     $('ul.primary li').eq(1).find('a').click(function() {
       if (click_link == 0) {
         $('ul.primary li').eq(2).show();
         $('ul.primary li').eq(1).hide();
         $('#user-register-form-register-page form').hide();
         $('#user-login-form-register-page form').show("slide",{direction: 'right'});
         click_link = 1;
       }
       return false;
     });

     $('ul.primary li').eq(2).find('a').click(function() {
       if (click_link == 1) {
         $('ul.primary li').eq(2).hide();
         $('ul.primary li').eq(1).show();
         $('#user-login-form-register-page form').hide();
         $('#user-register-form-register-page form').show("slide",{direction: 'right'});
         click_link = 0;
       }
       return false;
     });
     if (window.location.hash == '#login') {
       $('ul.primary li').eq(1).find('a').click();
     }
    }
  };
})(jQuery);
