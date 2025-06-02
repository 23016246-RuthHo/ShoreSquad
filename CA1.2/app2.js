// importing express framework
const express = require('express');
const app = express();
const port = 3000;

// middleware to parse from data and json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// movie array 
let movies = [
  {
    id: 1,
    title: "Lady Bird",
    director: "Greta Gerwig",
    year: 2017,
    poster: "https://cdn.posteritati.com/posters/000/000/056/742/lady-bird-md-web.jpg"
  },
  {
    id: 2,
    title: "Eternal Sunshine of the Spotless Mind",
    director: "Michel Gondry",
    year: 2004,
    poster: "https://theredledger.net/wp-content/uploads/2013/02/eternal-sunshine-of-the-spotless-mind-poster-artwork-kate-winslet-kirsten-dunst-tom-wilkinson.jpg"
  },
  {
    id: 3,
    title: "Lost in Translation",
    director: "Sofia Coppola",
    year: 2003,
    poster: "https://m.media-amazon.com/images/M/MV5BMTc3OTMzMDkxNF5BMl5BanBnXkFtZTcwNzIxNTAwMQ@@._V1_.jpg"
  },
    {
    id: 4,
    title: "The Grand Budapest Hotel",
    director: "Wes Anderson",
    year: 2014,
    poster: "https://www.slantmagazine.com/wp-content/uploads/2013/10/film_posterlabgrandbudapesthotel_2.jpg"
  },
    {
    id: 5,
    title: "Challangers",
    director: "Luca Guadagnino",
    year: 2024,
    poster: "https://www.showbizjunkies.com/wp-content/uploads/2024/01/challengers-poster.jpg"
  }
];

// Home Page
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Movie App</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">MovieApp</a>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="/movies">Movie List</a></li>
              <li class="nav-item"><a class="nav-link" href="/addMovie">Add Movie</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container">
        <h1 class="mb-3">🎬 Movie Collection</h1>
        <p>Welcome! This app allows you to view, add, edit, and delete your favorite movies.</p>

        <div class="card p-4 mb-3">
          <h4>Search Movies</h4>
          <form action="/movies" method="get" class="row g-3">
            <div class="col-md-10">
              <input type="text" name="title" class="form-control" placeholder="Search by title">
           <div class="col-md-2">
            <button type="submit" class="btn btn-primary w-100">Search</button> 
          </div>  
          </form>
        </div> 

        <a href="/movies" class="btn btn-primary mt-3">View Movies</a>
      </div>
    </body>
    </html>
  `);
});

// List all movies page / Search route
// (primary btn - blue, danger btn - red, btn-sm small )
app.get('/movies', (req, res) => {

  //get titile query parameter from url
  const { title } = req.query;

  let filteredMovies = movies;

  // if title provided - filter list
  if (title) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.title.toLowerCase().includes(title.toLowerCase()) //make it case-insensitive
    );
  }

  let list = '';
  // loop through each movies and creates a bootstrap card
  // strong means bold text
  for (let i = 0; i < filteredMovies.length; i++) {
    list += `
      <div class="card mb-3" style="max-width: 600px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${filteredMovies[i].poster}" class="img-fluid rounded-start" alt="Poster">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${filteredMovies[i].title}</h5>
              <p class="card-text"><strong>Director:</strong> ${filteredMovies[i].director}</p>
              <p class="card-text"><strong>Year:</strong> ${filteredMovies[i].year}</p>
              <a href="/editMovie/${filteredMovies[i].id}" class="btn btn-sm btn-primary">Edit</a>
              <form action="/deleteMovie/${filteredMovies[i].id}" method="POST" style="display:inline;">
                <button type="submit" class="btn btn-sm btn-danger">Delete</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // sends the full movie list page
  res.send(`
    <html>
    <head>
      <title>Movie List</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">MovieApp</a>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="/movies">Movie List</a></li>
              <li class="nav-item"><a class="nav-link" href="/addMovie">Add Movie</a></li>
            </ul>
          </div>
        </div>
      </nav>

      <div class="container">
        <h1 class="mb-4">🎞️ All Movies</h1>
        ${list}
        <a href="/" class="btn btn-secondary mt-4">Back to Home</a>
      </div>
    </body>
    </html>
  `);
});

// Add movie form (GET)
app.get('/addMovie', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Add Movie</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-light">
      <div class="container my-5">
        <h1 class="mb-4">Add a Movie</h1>
        <form action="/addMovie" method="POST">
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input name="title" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Director</label>
            <input name="director" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Year</label>
            <input name="year" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Poster Image URL</label>
            <input name="poster" class="form-control">
          </div>
          <button type="submit" class="btn btn-success">Add Movie</button>
        </form>
        <a href="/movies" class="btn btn-secondary mt-3">Back to Movie List</a>
      </div>
    </body>
    </html>
  `);
});

// Add movie (POST)
app.post('/addMovie', (req, res) => {
  // generate a new unique ID
  // if movies array has items, get the last ID and + 1 
  const newId = movies.length ? movies[movies.length - 1].id + 1 : 1;
  // destructure frorm from input fields from the request body
  const { title, director, year, poster } = req.body;

  //add  new movie to the array
  movies.push({ id: newId, title, director, year: parseInt(year), poster });
  res.redirect('/movies');
});

// Delete movie (by ID passed in url)
app.post('/deleteMovie/:id', (req, res) => {
  //get id from URL and convert into a number
  const id = parseInt(req.params.id);
  //filter out movie with matching ID - creates a new array without the deleted movie
  movies = movies.filter(movie => movie.id !== id);
  //redirects to updated movie list
  res.redirect('/movies');
});

// Edit movie form (GET)
app.get('/editMovie/:id', (req, res) => {

  //extract movie if from url and convert it to number
  const id = parseInt(req.params.id);
  //find movie in array that matches id given
  const movie = movies.find(m => m.id === id);

  //if no matching movie found, will show an error message 
  if (!movie) {
    return res.send('<p>Movie not found.</p><a href="/movies">Back to List</a>');
  }

  // btn-primary - blue, btn-secondary - gray (deafult colours)
  res.send(`
    <html>
    <head>
      <title>Edit Movie</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="bg-light"> 
      <div class="container my-5">
        <h1 class="mb-4">Edit Movie</h1>
        <form action="/editMovie/${movie.id}" method="POST">
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input name="title" value="${movie.title}" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Director</label>
            <input name="director" value="${movie.director}" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Year</label>
            <input name="year" value="${movie.year}" class="form-control" required>
          </div>
          <div class="mb-3">
            <label class="form-label">Poster Image URL</label>
            <input name="poster" value="${movie.poster}" class="form-control">
          </div>
          <button type="submit" class="btn btn-primary">Update Movie</button>
        </form>
        <a href="/movies" class="btn btn-secondary mt-3">Back to Movie List</a>
      </div>
    </body>
    </html>
  `);
});

// Edit movie (POST)
app.post('/editMovie/:id', (req, res) => {
  //extract movie id from url and convert to nuumber
  const id = parseInt(req.params.id);
  // destuctures updated field from form submission to req.body
  const { title, director, year, poster } = req.body;

  // looping throuugh movie array to find matching ID
  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      //if same then update movie properties with new values
      movies[i].title = title;
      movies[i].director = director;
      movies[i].year = parseInt(year); //convert string to number
      movies[i].poster = poster;
      break; //exit loop after updating movie
    }
  }
//redirects back to the movie list after saving changes
  res.redirect('/movies');
});

// Start server
app.listen(port, () => {
  console.log(`🎥 Movie app running at http://localhost:${port}`);
});
