const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let movies = [
  { title: "Lady Bird", director: "Greta Gerwig", year: 2017 },
  { title: "Eternal Sunshine of the Spotless Mind", director: "Michel Gondry", year: 2004 },
  { title: "Lost in Translation", director: "Sofia Coppola", year: 2003 }
];

// Home Page
app.get('/', (req, res) => {
  res.send(`
    <h1>My Movie Collection</h1>
    <p>Welcome! This app allows you to view, add, edit, and delete your favorite movies.</p>
    <ul>
      <li><a href="/movies"> View All Movies</a></li>
      <li><a href="/addMovie"> Add a Movie</a></li>
    </ul>
  `);
});

// List Movies (GET)
app.get('/movies', (req, res) => {
  let list = '';
  for (let i = 0; i < movies.length; i++) {
    const titleEncoded = encodeURIComponent(movies[i].title);
    list += `
      <li>
        <strong>${movies[i].title}</strong> (Director: ${movies[i].director}, Year: ${movies[i].year})
        <a href="/editMovie/${titleEncoded}">Edit</a>
        <form action="/deleteMovie/${titleEncoded}" method="POST" style="display:inline;">
          <button type="submit">Delete</button>
        </form>
      </li>`;
  }
  res.send(`<h1>Movie List</h1><ul>${list}</ul><a href="/">Back to Home</a>`);
});

// Add Movie Page (GET)
app.get('/addMovie', (req, res) => {
  res.send(`
    <h1>Add a Movie</h1>
    <form action="/addMovie" method="POST">
      Title: <input name="title" required><br><br>
      Director: <input name="director" required><br><br>
      Year: <input name="year" required><br><br>
      <button type="submit">Add Movie</button>
    </form>
    <a href="/movies">Back to Movie List</a>
  `);
});

// Add Movie POST
app.post('/addMovie', (req, res) => {
  const { title, director, year } = req.body;
  movies.push({ title, director, year: parseInt(year) });
  res.redirect('/movies');
});

// Delete Movie POST (by title)
app.post('/deleteMovie/:title', (req, res) => {
    //decodeURIComponent - movie title might contain symbols, spaces that might break URL
  const title = decodeURIComponent(req.params.title);
  movies = movies.filter(movie => movie.title !== title);
  res.redirect('/movies');
});

// Edit Movie Page (GET)
app.get('/editMovie/:title', (req, res) => {
  const title = decodeURIComponent(req.params.title);
  const movie = movies.find(m => m.title === title);

  if (!movie) {
    return res.send('<p>Movie not found.</p><a href="/movies">Back to List</a>');
  }

  //encodeURIComponent - converts them into a URL-safe format
  res.send(`
    <h1>Edit Movie</h1>
    <form action="/editMovie/${encodeURIComponent(movie.title)}" method="POST">
      Title: <input name="title" value="${movie.title}" required><br><br>
      Director: <input name="director" value="${movie.director}" required><br><br>
      Year: <input name="year" value="${movie.year}" required><br><br>
      <button type="submit">Update Movie</button>
    </form>
    <a href="/movies">Back to Movie List</a>
  `);
});

// Edit Movie POST
app.post('/editMovie/:title', (req, res) => {
  const originalTitle = decodeURIComponent(req.params.title);
  const { title, director, year } = req.body;

  for (let i = 0; i < movies.length; i++) {
    if (movies[i].title === originalTitle) {
      movies[i].title = title;
      movies[i].director = director;
      movies[i].year = parseInt(year);
      break;
    }
  }

  res.redirect('/movies');
});

// Start the server
app.listen(port, () => {
  console.log(`🎥 Movie app running at http://localhost:${port}`);
});

