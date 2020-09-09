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

// function matchMovies(api_results, collection) {
//   console.log(collection);
//   console.log(api_results);
//   let searchResults = [];
//   for (let i = 0; i < collection.length; i++) {
//     for (let j = 0; j < api_results.length; j++) {
//       if (collection[i].api_id === api_results[j].id) {
// 
//       }
//     }
//   }
// }

function displaySearchResults(api_results, collection) {
  console.log(api_results);
  console.log(collection);
    let matches = [];
    for (let i = 0; i < collection.length; i++) {
      for (let j = 0; j < api_results.length; j++) {
        if (collection[i].api_id === api_results[j].id) {
          matches.push(collection[i].api_id);
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
      let newResults = [];
      for (let i = 0; i < api_results.length; i++) {
        for (let j = 0; j < matches.length; j++) {
          if (matches[j] === api_results[i].id && !newResults.includes(api_results[i])) {
            newResults.push(api_results[i]);
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
                <input checked type="checkbox" id="${api_results[i].id}" name="${api_results[i].title}" value="${api_results[i].id}">
              </li>
              `)
          }
          if (!newResults.includes(api_results[i])) {
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


// Delete movie 

