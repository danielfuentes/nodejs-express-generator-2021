const db = require('../database/models');
const bcrypjs = require('bcryptjs');
const op = db.Sequelize.Op;
module.exports = {
    create: (req,res) =>{
        //return res.send('Estoy el registro de usuarios');
        return res.render('register');
    },
    store: (req,res) =>{
        //return res.send(req.body);
        let errores = [];
        if(req.body.nombre === ''){
            errores.push('El campo nombre no puede estar vacio');
        }
        if(req.body.email === ''){
            errores.push('El campo email no puede estar vacio');
        }
        if(req.body.password === ''){
            errores.push('El campo password no puede estar vacio');
        }
        if(errores.length === 0){
            db.User.create({
                name : req.body.nombre,
                email : req.body.email,
                password : bcrypjs.hashSync(req.body.password, 10),
                avatar : req.file ? req.file.filename : '',
                role : 1
            })
            .then(()=>{
                return res.redirect('/users/login');
            })     
            .catch(error => console.log(error));
        }else{
            return res.render('erroresRegister', {errores});
        }    
    },
    login : (req,res) =>{
        if(req.session.user === undefined){
            return res.render('login');
        }else{
            return res.redirect('/');
        }
        
    },
    ingresar : (req,res) =>{
        //return res.send(req.body);

        db.User.findOne({
            where: [{ email : req.body.email}]
        })
        .then(usuario =>{
            //console.log(usuario+'-------------------');
            //return res.send(usuario.id);
            //console.log(usuario.id+'------------------------------');
            if(usuario == null){
                return res.send('Usuario o clave inválida')
            }else{
                if(bcrypjs.compareSync(req.body.password, usuario.password)){
                    //Guardar al usuario que se está logueando
                    req.session.user = usuario;
                    //Activar el guardado en cookies - Recuerdame
                    if(req.body.recordarme){
                        res.cookie('userId', usuario.id, {maxAge : 1000*60*60*24})
                    }
                    return res.redirect('/')
                }else{
                    return res.send('Usuario o clave inválida');
                }
            }
        })

    },
    logout: (req,res) =>{
        req.session.destroy();
        res.cookie('userId', '', {maxAge : -1 });
        return res.redirect('/');
    }


}