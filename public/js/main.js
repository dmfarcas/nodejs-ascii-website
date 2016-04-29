(function($) {
  $("#submit").click(function() {
    const asciitosend = $("#asciitosend").val();
    let asciidisplay = $("#ascii");        asciidisplay.text("data");

    console.log(asciitosend);
    $.post( "makeascii", { ascii: asciitosend})
      .done(function( data ) {
        asciidisplay.text(data);
      });
  });
})(jQuery);
