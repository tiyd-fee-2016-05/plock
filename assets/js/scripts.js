// I know this code doesn't work completely, but I've tried to at least comment it out in such a way that I can explain to myself what the code is saying/doing.  I tried to pull Sinovia's branch down so that I could look at how she got her "recommend a bookmark" button to work.  I botched the pull horribly.  I was very careful to delete the lines between <<<<HEAD and  =====.  I was using the command lines step-by-step from the GH website for pulling when there are merge conflicts.  I thought everything was going smoothly, but I didn't realize that I had been switched to Sinovia's branch when I committed.  Thank goodness she still had her local file versions!!  I could try to pull her files again and having a functional version on my branch, but it's getting late and I don't want to risk the trauma again.  It's been a rough day for me, success-wise.

$( function () {
  "use strict";
  $('.login').on('submit', function (e) {
    e.preventDefault();
      $('.startingTab').css('display', 'none');

    var plockUser = $('.userInfo[name="user"]').val();
     var plockPassword = $('.passwordInfo[name="password"]').val();
     var JSONurl = 'https://dummyplock.herokuapp.com/my_bookmarks';

    console.log(plockUser);
    console.log(plockPassword);



  var bookmarksReceived = {};
  // submit event to login user
  $('.login').on('submit', function (e) {
    e.preventDefault();

    var plockUser = $('.userInfo[name="user"]').val();
    var plockPassword = $('.passwordInfo[name="password"]').val();
    console.log(plockUser);
    console.log(plockPassword);

  // GET sends (?) username & password.
  $.ajax({
    method: 'GET',
    url: 'http://74be7da1.ngrok.io/my_bookmarks',
    data: { "username": plockUser, "password": plockPassword},
  })
  // .success returns the data from the url above, console.log proves that it made a successful connection
    .success(function (data) {
    console.log("success");

    var bookmarkName = $(".savedBookmarkItem");
    var bookmarkDescrip = $(".savedMarkDescrip");
    var bookmarkURL = $(".savedMarkURL");
    // console.log( Array.from(data)[0].id );
    bookmarksReceived = data;
    // The term "data" above doesn't need to be declared as a variable.  It's always
    // understood to be the data that's returned from the API.

//  ............A for LOOP to look through all the bookmark data returned and then ...........
    for( var index = 0; index < data.length; index++ ) {
    //  console.log(index);
     // console.log( bookmarks[index]);


// This "says" at the location (index) of bookmark_name, add to my html code as follows: (make an array
 // from the data returned from the API) add bookmark_name to my html so it's value can be visible (in a moment)
 // (same process for bookmark_description and bookmark_url) ........
     bookmarkName[index].innerHTML = ( Array.from(data)[index].bookmark_name );
     bookmarkDescrip[index].innerHTML = ( Array.from(data)[index].bookmark_description );
     bookmarkURL[index].innerHTML = ( Array.from(data)[index].bookmark_url );
   } // end of the for loop
 }); // end  of GET success line 21
  }); // end line 6

  // .......SAVE A BOOKMARK: When the element with id NewBookMarkDescription is clicked,
  // send to the backend all of the data listed.
  $( "#NewBookMarkDescription" ).keypress( function(e) {
    if( e.which === 13 ) {
      e.preventDefault();


      $.ajax({
        method: "POST",
        url: "http://74be7da1.ngrok.io/my_bookmarkss",
        data: { "username":"fake", "password":"password", "bookmark_name": $('input[name="saveaBookmark"]').val(), "bookmark_description": $('input[name="saveaDescrip"]').val(),
                "bookmark_url": $('input[name="saveaURL"]').val()
              }
        })
        // ........If that POST was successful, supply the values for the 3 id's listed below to the
        // html that you created above.
      .success(function() {
        $( "#NewBookMarkName" ).val("");
        $( "#NewBookMarkURL" ).val("");
        $( "#NewBookMarkDescription" ).val("");
      })
    } // closes line 51
  }); // closes line 50

  // POST to recommend a bookmark
  $( ".Bookmark1" ).click( function(e) {
      e.preventDefault();
      console.log( Array.from(bookmarksReceived)[0].id );
      $.ajax({
        method: "POST",
        url: "http://74be7da1.ngrok.io/recommendations",
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

// ..Sinovia's comment....code that makes the "Show Recs!" tab be active ......
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
// .......my fragmented efforts at "recommend a bookmark" code
 // $('.recommendABookmark').on('submit', function (e) {
 //   e.preventDefault();
 //
 //   var plockUser = $('.userInfo[name="user"]').val();
 //   var plockPassword = $('.passwordInfo[name="password"]').val();
 //   var bookmarkId = $('.BOOKMARKID=[i]').val();
 // .BOOKMARKID is just a placeholder until I know the actual id
