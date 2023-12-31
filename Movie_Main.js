var moviesList = new Array();
var KEY = "Movies";
var currentMovie = 0;

// set the windows onload function that will be called when the window is loaded
window.onload = function () {
  //this documents the addEventListener ("deviceready", init, false)
  init();
};

function init() {
  // get the btnSave and addEventListener click to save the movie
  // get the btnDelete and addEventListener click to delete the movie
  var btnSave = document.getElementById("btnSave");
  btnSave.addEventListener("click", saveMovie);
  var btnDelete = document.getElementById("btnDelete");
  btnDelete.addEventListener("click", deleteMovie);
  // set the database configDB function
  configDB();
  loadMovielog();
}

function deleteMovie() {
  var confirmation = confirm("Are you sure?");
  if (confirmation) {
    moviesList.splice(currentMovie, 1);
  }
  populateMaster();
  $.mobile.changePage("#master");
  saveList();
}

function populateMaster() {
  var out = "<ul data-role='listview' id='movieList'>";
  for (x in moviesList) {
    out +=
      "<li onclick='movieClicked(" + x + ")'>" + moviesList[x].name + "</li>";
  }
  out += "</ul>";
  document.getElementById("movieData").innerHTML = out;
  $("#movieList").listview();
}

function movieClicked(x) {
  currentMovie = x;
  var out = "<h1>" + moviesList[x].name + "</h1>";
  out += "<h2>" + moviesList[x].year + " | " + moviesList[x].category + "</h2>";
  out += "<p>Date Watched: " + moviesList[x].dateWatched + "</p>";
  out += "<p>Personal Rating: " + moviesList[x].personalRating + "</p>";
  document.getElementById("detailContent").innerHTML = out;
  $.mobile.changePage("#detail");
}

function loadMovieLog() {
  localforage
    .getItem(KEY)
    .then(function (value) {
      value = JSON.parse(value);
      for (var x in value) {
        var movieToSave = new Movie(
          value[x].name,
          value[x].year,
          value[x].category,
          value[x].dateWatched,
          value[x].personalRating
        );
        moviesList.push(movieToSave);
      }

      populateMaster();
    })
    .catch(function (err) {
      console.log(err);
    });
}

function configDB() {
  localforage.config({
    driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver()
    name: "Movie_Log",
    version: 1.0,
    size: 4980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: "movie_log", // Should be alphanumeric, with underscores.
    description: "Movie log applcation",
  });
}

function saveMovie(e) {
  var complete = true;
  var name = document.getElementById("name").value;
  var year = document.getElementById("year").value;
  var category = document.getElementById("category").value;
  var dateWatched = document.getElementById("dateWatched").value;
  var personalRating = document.getElementById("personalRating").value;

  if (name == "" || name == null) {
    complete = false;
  }
  if (year == "" || year == null) {
    complete = false;
  }
  if (category == "" || category == null) {
    complete = false;
  }
  if (dateWatched == "" || dateWatched == null) {
    complete = false;
  }
  if (personalRating == "" || personalRating == null) {
    complete = false;
  }

  if (complete) {
    var movieToSave = new Movie(
      name,
      year,
      category,
      dateWatched,
      personalRating
    );
    moviesList.push(movieToSave);
    saveList();
    clearForm();
  } else {
    alert("All fields must be complete.");
  }
}

function clearForm() {
  document.getElementById("name").value = "";
  document.getElementById("year").value = "";
  document.getElementById("dateWatched").value = "";
}

function saveList() {
  localforage
    .setItem(KEY, JSON.stringify(moviesList))
    .then(function () {
      return localforage.getItem(KEY);
    })
    .then(function (value) {
      populateMaster();
    })
    .then(function (err) {
      console.log(err);
    });
}

// // declare the function deleteMovie to confirm that the movie will be deleted
// function deleteMovie() {
//   var confirmation = confirm("Are you sure you want to delete this movie?");
//   if (confirmation) {
//     moviesList.splice(currentMovie, 1);
//   }
//   populateMaster();
//   $.mobile.changePage("#master");
//   saveList();
// }

// // declare the function populateMaster
// function populateMaster() {
//   var out = "<ul data-role='listview' id='movieList'>";
//   for (x in moviesList) {
//     out +=
//       "<li onclick='movieClicked(" + x + ")'>" + moviesList[x].name + "</li>";
//   }
//   out += "</ul > ";
//   document.getElementById("movieData").innerHTML = out;
//   $("#movieList").listview();
// }

// function movieClicked(x) {
//   currentMovie = x;
//   var out = "<h1>" + moviesList[x].name + "</h1>";
//   out += "<h2>" + moviesList[x].year + " | " + moviesList[x].category + "</h2>";
//   out += "<p>Date Watched: " + moviesList[x].dateWatched + "</p>";
//   out += "<p>Personal Rating: " + moviesList[x].personalRating + "</p>";
//   document.getElementById("detailContent").innerHTML = out;
//   $.mobile.changePage("#detail");
// }

// // create a loadMovie function to load the movie into the localStorage system using localForage
// // pass the data as JSON, populateMaster object to catch errors

// //   use the then function and pass the value
// function loadMovieLog() {
//   // declare the localforage getItem and pass the KEY
//   localforage
//     .getItem(KEY)
//     .then(function (value) {
//       // set the value as JSON parse and value as arg
//       value = JSON.parse(value);
//       for (var x in value) {
//         var movieToSave = new Movie(
//           value[x].name,
//           value[x].year,
//           value[x].category,
//           value[x].dateWatched,
//           value[x].personalRating
//         );
//         moviesList.push(movieToSave);
//       }
//       populateMaster();
//     })
//     .catch(function (err) {
//       console.log(err);
//     });
// }

// // declare the configDB function and set the localforage.config

// function configDB() {
//   localforage.config({
//     driver: localforage.WEBSQL, // Force WebSQL; same as using setDriver
//     name: "Movie_log",
//     version: 1.0,
//     size: 4980736, // size of database, in bytes. WebSQL-only for now.
//     storeName: "movie_log", //Should be alphanumeric, with underscore
//     description: "Movie log application",
//   });
// }

// function saveMovie(e) {
//   var complete = true;
//   var name = document.getElementById("name").value;
//   var year = document.getElementById("year").value;
//   var category = document.getElementById("category").value;
//   var dateWatched = document.getElementById("dateWatched").value;
//   var personalRating = document.getElementById("personalRating").value;

//   if (name == "" || name == null) {
//     complete = false;
//   }
//   if (year == "" || year == null) {
//     complete = false;
//   }
//   if (category == "" || category == null) {
//     complete = false;
//   }
//   if (dateWatched == "" || dateWatched == null) {
//     complete = false;
//   }

//   if (personalRating == "" || personalRating == null) {
//     complete = false;
//   }

//   if (complete) {
//     var movieToSave = new Movie(
//       name,
//       year,
//       category,
//       dateWatched,
//       personalRating
//     );
//     moviesList.push(movieToSave);
//     saveList();
//     clearForm();
//   } else {
//     alert("All fields must be complete");
//   }
// }

// function clearForm() {
//   document.getElementById("name").value = "";
//   document.getElementById("year").value = "";
//   document.getElementById("dateWatched").value = "";
// }

// function saveList() {
//   localforage
//     .setItem(KEY, JSON.stringify(moviesList))
//     .then(function () {
//       return localforage.getItem(KEY);
//     })
//     .then(function (value) {
//       populateMaster();
//     })
//     .then(function (err) {
//       console.log(err);
//     });
// }
