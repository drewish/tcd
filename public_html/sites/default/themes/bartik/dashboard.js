(function($){
  Drupal.behaviors.dashboard = {
    attach: function (context, settings) {
      var dashboard = $('<li class="dashboard"><a>Dashboard</a></li>');
      dashboard.click(function() {
        $("#main-menu").toggleClass('open');
        return false;
      });
      $("ul#main-menu-links").append(dashboard);      
    }
  };
})(jQuery);
