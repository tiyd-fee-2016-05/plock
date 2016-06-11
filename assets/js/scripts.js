$( function () {
  "use strict";

  // ajax get call for receiving bookmarks

// .............This is for when user hits submit (for username/password ................)
 $('.login').on('submit', function (e) {
   e.preventDefault();

   var plockUser = $('.userInfo[name="user"]').val();
    var plockPassword = $('.passwordInfo[name="password"]').val();
  //  var plockPassword = $('input[name="password"]').val();
   console.log(plockUser);
   console.log(plockPassword);

 //  var plockPassword = $('input[name="password"]').val();

// .......This sends the username and password to the backend.......
  $.ajax({
    method: 'GET',
    url: 'https://dummyplock.herokuapp.com/my_bookmarks',
    data: { "username":"fake", "password":"password" },
  }).success(function (data) {
    console.log("success");

     //  $.each( data.toArray(), function(index, value) {
     //    console.log(value[0]);
     //  });
     // Array.from(data);
     // console.log(Array.from(data)[0].bookmark_name);

    //  .....This places the returned values for each bookmark's name, description, and url into the html.
     var bookmarkName = $(".savedBookmarkItem");
     var bookmarkDescrip = $(".savedMarkDescrip");
     var bookmarkURL = $(".savedMarkURL");

     for( var index = 0; index < 7; index++ ) {
       console.log(index);

       bookmarkName[index].innerHTML = ( Array.from(data)[index].bookmark_name );
       bookmarkDescrip[index].innerHTML = ( Array.from(data)[index].bookmark_description );
       bookmarkURL[index].innerHTML = ( Array.from(data)[index].bookmark_url );
     }

    });

  });

  });

  // ........... This sends a request to backend to save a bookmark ..........
  $( "#NewBookMarkDescription" ).keypress( function(e) {
  if( e.which === 13 ) {
    e.preventDefault();

    $.ajax({
      method: "POST",
      url: "'http://8cc094dc.ngrok.io/my_bookmarks'",
      data: { "username":"fake", "password":"password", "bookmark_name": $('input[name="saveaBookmark"]').val(), "bookmark_description": $('input[name="saveaDescrip"]').val(),
              "bookmark_url": $('input[name="saveaURL"]').val()
            }
    }) // end ajax POST
    // .success(function() {
    //
    // })
    //
    // .success(function (data) {
    //   console.log("success");
  } // end if
}); // end keypress()
  // ........... [ABOVE]  This sends a request to backend to save a bookmark ..........


// ...................  attempts at creating RECOMMEND A BOOKMARK code .........
  $( ".recommendABookmark" ).keypress( function(e) {
    // ABOVE was "#NewBookMarkDescription"
  if( e.which === 13 ) {
    e.preventDefault();

    $.ajax({
      method: "POST",
      url: "'http://8cc094dc.ngrok.io/recommendations'",
      data: { "username":"fake", "password":"password", "bookmark_id":"1" ,
      $('input[name="recipient"]').val()


            }
    }) // end ajax POST
    // .success(function() {
    //
    // })
    //
    // .success(function (data) {
    //   console.log("success");
  } // end if
}); // end keypress()
// ...................  attempts at creating RECOMMEND A BOOKMARK code .........
