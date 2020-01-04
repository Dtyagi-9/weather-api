const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()

// set the view engine to use handlebars
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});
// console.log(path.join(__dirname,'../public'))
app.set('view engine', 'hbs');  //handlebars setup
app.use(express.static(path.join(__dirname,'../public')))


//dynamic content rendering
app.get('/', (req, res) => {
    res.render('index')//no need to put in the file extension 
})

//  because ye ab use hi no hoga root pr humara index.html page display hoga 
// app.get('',(req,res)=>{
//     res.send('<h1>Weather Content</h1>')
// })

app.get('/help',(req,res)=>{
    // res.send('How mayI help you ?')
    res.send({

        name:"dev",
        age:20
    })
})

app.get('/about',(req,res)=>{
    res.send('<h1>Created by Dev Tyagi</h1>')
})

app.get('/weather',(req,res)=>{
    res.send({
        forecast:"bohot dhua h",
        location:"Delhi"
    })
})
app.listen(3002,()=>{
    console.log("server running at port 3002 \n access at localhost:3002")
})