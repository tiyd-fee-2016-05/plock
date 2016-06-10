$( function () {
  "use strict";

  // ajax get call for receiving bookmarks
/*
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
    // console.log(Array.from(data)[0].bookmark_name);
    var bookmarkName = $(".savedBookmarkItem");
    var bookmarkDescrip = $(".savedMarkDescrip");
    var bookmarkURL = $(".savedMarkURL");

    for( var index = 0; index < 2; index++ ) {
      // console.log( bookmarks[index]);
      // This is OK for now, but will need to switch to creating the <li> here in js if we want this dynamic
      bookmarkName[index].innerHTML = ( Array.from(data)[index].bookmark_name );
      bookmarkDescrip[index].innerHTML = ( Array.from(data)[index].bookmark_description );
      bookmarkURL[index].innerHTML = ( Array.from(data)[index].bookmark_url );
    }

   });
 */





  $.ajax({
    method: 'POST',
    url: 'http://8cc094dc.ngrok.io/my_bookmarks',
    data: { "username":"fake", "password":"password" },
  }).success(function (data) {
    console.log("success");
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
     // console.log(Array.from(data)[0].bookmark_name);
     var bookmarkName = $(".savedBookmarkItem");
     var bookmarkDescrip = $(".savedMarkDescrip");
     var bookmarkURL = $(".savedMarkURL");

     for( var index = 0; index < 2; index++ ) {
       // console.log( bookmarks[index]);
       // This is OK for now, but will need to switch to creating the <li> here in js if we want this dynamic
       bookmarkName[index].innerHTML = ( Array.from(data)[index].bookmark_name );
       bookmarkDescrip[index].innerHTML = ( Array.from(data)[index].bookmark_description );
       bookmarkURL[index].innerHTML = ( Array.from(data)[index].bookmark_url );
     }

    });

  });













});
