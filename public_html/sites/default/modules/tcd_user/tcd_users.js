(function($){
  Drupal.behaviors.tcd_users = {
    attach: function (context, settings) {
     // first lets remove the default behaviors for the password field.
     Drupal.detachBehaviors($('#user-register-form .password-field'), settings);
     // Attached our iphone like password.
     $('.form-type-password input:password.password-field').dPassword({
        duration: 1000
      });
    }
  };
})(jQuery);
