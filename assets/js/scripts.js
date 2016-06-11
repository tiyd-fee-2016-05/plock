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
// .............This is for when user hits submit (for username/password ................)
 $('.login').on('submit', function (e) {
   e.preventDefault();

   var plockUser = $('.userInfo[name="user"]').val();
    var plockPassword = $('.passwordInfo[name="password"]').val();
  //  var plockPassword = $('input[name="password"]').val();
   console.log(plockUser);
   console.log(plockPassword);

 //  var plockPassword = $('input[name="password"]').val();


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
     var bookmarkName = $(".savedBookmarkItem");
     var bookmarkDescrip = $(".savedMarkDescrip");
     var bookmarkURL = $(".savedMarkURL");

     for( var index = 0; index < 3; index++ ) {
       console.log(index);
       // This is OK for now, but will need to switch to creating the <li> here in js if we want this dynamic
       bookmarkName[index].innerHTML = ( Array.from(data)[index].bookmark_name );
       bookmarkDescrip[index].innerHTML = ( Array.from(data)[index].bookmark_description );
       bookmarkURL[index].innerHTML = ( Array.from(data)[index].bookmark_url );
     }

    });

  });

  });
  $( "#NewBookMarkDescription" ).keypress( function(e) {
  if( e.which === 13 ) {
    e.preventDefault();

    $.ajax({
      method: "POST",
      url: "https://dummyplock.herokuapp.com/my_bookmarks",
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
