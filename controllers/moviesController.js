const db = require('../database/models');
const op = db.Sequelize.Op;
module.exports ={
    index: (req,res) =>{
        //console.log(req.query.nombre + '------------------');
        //console.log(req.query.apellido + '------------------');
        db.Movie.findAll({
            include : ['genre']
        })
        .then(peliculas =>{
            //return res.send(peliculas)
            return res.render('movies', {peliculas} )
        })
    },
    search : (req,res) =>{
        let buscar = req.query.buscar;
        //return res.send(req.query.buscar);
        //Aquí me dispongo a realizar mi tarea
        if(buscar === ''){
            db.Movie.findAll()
            .then(respuesta =>{
                return res.render('movies', {respuesta})
            })
            .catch(error => console.log(error))
        }else{
            db.Movie.findAll({
                where: [
                    {
                        title : {[op.like]: '%'+ buscar+'%'}
                    }
                ]
            })
            .then(respuesta =>{
                return res.render('searchMovie', {respuesta})
            })
            .catch(error => console.log(error))
        }

    },    
    detail : (req,res) => {
        let id = req.params.id;
        db.Movie.findByPk(id,{
            include : ['genre']
        })
        .then(pelicula =>{
            //return res.send(pelicula);
            return res.render('detail',{pelicula})
        })
    },
    create : (req,res) =>{
        db.Genre.findAll()
        .then(generos =>{
            return res.render('createMovie',{generos});
        })
    },
    store: (req,res) =>{
        db.Movie.create({
            title : req.body.title,
            rating :req.body.rating,
            awards: req.body.awards,
            release_date: req.body.release_date,
            length : req.body.length,
            genre_id: req.body.genre
        })
        .then(() =>{
            return res.redirect('/movies');
        })
        .catch(error => console.log(error));
    },
    edit: (req,res) => {
        let movieId = req.params.id;
        let promMovies = db.Movie.findByPk(movieId,{include: ['genre']});
        let promGenres = db.Genre.findAll();
        Promise
        .all([promMovies, promGenres])
        .then(([Movie, allGenres]) => {
            return res.render('editMovie', {Movie,allGenres})})
        .catch(error => res.send(error))
    },
    update:  (req,res) => {
        let movieId = req.params.id;
        db.Movie
        .update(
            {
                title: req.body.title,
                rating: req.body.rating,
                awards: req.body.awards,
                //release_date: req.body.release_date,
                length: req.body.length,
                genre_id: req.body.genre_id
            },
            {
                where: {id: movieId}
            })
        .then(()=> {
            return res.redirect('/movies')})            
        .catch(error => res.send(error))
    },    
    delete: (req,res) =>{
        let id = req.params.id;
        db.Movie.findByPk(id)
        .then(movie =>{
            return res.render('movieDelete',{pelicula: movie})
        })
        .catch(error => console.log(error))
    },
    destroy : (req,res) =>{
        let movieId = req.params.id;
        db.Movie.destroy({
            where: {
                id : movieId
            }
        })
        .then( () =>{
            return res.redirect('/movies')
        })

    }

}