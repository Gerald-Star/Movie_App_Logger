var movieList = new Array();
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

// declare the function deleteMovie to confirm that the movie will be deleted
function deleteMovie() {
  var confirmation = confirm("Are you sure you want to delete this movie?");
  if (confirmation) {
    movieList.splice(currentMovie, 1);
  }
  populateMaster();
  $.mobile.changePage("#master");
  saveList();
}

// declare the function deleteMovie to confirm that the movie will be deleted
