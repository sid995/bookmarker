//Listen form for Submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// save bookmark
function saveBookmark(e){
  //get form values
  var siteName = document.getElementById('siteName').value;
  var siteUrl = document.getElementById('siteUrl').value;

  if(!validateForm(siteName, siteUrl)){
    return false;
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

/*
  // Local Strorage Test
  localStorage.setItem('test', 'Hello World'); //Storing Item
  console.log(localStorage.getItem('test')); //Showing item
  localStorage.remove('test'); // Removing item
  console.log(localStorage.getItem('test')); // Showing item
*/

  // Test if there is bookmark value
  if(localStorage.getItem('bookmarks') === null){
    // Init array
    var bookmarks = [];

    // Add to array
    bookmarks.push(bookmark);

    // Set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // In above, bookmarks is originally in JSON format. To convert it to string value, use JSON.stringify().
  } else {
    // Fetch bookamrks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // JSON.parse used to convert string value in local storage into JSON format.

    // Add bookmark to array
    bookmarks.push(bookmark);

    // Re-set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }

  // Clear form
  document.getElementById('myForm').reset();

  // Re-fetch bookmarks
  fetchBookmarks();

  // Prevent form from submitting
  e.preventDefault();
}

// Delete bookmarks
function deleteBookmark(url){
  // Get bookamrks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Loop through bookmakrs
  for(var i = 0;i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      // remove from array
      bookmarks.splice(i, 1);
    }
  }
    // Re-set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch bookmarks
function fetchBookmarks(){
  // Fetch bookamrks from local storage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults');

  // Build output using innerHTML
  bookmarksResults.innerHTML = '';
  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;

    //Build output
    bookmarksResults.innerHTML += '<div class = "well">'+
                                  '<h3>'+ name +
                                  '<a class = "btn btn-default" target = "_blank" href = "'+url+'">Visit</a>' +
                                  '<a onclick = "deleteBookmark(\''+url+'\')" class = "btn btn-danger" href = "#">Delete</a>' +
                                  '</h3>'+
                                  '</div>';
  }
}

// Validate Form
function validateForm(siteName, siteUrl){
  // To make sure form is not left empty
  if(!siteName || !siteUrl){
    alert('Please fill the form');
    return false;
  }

  //URL validation
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
