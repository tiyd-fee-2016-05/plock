$( function () {
  "use strict";
  $('.login').on('submit', function (e) {
    e.preventDefault();

    var plockUser = $('.userInfo[name="user"]').val();
     var plockPassword = $('.passwordInfo[name="password"]').val();
     var JSONurl = 'http://8cc094dc.ngrok.io/my_bookmarks'
    console.log(plockUser);
    console.log(plockPassword);




  $.ajax({
    method: 'GET',
    url: JSONurl,
    data: { "username": plockUser, "password": plockPassword},
  })
    .success(function (data) {
      console.log("success");

     var bookmarkName = $(".savedBookmarkItem");
     var bookmarkDescrip = $(".savedMarkDescrip");
     var bookmarkURL = $(".savedMarkURL");

     for( var index = 0; index < 7; index++ ) {
       console.log(index);
       // console.log( bookmarks[index]);
       // This is OK for now, but will need to switch to creating the <li> here in js if we want this dynamic
       bookmarkName[index].innerHTML = ( Array.from(data)[index].bookmark_name );
       bookmarkDescrip[index].innerHTML = ( Array.from(data)[index].bookmark_description );
       bookmarkURL[index].innerHTML = ( Array.from(data)[index].bookmark_url );
     } // end for loop

   }); // end GET success
  }); // end POST success
}); // end outer function


  $( "#NewBookMarkDescription" ).keypress( function(e) {
    if( e.which === 13 ) {
      e.preventDefault();

      var plockUser = $('.userInfo[name="user"]').val();
       var plockPassword = $('.passwordInfo[name="password"]').val();
       var JSONurl = 'http://8cc094dc.ngrok.io/my_bookmarks'

      $.ajax({
        method: "POST",
        url: JSONurl,
        data: { "username": plockUser, "password":plockPassword, "bookmark_name": $('input[name="saveaBookmark"]').val(), "bookmark_description": $('input[name="saveaDescrip"]').val(),
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

  $(document).ready(function() {

  $('.showRecs').on('click', function() {
      $('.recTab').css('display', 'block');
      $('.bookmarkTab').css('display', 'none');
      $('.startingTab').css('display', 'none');

      console.log("Click works again!");
  });

  $('.showBooksmarks').on('click', function() {
      $('.bookmarkTab').css('display', 'block');
      $('.recTab').css('display', 'none');
      $('.startingTab').css('display', 'none');
      console.log("Second Click works");
  });
  });
