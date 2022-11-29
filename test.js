const express = require("express")
const path = require("path");
const Process = require("./models/process");
const Question = require("./models/question");
// import { create } from 'express-handlebars';
const app = express();
const port = 8000;

// const hbs = create({
//     // Specify helpers which are only registered on this instance.
//     helpers: {
//         foo() { return 'FOO!'; },
//         bar() { return 'BAR!'; }
//     }
// });

// app.engine('handlebars', hbs.engine);
// app.set('view engine', 'handlebars');
// app.set('views', './views');

// app.get('/', (req, res, next) => {
//     res.render('home', {
//         showTitle: true,

//         // Override `foo` helper only for this rendering.
//         helpers: {
//             foo() { return 'foo.'; }
//         }
//     });
// });

// app.listen(3000);


////to set the views engine
app.set("view engine" , "hbs")



app.post("/quotes",async (req, res) => {
    res.send("njnunuiui")


    // const process = new Process({
    //     // name: req.body.name,
    //     // machine: req.body.machine,
    //     question: req.body.question,
    //     option1: req.body.option1,
    //     option2: req.body.option2,
    //     // serial_number: req.body.serial_number,
    //     // category: req.body.category,
    //   });
    //   console.log(process)



    // res.render("main")
    // try {
    //     const { description } = req.body
    //     const { alternatives } = req.body

    //     const question = await Question.create({

    //         description,
    //         alternatives
    //     })

    //     return res.status(201).json(question)
    // } catch (error) {

    //     return res.status(500).json({"error":error})
    // }
    // res.send("data upload sucsfull")
    

})
///////////////////////////////////////////////////////////
// * INSERT user */
app.post('/insert_user', function(req, res) {
	// Get the only one db instance in our app
	// var db = req.db;
	// Get POST values, It's easy
	var userName = req.body.name;
	var userEmail = req.body.email;
	console.log('POST VALUES:' + userName + ' ' + userEmail);
	
	// Fetch from 'users' collection
	// var userCollection = db.get("users");
	Question.insert({
		'username' : userName,
		'email' : userEmail
	}, function(err, doc) {
		if(err) res.send('Problem occured when inserting in users collection');
		else {
			console.log("Inserted");
			res.location('users');
			res.redirect('/users');
		}
	});
});


//////////////////////////////////////////////
app.get('/', function(req, res){
    res.render('Home', {
       array: ['One', 'Two', 'Three', 'Four'],
       message: 'Greetings from geekforgeeks'
    })
})




app.get("/",(req, res) => {
    res.render("main")

})
app.listen(port, () => {
    console.log(`listening to theport ${port}`)
});
