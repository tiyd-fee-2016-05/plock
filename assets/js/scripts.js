$( function () {
  "use strict";

  $.ajax({
    dataType: "JSON",
    url: "https://tiyeventapi.herokuapp.com/dummy"
   })
   .done(function (data) {
     console.log("success");
     console.log(data);
   });
});
