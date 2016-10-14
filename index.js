// Assignment 7, weeks 8-9
// Student: Kristinn Heiðar Freysteinsson
// Email: kristinnf13@ru.is

class Company {
	constructor(id, name, punchCount) {
		this.id = id;
		this.name = name;
		this.punchCount = punchCount;
	}
}

class User {
	constructor(id, name, email) {
		this.id = id;
		this.name = name;
		this.email = email;
		this.punches = [];
	}
}

class Punch {
	constructor(cId) {
		this.cId;
		this.
	}
}

const express = require('express'), bodyParser = require('body-parser');
const app = express();
// only accept json body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// I like having some data here while I'm working/testing :)
const companies = [ new Company(0, "Forvit", 10), new Company (1, "Smuuu", 20) ];
const users = [ new User(0, "Kristinn", "kristinnf13@ru.is"), new User(1, "Daníel", "dabs@ru.is") ];

app.get("/api/companies", (req, res) => {
	res.json(companies);
});

app.post("/api/companies", (req, res) => {
	if(!req.body.hasOwnProperty("name") || !req.body.hasOwnProperty("punchCount")) {
		res.statusCode = 400;
		return res.send("Error. Post syntax incorrect!");
	}

	//var name = // TODO: finish this <- check if valid string and then valid int for punchCount

	var newCompany = new Company(companies.length, req.body.name, req.body.punchCount);
	companies.push(newCompany);

	res.statusCode = 200;
	res.json(newCompany);
});

app.get("/api/companies/:id", (req, res) => {
	var id = parseInt(req.params.id);
	if(isNaN(id) || id >= companies.length || id < 0) {
		res.statusCode = 404;
		return res.send("Error. " + req.params.id + " is not a valid company id!");
	}
	res.json(companies[id]);
});

app.get("/api/users", (req, res) => {
	res.json(users);
});

/*
(20%) /api/users/ - POST
Adds a new user to the system. The following properties must be specified: name, email

(20%) /api/users/{id}/punches - GET
Returns a list of all punches registered for the given user. Each punch contains information about what company it was added to, and when it was created.
It should be possible to filter the list by adding a "?company={id}" to the query.

(20%) /api/users/{id}/punches - POST
Adds a new punch to the user account. The only information needed is the id of the company.
*/

app.listen(process.env.PORT || 5000);
