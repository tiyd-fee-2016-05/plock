$( function () {
  "use strict";

  var bookmarksReceived = {};
  // submit event to login user
  $('.login').on('submit', function (e) {
    e.preventDefault();

    var plockUser = $('.userInfo[name="user"]').val();
    var plockPassword = $('.passwordInfo[name="password"]').val();
    console.log(plockUser);
    console.log(plockPassword);

  // GET will submit username and password and then retrieve their bookmarks
  $.ajax({
    method: 'GET',
    url: 'http://8cc094dc.ngrok.io/my_bookmarks',
    data: { "username": plockUser, "password": plockPassword},
  })
    .success(function (data) {
    console.log("success");

    var bookmarkName = $(".savedBookmarkItem");
    var bookmarkDescrip = $(".savedMarkDescrip");
    var bookmarkURL = $(".savedMarkURL");
    // console.log( Array.from(data)[0].id );
    bookmarksReceived = data;

    for( var index = 0; index < data.length; index++ ) {
    //  console.log(index);
     // console.log( bookmarks[index]);
     // This is OK for now, but will need to switch to creating the <li> here in js if we want this dynamic
     bookmarkName[index].innerHTML = ( Array.from(data)[index].bookmark_name );
     bookmarkDescrip[index].innerHTML = ( Array.from(data)[index].bookmark_description );
     bookmarkURL[index].innerHTML = ( Array.from(data)[index].bookmark_url );
    } // end for loop
   }); // end GET success
  }); // end POST success

  // POST to save a bookmark
  $( "#NewBookMarkDescription" ).keypress( function(e) {
    if( e.which === 13 ) {
      e.preventDefault();

      $.ajax({
        method: "POST",
        url: "http://8cc094dc.ngrok.io/my_bookmarks",
        data: { "username":"fake", "password":"password", "bookmark_name": $('input[name="saveaBookmark"]').val(), "bookmark_description": $('input[name="saveaDescrip"]').val(),
                "bookmark_url": $('input[name="saveaURL"]').val()
              }
        }) // end ajax POST
      .success(function() {
        $( "#NewBookMarkName" ).val("");
        $( "#NewBookMarkURL" ).val("");
        $( "#NewBookMarkDescription" ).val("");
      })
    } // end if
  }); // end keypress()

  // POST to recommend a bookmark
  $( ".Bookmark1" ).click( function(e) {
      e.preventDefault();
      console.log( Array.from(bookmarksReceived)[0].id );
      $.ajax({
        method: "POST",
        url: "http://8cc094dc.ngrok.io/recommendations",
        data: { "username":"fake", "password":"password", "bookmark_id": Array.from(bookmarksReceived)[0].id,
                "recipient":"recipient"
              }


        }) // end ajax POST
      .success(function() {
        // $( "#NewBookMarkName" ).val("");
        // $( "#NewBookMarkURL" ).val("");
        // $( "#NewBookMarkDescription" ).val("");
        // console.log( "Recommendation Made" );
      })
  }); // end keypress()

}); // end outer function
