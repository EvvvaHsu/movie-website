// require packages used in the project
const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')
const movieList = require('./movies.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))


//route setting
app.get('/', (req, res) => {

    // pass the movie data into 'index' partial template
    res.render('index', { movies: movieList.results });
})


app.get('/search', (req, res) => {

    const keyword = req.query.keyword
    const movies = movieList.results.filter(movie => {
        return movie.title.toLowerCase().includes(keyword.toLowerCase())
      })
    //console.log(req.query)
    // pass the movie data into 'index' partial template
    res.render('index', { movies: movies, keyword: keyword });
})


// start and listen on the Express server
//params
app.get('/movies/:movie_id', (req, res) => {
    //console.log(req.params.movie_id)

    const movie = movieList.results.find(
        movie => movie.id.toString() === req.params.movie_id
      )  

    res.render('show', { movie: movie })

})



// start and listen on the Express server
app.listen(port, () => {
    console.log(`Express is started on ${port}.`)
})


