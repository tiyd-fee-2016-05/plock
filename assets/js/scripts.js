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

    url: 'https://dummyplock.herokuapp.com/my_bookmarks',
    // url: 'http://8cc094dc.ngrok.io/my_bookmarks',
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
     // line 33 is throwing: scripts.js:33 Uncaught TypeError: Cannot set property 'innerHTML' of undefined
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
        url: "https://dummyplock.herokuapp.com/my_bookmarks",
        // url: 'http://8cc094dc.ngrok.io/my_bookmarks',
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
  }); // end POST event keypress() to save a bookmark


  // click event to make a recommendation

  var recommendBtn = $( ".recommendBtn" );

  // var bookmarkList = Array.from( $( ".individual-bookmark" ) );
  $(".savedBookmarkList").on( "click", ".recommendBtn", function(e) {
    e.preventDefault();
    // e.stopPropagation();

    for( var index = 0; index < recommendBtn.length; index++ ) {
      if( this === recommendBtn[index] ) {
        console.log( "Number: " + index );
        console.log( "ID: " + Array.from(bookmarksReceived)[index].id );

        $.ajax({
          method: "POST",
          url: "https://dummyplock.herokuapp.com/recommendations",
          // url: 'http://8cc094dc.ngrok.io/recommendations',
          data: { "username":"fake", "password":"password", "bookmark_id": Array.from(bookmarksReceived)[index].id,
                  "recipient":"recipient"
                }
          }) // end ajax POST
        .success(function() {
          // $( "#NewBookMarkName" ).val("");
          // $( "#NewBookMarkURL" ).val("");
          // $( "#NewBookMarkDescription" ).val("");
          // console.log( "Recommendation Made" );
        })
      }
    }

    // console.log( $(bookmarkList) );
    // console.log( this );
    // console.log( bookmarkList.indexOf(this) );
    // console.log( $.inArray( this, bookmarkList) );



    // fruits.indexOf("Apple");



    // console.log( $(this)[0] );
    // console.log( $(this) );
    // console.log( $(this)[0].closest("h3") );

    // var $elementlist = $(this).parent;
    // console.log('Element ' + $(elementlist).index($(this)) + ' was clicked');


      // console.log( e.target );
      // console.log( Array.from($(this).bookmarksReceived) );
      // console.log( $(this).index(bookmarksReceived).val());
      // console.log( $(this).closest(".individual-bookmark")[e]);
      // console.log( $(this).closest(bookmarksReceived));
      /*
      $.ajax({
        method: "POST",
        url: "https://dummyplock.herokuapp.com/my_bookmarks",
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
      */
  }); // end recommendation click event()















  // function to show bookmarks and recommendations
  $(document).ready(function() {

  // show recommendations
  $('.showRecs').on('click', function() {
      $('.recTab').css('display', 'block');
      $('.bookmarkTab').css('display', 'none');
      $('.startingTab').css('display', 'none');

      console.log("Click works again!");
  });

  // show bookmarks
  $('.showBooksmarks').on('click', function() {
      $('.bookmarkTab').css('display', 'block');
      $('.recTab').css('display', 'none');
      $('.startingTab').css('display', 'none');
      console.log("Second Click works");
    });
  }); // end function to show bookmarks and recommendations
}); // end outer function
