
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let movies = [
  { id: 1, title: "Lady Bird", director: "Greta Gerwig", year: 2017, poster: "https://m.media-amazon.com/images/M/MV5BY2NiZmQ4YWYtZGQxYy00YTYwLWEzNzktY2ZkZjMwZGE4ZTI0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg" },
  { id: 2, title: "Eternal Sunshine of the Spotless Mind", director: "Michel Gondry", year: 2004, poster: "https://theredledger.net/wp-content/uploads/2013/02/eternal-sunshine-of-the-spotless-mind-poster-artwork-kate-winslet-kirsten-dunst-tom-wilkinson.jpg" },
  { id: 3, title: "Lost in Translation", director: "Sofia Coppola", year: 2003, poster: "https://m.media-amazon.com/images/M/MV5BMTc3OTMzMDkxNF5BMl5BanBnXkFtZTcwNzIxNTAwMQ@@._V1_.jpg" }
];

// Home Page
app.get('/', (req, res) => {
  res.send(`
    <html>
    <head>
      <title>Movie App</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="container">
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

      <h1>Movie Collection</h1>
      <p>Welcome! This app allows you to view, add, edit, and delete your favorite movies.</p>
    </body>
    </html>
  `);
});


// List all movies
app.get('/movies', (req, res) => {
  let list = '';
  for (let i = 0; i < movies.length; i++) {
    list += `
      <li>
        <img src="${movies[i].poster}" width="100" alt="Poster"><br>
        ${movies[i].title} (Director: ${movies[i].director}, Year: ${movies[i].year})<br>
        <a href="/editMovie/${movies[i].id}">Edit</a>
        <form action="/deleteMovie/${movies[i].id}" method="POST" style="display:inline;">
          <button type="submit">Delete</button>
        </form>
      </li><br>`;
  }
  res.send(`<h1>Movie List</h1><ul>${list}</ul><a href="/">Back to Home</a>`);
});

// Add movie form
app.get('/addMovie', (req, res) => {
  res.send(`
    <h1>Add a Movie</h1>
    <form action="/addMovie" method="POST">
      Title: <input name="title" required><br><br>
      Director: <input name="director" required><br><br>
      Year: <input name="year" required><br><br>
      Poster Image URL: <input name="poster"><br><br>
      <button type="submit">Add Movie</button>
    </form>
    <a href="/movies">Back to Movie List</a>
  `);
});

// Add movie (POST)
app.post('/addMovie', (req, res) => {
  const newId = movies.length ? movies[movies.length - 1].id + 1 : 1;
  const { title, director, year, poster} = req.body;
  movies.push({ id: newId, title, director, year: parseInt(year), poster });
  res.redirect('/movies');
});

// Delete movie (by ID)
app.post('/deleteMovie/:id', (req, res) => {
  const id = parseInt(req.params.id);
  movies = movies.filter(movie => movie.id !== id);
  res.redirect('/movies');
});

// Edit movie form (GET)
app.get('/editMovie/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return res.send('<p>Movie not found.</p><a href="/movies">Back to List</a>');
  }

  res.send(`
    <h1>Edit Movie</h1>
    <form action="/editMovie/${movie.id}" method="POST">
      Title: <input name="title" value="${movie.title}" required><br><br>
      Director: <input name="director" value="${movie.director}" required><br><br>
      Year: <input name="year" value="${movie.year}" required><br><br>
      Poster Image URL: <input name="poster" value="${movie.poster}"><br><br>
      <button type="submit">Update Movie</button>
    </form>
    <a href="/movies">Back to Movie List</a>
  `);
});

// Edit movie (POST)
app.post('/editMovie/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, director, year, poster } = req.body;

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].id === id) {
      movies[i].title = title;
      movies[i].director = director;
      movies[i].year = parseInt(year);
      movies[i].poster =  poster; 
      break;
    }
  }

  res.redirect('/movies');
});

// Start server
app.listen(port, () => {
  console.log(`Movie app running at http://localhost:${port}`);
});
