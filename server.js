const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 1234;
var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine', 'hbs');


// app.use((req,res,next)=>{
//     res.render('maintenance.hbs',{
//         pageTitle: 'Maintenance Page'
//     });
// });

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    
    console.log(log);
    fs.appendFile(__dirname+'/logs/server.log',log+'\n',(err)=>{
        if(err){
            console.log(`unable to append to server.log ${err}`);
        }
    });

    next();
})

hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
    return text.toUpperCase();
});



app.get('/',(req,res)=>{
    // res.send('<h1>Hello Express</h1>');
    // res.send({
    //     name: "Amitabh",
    //     like: ['Biking', 'Running']
    // })
    res.render('home.hbs',{
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to Node-Webserver Demo !'
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        pageTitle: 'About Page...'
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        error: 'Error while processing'
    });
});

app.get('/projects',(req,res)=>{
    res.render('projects.hbs',{
        pageTitle: 'Projects Page',
        projectsDetail: 'Project portfolio'
    });
})
app.listen(port,()=>{
    console.log(`Server started in port ${port}`);
});

// nodemon server.js -e js,hbs