$( function () {
  "use strict";

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
    url: 'https://dummyplock.herokuapp.com/my_bookmarks',
    data: { "username": plockUser, "password": plockPassword},
  })
    .success(function (data) {
    console.log("success");

    var bookmarkName = $(".savedBookmarkItem");
    var bookmarkDescrip = $(".savedMarkDescrip");
    var bookmarkURL = $(".savedMarkURL");

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
      .success(function() {
        $( "#NewBookMarkName" ).val("");
        $( "#NewBookMarkURL" ).val("");
        $( "#NewBookMarkDescription" ).val("");
      })
    } // end if
  }); // end keypress()

}); // end outer function
