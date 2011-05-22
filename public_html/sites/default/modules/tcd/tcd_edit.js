(function($) {
// STOLE MOST OF THIS CODE FROM JQUERYUI'S THEME ROLLER.

// validation for hex inputs
$.fn.validHex = function() {
  return this.each(function() {
    var value = $(this).val();
    value = value.replace(/[^#a-fA-F0-9]/g, ''); // non [#a-f0-9]
    value = value.toLowerCase();
    if(value.match(/#/g) && value.match(/#/g).length > 1) value = value.replace(/#/g, ''); // ##
    if(value.indexOf('#') == -1) value = '#'+value; // no #
    if(value.length > 7) value = value.substr(0,7); // too many chars

    $(this).val(value);
  }); 
};  

//color pickers setup (sets bg color of inputs)
$.fn.applyFarbtastic = function() {
    return this.each(function() {
      $('#colorpicker').farbtastic(this);
    });
};

Drupal.behaviors.tcdColor = {
  attach: function (context, settings) {
    // hex inputs
    $('#edit-field-font-color-und-0-value')
      .validHex()
      .keyup(function() {
          $(this).validHex();
      })
      .click(function(){
          $(this).addClass('focus');
          $('#colorpicker').farbtastic(this);
          return false;
      })
      // .wrap('<div class="hasPicker"></div>')
      .applyFarbtastic();
  }
};

}(jQuery));