$( function () {
  "use strict";

  $.ajax({
    dataType: "JSON",
    url: "https://tiyeventapi.herokuapp.com/dummy"
   })
   .success(function (data) {
     console.log("success");
    //  $.each( data.toArray(), function(index, value) {
    //    console.log(value[0]);
    //  });
    // Array.from(data);
    console.log(Array.from(data)[0].bookmark_name);
    $(".place-here").text( Array.from(data)[0].bookmark_name );




   });
});
