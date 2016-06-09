$( function () {
  "use strict";

  var json = $.getJSON('https://tiyeventapi.herokuapp.com/dummy')
    .done( function () {
      $(".savedBookmarkItem".text(this.responseJSON.bookmark_name));
      console.log ("user info pulled"));
  });

});

    // $.ajax({
    //   dataType: "json",
    //   url: "",
    //   method: "GET",
    // }). done (function (data) {
    //
    // })
    // }) May revist based on progress.






































});
