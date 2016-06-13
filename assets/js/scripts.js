$( function () {
  "use strict";

  var bookmarksReceived = {};
    var bookmarksRecommended = {};
  // submit event to login user
  $('.login').on('submit', function (e) {
    e.preventDefault();
     $('.startingTab').css('display', 'none');

    var plockUser = $('.userInfo[name="user"]').val();
    var plockPassword = $('.passwordInfo[name="password"]').val();
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
 // end POST success

 $.ajax({
     method: 'GET',
     url: 'https://dummyplock.herokuapp.com/recommendations',
     data: { "username": plockUser, "password": plockPassword},
   })
     .success(function (data) {
     console.log("success");

     var recName = $(".recItem");
     var recDescrip = $(".recDescrip");
     var recURL = $(".recURL");
     // console.log( Array.from(data)[0].id );
     bookmarksRecommended = data;

     for( var index = 0; index < 1; index++ ) {
      console.log(Array.from(bookmarksRecommended)[0].bookmark_name);
      // console.log( bookmarks[index]);
      // This is OK for now, but will need to switch to creating the <li> here in js if we want this dynamic
      // line 33 is throwing: scripts.js:33 Uncaught TypeError: Cannot set property 'innerHTML' of undefined
      recName[index].innerHTML = ( Array.from(bookmarksRecommended)[index].bookmark_name );
      recDescrip[index].innerHTML = ( Array.from(bookmarksRecommended)[index].bookmark_description );
      recURL[index].innerHTML = ( Array.from(bookmarksRecommended)[index].bookmark_url );
     } // end for loop
    }); // end GET success



 });

  // POST to save a bookmark
  $(".saveBtn").on("click",function(e) {
      e.preventDefault();

      var plockUser = $('.userInfo[name="user"]').val();
      var plockPassword = $('.passwordInfo[name="password"]').val();

      $.ajax({
        method: "POST",
        url: "https://dummyplock.herokuapp.com/my_bookmarks",

        data: { "username": plockUser, "password":plockPassword, "bookmark_name": $('input[name="saveaBookmark"]').val(), "bookmark_description": $('input[name="saveaDescrip"]').val(),
                "bookmark_url": $('input[name="saveaURL"]').val()
              }

        }) // end ajax POST
      .success(function() {
        $( "#NewBookMarkName" ).val("");
        $( "#NewBookMarkURL" ).val("");
        $( "#NewBookMarkDescription" ).val("");
      })

  }); // end POST event keypress() to save a bookmark


  // click event to make a recommendation

  var recommendBtn = $( ".recommendBtn" );

  // var bookmarkList = Array.from( $( ".individual-bookmark" ) );
  $(".savedBookmarkList").on( "click", ".recommendBtn", function(e) {
    e.preventDefault();
    // e.stopPropagation();

    var plockUser = $('.userInfo[name="user"]').val();
    var plockPassword = $('.passwordInfo[name="password"]').val();
    var receiver = $('.recommendBtn[name="recipient"]').val();

    for( var index = 0; index < recommendBtn.length; index++ ) {
      if( this === recommendBtn[index] ) {
        console.log( "Number: " + index );
        console.log( "ID: " + Array.from(bookmarksReceived)[index].id );
        console.log(receiver);

        $.ajax({
          method: "POST",
          url: "https://dummyplock.herokuapp.com/recommendations",
          data: { "username":plockUser, "password":plockPassword, "bookmark_id": Array.from(bookmarksReceived)[index].id,
                  "recipient": receiver
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


// For Bookmark and Recommendation Tab
  $('.showRecs').on('click', function() {
      $('.recTab').css('display', 'block');
      $('.bookmarkTab').css('display', 'none');

  });

  $('.showBookmarks').on('click', function() {
      $('.bookmarkTab').css('display', 'block');
      $('.recTab').css('display', 'none');
  });

// Show and Hide Tabs
$('.Next6').on('click', function() {
    $(".Next6").css('display', 'none')
    $('.Hide6').css('display', 'block');
    $(".SeeMore").css("display", "block")

});

$('.Hide6').on('click', function() {
    $(".Next6").css('display', 'block')
    $('.Hide6').css('display', 'none');
    $(".SeeMore").css("display", "none")

});
});
});
