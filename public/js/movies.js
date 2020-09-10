// Get collection
function getCollection(api_results) {
  const token = localStorage.getItem('authToken');
  $.ajax({
		url: '/api/movies/collection',
		type: 'GET',
		dataType: 'json',
		headers: {
			"x-access-token": token
		},
		success: function(data) {
      displaySearchResults(api_results, data);
		},
		error: function(data) {
			console.log(data);
		}
	});
}

// Search movies
function searchMovies(query, pageNum) {
  const token = localStorage.getItem('authToken');
  let paramString = encodeURIComponent(query) + "page_number=" + pageNum.toString();
  $.ajax({
		url: `/api/movies/search/${paramString}`,
		type: 'GET',
		dataType: 'json',
		headers: {
			"x-access-token": token
		},
		success: function(data) {
			getCollection(data.results);
      displayTotal(data.total_results);
		},
		error: function(data) {
			console.log(data);
		}
	});
}

function displaySearchResults(api_results, collection) {
  $('#results').empty();
    let matches = [];
    for (let i = 0; i < collection.length; i++) {
      for (let j = 0; j < api_results.length; j++) {
        if (collection[i].api_id === api_results[j].id 
          && !matches.includes(collection[i].api_id)) {
          matches.push(api_results[j]);
        }
      }
    }
    if (matches.length === 0) {
      for (let i = 0; i < api_results.length; i++) {
        $('#results').append(`
          <li>
            <div>
              Movie Title: ${api_results[i].title}
            </div>
            <div>
              Release Date: ${api_results[i].release_date}
            </div>
            <div>
              Overview: ${api_results[i].overview}
            </div>
            <input type="checkbox" id="${api_results[i].id}" name="${api_results[i].title}" value="${api_results[i].id}">
          </li>
          `)
      }
    } else {
      for (let i = 0; i < matches.length; i++) {
        $('#results').append(`
          <li>
            <div>
              Movie Title: ${matches[i].title}
            </div>
            <div>
              Release Date: ${matches[i].release_date}
            </div>
            <div>
              Overview: ${matches[i].overview}
            </div>
            <input checked type="checkbox" id="${matches[i].id}" name="${matches[i].title}" value="${matches[i].id}">
          </li>
          `)
      }
      for (let i = 0; i < api_results.length; i++) {
        if (!matches.includes(api_results[i])) {
          $('#results').append(`
            <li>
              <div>
                Movie Title: ${api_results[i].title}
              </div>
              <div>
                Release Date: ${api_results[i].release_date}
              </div>
              <div>
                Overview: ${api_results[i].overview}
              </div>
              <input type="checkbox" id="${api_results[i].id}" name="${api_results[i].title}" value="${api_results[i].id}">
            </li>
            `)
        }
      }
    }
}

function displayTotal(total_results) {
  const numString = total_results.toString();
  $('#summary').empty();
  $('#summary').append(numString);
}

$('#js-search-form').submit(event => {
	event.preventDefault();
	searchMovies($('input[id="js-search-movie"]').val(), $('input[id="js-search-movie-page"]').val());
});

// Add movie
function addMovies(movies) {
  const token = localStorage.getItem('authToken');
  movies.forEach(function(movie) {
    $.ajax({
      url: `/api/movies/collection`,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        "x-access-token": token
      },
      data: JSON.stringify({"api_id": `${movie}`}),
      success: function(data) {
        console.log(data.message);
        searchMovies($('input[id="js-search-movie"]').val(), $('input[id="js-search-movie-page"]').val());
      }
    });
  });
}

$('#add').click(event => {
  event.preventDefault();
  let addItems = [];
  $('#results input').each(function(idx, li) {
    if ($(li).is(":checked"))
    addItems.push($(li).val());
  });
  addMovies(addItems);
});

// Delete movie 
function deleteMovies(movies) {
  const token = localStorage.getItem('authToken');
  movies.forEach(function(movie) {
    $.ajax({
      url: `/api/movies/collection/${movie}`,
      type: 'DELETE',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        "x-access-token": token
      },
      success: function(data) {
        console.log(data.message);
        searchMovies($('input[id="js-search-movie"]').val(), $('input[id="js-search-movie-page"]').val());
      }
    });
  });
}

$('#delete').click(event => {
  event.preventDefault();
  let deleteItems = [];
  $('#results input').each(function(idx, li) {
    if ($(li).is(":checked"))
    deleteItems.push($(li).val());
  });
  deleteMovies(deleteItems);
});
