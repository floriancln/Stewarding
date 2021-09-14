/**
 * LE CONTROLEUR DU PROJET STEWARDING
 */

/////////////////////////////// PROMISES ////////////////////////////////////////////
const getCities = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT * FROM cities ORDER BY name_city";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {

				resolve(rows);
			}
			// if KO 
			else {

				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getCities



const getCountries = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT * FROM countries ORDER BY name_country";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {
				resolve(rows);
			}
			// if KO 
			else {
				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getCountries



const getUsers = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT * FROM users ORDER BY id_user";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {
				resolve(rows);
			}
			// if KO 
			else {
				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getUsers


const getProducts = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT * FROM products ORDER BY name_product";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {
				resolve(rows);
			}
			// if KO 
			else {
				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getServices



const getCategories = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT * FROM categories ORDER BY name_category";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {

				resolve(rows);
			}
			// if KO 
			else {
				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getCategories



const getSuppliers = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT * FROM suppliers ORDER BY name_supplier";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {

				resolve(rows);
			}
			// if KO 
			else {
				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getUsers



const getServices = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT * FROM services ORDER BY name_service";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {
				resolve(rows);
			}
			// if KO 
			else {
				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getServices

const getServicesAndUsers = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT s.name_service, u.name_user, u.firstname_user FROM services s INNER JOIN users u ON s.id_user = u.id_user";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {
				resolve(rows);
			}
			// if KO 
			else {
				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getServicesAndUsers

const getSuppliersAndCities = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT * FROM suppliers s INNER JOIN cities c ON s.id_city = c.id_city";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {
				resolve(rows);
			}
			// if KO 
			else {
				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getServicesAndUsers

const getCleaningAgents = (cnx) => {
	return new Promise((resolve, reject) => {
		// Exécute une requête SQL de type SELECT 
		let sql = "SELECT * FROM `cleaning_agents` ORDER BY name_cleaning_agent";
		cnx.query(sql, (err, rows, fields) => {
			// If OK
			if (!err) {

				resolve(rows);
			}
			// if KO 
			else {
				reject("Erreur d\'exécution de la requête ! " + err);
			}
		});
	} /// return
	) /// promise
} /// getCities



// Use of nodemon package to launch the app. This makes the app more stable and refresh it automatically when necessary.
// Command = 'nodemon app' Only necessary once

// Const installed with npm
const mysql = require('mysql');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const jwt = require('jsonwebtoken');
const express = require('express');
require('express-async-errors');
const app = express();

// Express Packages that I will use
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// url
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Statics ressources files
app.use("/", express.static(path.join(__dirname + '/public')));

// Database's connection definition
const connection = mysql.createConnection({
	host: 'mysql-floriancolin.alwaysdata.net',
	port: '3306',
	user: '229210',
	password: 'AlwaysAccount1',
	database: 'floriancolin_stewarding',
	multipleStatements: true
});

//Database's connection
connection.connect();





///////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * SECURED LOGIN
*/


//This is the entrance's page of the website. Authentification is required to go furthe
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/views/LoginAdmin.html'));
});

// The POST MEthod is applied in order to ask the user to put specific DB informations in order to login
app.post('/authentification', function (req, res) {
	let username = req.body.username;
	let password = req.body.password;
	if (username && password) {
		// Connection with the DB and specificaly with the administrator's table
		connection.query('SELECT * FROM administrators WHERE email_administrator = ? AND password_administrator = ?', [username, password], function (error, results, fields) {
			// If the informations match the DB's, he will be redirected to the Dashboard page.
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect('/dashboard');
			} else {
				// If informations are missing or incorrect, an error message will appear and access denied until proper authentification
				res.send('Incorrect Username and/or Password!');
			}
			res.end();
		}); // End of Query
	} else {
		// This message will appear if informations are missing
		res.send('Please enter Username and Password!');
		res.end();
	}
});// End of POST Method

// Use of GET MEthod to redirect the  user when authentificated
app.get('/dashboard', function (req, res) {
	// If the authentification has been verified
	if (req.session.loggedin) {

		res.render(__dirname + '/views/dashboard.ejs');
	} else {
		// If the user simply tries to login via the url without properly login, the following message will appear
		res.send('Please login to view this page!');
	}
	res.end();
});// End of GET METHOD






/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * PRODUCT : REDIRECTIONS + CRUD
*/

// REDIRECTIONS

// Redirect to products.ejs with GET Method
app.get('/products', (req, res) => {
	let message = "";
	// Connexion to products table in order to display the products on the main product page
	connection.query('SELECT p.reference_product, p.name_product, p.price_wt_product, p.description_product, c.name_category, s.name_supplier FROM products p INNER JOIN categories c ON p.id_category = c.id_category INNER JOIN suppliers s ON p.id_supplier = s.id_supplier ', function (err, rows) {
		if (err) {
			message = "Extraction KO";
			rows = new Array();
		}
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render(__dirname + '/views/products.ejs', { productList: rows, message: message });
	});
});


// Redirect to insertProduct.ejs du GET
app.get('/insertProduct', (req, res) => {
	console.log("/insertProduct")
	let message = "";
	// Definition of promises in order to retrieve datas from tables suppliers and categories
	let promiseSuppliers = getSuppliers(connection);
	let promiseCategories = getCategories(connection);
	// promise.all allows to use several promises in one ordinal tab and one response
	Promise.all([promiseSuppliers, promiseCategories]).then((suppliersAndcategories) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		// Redirect to insertProduct page
		res.render('insertProduct.ejs', { message: message, supplierList: suppliersAndcategories[0], categoryList: suppliersAndcategories[1] });
	});  /// then
});

// END OF REDIRECTIONS


// Validation of Insert with the POST Method, caracterised in insertProduct page's form
app.post('/insertProductValidation', (req, res) => {
	console.log("/insertProductValidation");
	let message = "";

	// Insertion into Batabase
	// Definition of a variable in order to retrives datas put into the form by the admin
	const params = [req.body.reference_product, req.body.name_product, req.body.price_wt_product, req.body.description_product, req.body.id_supplier, req.body.id_category];

	// INSERT SQL Request
	connection.query('INSERT INTO products(reference_product, name_product, price_wt_product, description_product, id_supplier, id_category) VALUES(?,?,?,?,?,?)', params, (err, affected) => {
		// If error
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			console.log("OK");
			message = affected.affectedRows + " produit ajouté";
		}
		console.log(message)
		// Use of promises in order to redirect to the same page after completion of action
		let promiseSuppliers = getSuppliers(connection);;
		let promiseCategories = getCategories(connection);
		Promise.all([promiseSuppliers, promiseCategories]).then((suppliersAndCategories) => {
			//console.log(countries);
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('insertProduct.ejs', { message: message, supplierList: suppliersAndCategories[0], categoryList: suppliersAndCategories[1] });
		});  /// then

	}); /// query

	console.log("Message : " + message);
}); /// post insert validation


// To page deleteProduct.ejs
app.get('/deleteProduct', (req, res) => {
	let promiseProducts = getProducts(connection);
	promiseProducts.then((product) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('deleteProduct.ejs', { productList: product, message: "" });
	}); /// then
}); /// deleteProduct


// Validation of suppression with SELECT
app.post('/deleteProductValidation', (req, res) => {
	// Suppression into Database
	let message = "";
	// Retrieve datas from form id'd by id_product
	const param = req.body.id_product;
	// Requete de suppression
	connection.query('DELETE FROM products WHERE id_product = ?', param, (err, affected) => {
		if (err) {
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			message = affected.affectedRows + " produit supprimé";
		}

		let promiseProducts = getProducts(connection);
		promiseProducts.then((product) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('deleteProduct.ejs', { productList: product, message: message });
		}); /// then
	}); /// query
}); /// post suppression validation

// To page udpateProduct.ejs
app.get('/updateProduct', (req, res) => {
	let message = "";
	// definition of variable row containing a json table referencing to the html form datas to be updated
	let row = {
		"id_product": "",
		"reference_product": "",
		"name_product": "",
		"price_wt_product": "",
		"description_product": "",
		"id_supplier": "",
		"id_category": ""
	};
	// Use of promises in order to retrive datas from tables products, suppliers and categories (having a foreign key into products)
	let promiseProducts = getProducts(connection);
	promiseProducts.then((products) => {
		let promiseSuppliers = getSuppliers(connection);
		let promiseCategories = getCategories(connection);
		// Promise.all allows us to add promises into one simple request, so we can retrieves datas all at once
		Promise.all([promiseSuppliers, promiseCategories]).then((suppliersAndCategories) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			// Redirection to page UpdateProduct
			res.render('updateProduct.ejs', { message: message, productList: products, supplierList: suppliersAndCategories[0], categoryList: suppliersAndCategories[1], row: row });
		});  /// then
	}) /// then
}); // Update product

/*
* After selection for Update
*/
app.get('/updateSelectionProduct', (req, res) => {
	let message = "";
	// Definition of variable querying by id_products
	const param = req.query.id_product;

	let row = {
		"id_product": "",
		"reference_product": "",
		"name_product": "",
		"price_wt_product": "",
		"description_product": "",
		"id_supplier": "",
		"id_category": ""
	};

	connection.query('SELECT * FROM products WHERE id_product = ?', param, (err, rows) => {
		if (!err) {
			row.id_product = rows[0].id_product;
			row.reference_product = rows[0].reference_product;
			row.name_product = rows[0].name_product;
			row.price_wt_product = rows[0].price_wt_product;
			row.description_product = rows[0].description_product;
			row.id_supplier = rows[0].id_supplier;
			row.id_category = rows[0].id_category;
			message = "Modification(s) Enregistrée(s)"
		} else {
			row.reference_product = "Erreur produit";
			row.name_product = "Erreur nom";
			row.price_wt_product = "Erreur prix";
			row.description_product = "Erreur description";
			row.id_supplier = "Erreur fournisseur";
			row.id_category = "Erreur catégorie";
			message = message = 'Erreur -1 : ' + err.code + "-" + err.message;
		}

	}); // End of Query

	let promiseProducts = getProducts(connection);
	promiseProducts.then((products) => {
		let promiseSuppliers = getSuppliers(connection);;
		let promiseCategories = getCategories(connection);
		Promise.all([promiseSuppliers, promiseCategories]).then((suppliersAndCategories) => {
			//console.log(countries);
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('updateProduct.ejs', { message: message, productList: products, supplierList: suppliersAndCategories[0], categoryList: suppliersAndCategories[1], row: row });
		});  /// then
	}) /// then
}); // End of udpateSelection

app.post('/updateProductValidation', (req, res) => {
	let message = "";
	let row = new Array();
	params = [req.body.reference_product, req.body.name_product, req.body.price_wt_product, req.body.description_product, req.body.id_supplier, req.body.id_category, req.body.id_product];

	// Requete d'insertion
	connection.query('UPDATE products SET reference_product = ?, name_product = ?, price_wt_product = ?, description_product = ?, id_supplier = ?, id_category = ? WHERE id_product = ?', params, (err, affected) => {
		// Si KO
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			console.log("OK");
			message = affected.affectedRows + " produit modifié";
		}
		console.log(message)
		let promiseProducts = getProducts(connection);
		promiseProducts.then((products) => {
			let promiseSuppliers = getSuppliers(connection);;
			let promiseCategories = getCategories(connection);
			Promise.all([promiseSuppliers, promiseCategories]).then((suppliersAndCategories) => {
				res.setHeader('Content-Type', 'text/html; charset=utf-8');
				res.render('updateProduct.ejs', { message: message, productList: products, supplierList: suppliersAndCategories[0], categoryList: suppliersAndCategories[1], row: row });
			});  /// then
		}) /// then
	}); /// query

	console.log("Message : " + message);
}); /// post insert validation








/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * SUPPLIER : REDIRECTIONS + CRUD
*/

// REDIRECTIONS

// Redirect to suppliers.ejs with GET Method
app.get('/suppliers', (req, res) => {
	let message = "";
	let promiseCities = getCities(connection);
	let promiseSuppliers = getSuppliers(connection);
	//let promiseSuppliersAndCities = getSuppliersAndCities(connection);
	Promise.all([promiseSuppliers, promiseCities]).then((suppliersAndCities) => {
		//console.log(countries);
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('suppliers.ejs', { message: message, supplierList: suppliersAndCities[0], cityList: suppliersAndCities[1] });
	});  /// then

});


// END OF REDIRECTIONS


/////////////////////////////////////////////////////////////////////////////////
app.post('/insertSupplierValidation', (req, res) => {
	console.log("/insertSupplierValidation");
	let message = "";

	// Insertion dans la BD et récupération des saisies du formulaire
	const params = [req.body.name_supplier, req.body.name_contact_supplier, req.body.bin_supplier, req.body.email_supplier, req.body.phone_supplier, req.body.address_supplier, req.body.id_city];
	// Requete Insertion SQL
	connection.query('INSERT INTO suppliers(name_supplier, name_contact_supplier, bin_supplier, email_supplier, phone_supplier, address_supplier, id_city) VALUES(?, ?, ?, ?, ?, ?, ?)', params, (err, affected) => {
		// SI KO
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {

			console.log("OK");
			message = affected.affectedRows + "Fournisseur(s) ajouté(s)";
		};

		let promiseCities = getCities(connection);
		promiseCities.then((cities) => {
			//console.log(cities);
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('suppliers.ejs', { message: message, supplier: supplier, cityList: cities });
		});  /// then

	});/// Fin de query

	console.log("Message : " + message);
});/// Fin de validation ajout POST


// Vers la page deleteSupplier.ejs
app.get('/deleteSupplier', (req, res) => {
	let promiseSuppliers = getSuppliers(connection);
	promiseSuppliers.then((suppliers) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('deleteSupplier.ejs', { supplierList: suppliers, message: "" });
	}); /// then
}); /// deleteService


// Validation of suppression with SELECT
app.post('/deleteSupplierValidation', (req, res) => {
	// Suppression into Database
	let message = "";
	// Retrieve datas from form id'd by id_supplier
	const param = req.body.id_supplier;
	// Requete de suppression
	connection.query('DELETE FROM suppliers WHERE id_supplier = ?', param, (err, affected) => {
		if (err) {
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			message = affected.affectedRows + " fournisseur supprimé";
		}

		let promiseCities = getCities(connection);
		let promiseSuppliers = getSuppliers(connection);
		//let promiseSuppliersAndCities = getSuppliersAndCities(connection);
		Promise.all([promiseSuppliers, promiseCities]).then((suppliersAndCities) => {
			//console.log(countries);
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('suppliers.ejs', { message: message, supplierList: suppliersAndCities[0], cityList: suppliersAndCities[1] });
		});  /// then
	}); /// query
}); /// post suppression validation


// To page udpateSupplier.ejs
app.get('/updateSupplier', (req, res) => {
	let message = "";
	let row = {
		"id_supplier": "",
		"name_supplier": "",
		"name_contact_supplier": "",
		"bin_supplier": "",
		"email_supplier": "",
		"phone_supplier": "",
		"address_supplier": "",
		"name_city": ""
	};

	let promiseSuppliers = getSuppliers(connection);
	promiseSuppliers.then((suppliers) => {
		let promiseCities = getCities(connection);
		promiseCities.then((cities) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('updateSupplier.ejs', { message: message, supplierList: suppliers, cityList: cities, row: row });
		})  /// then
	}); /// then 
}); // Update cleaningAgent

/*
* After selection for Update
*/
app.get('/updateSelectionSupplier', (req, res) => {
	let message = "";
	const param = req.query.id_supplier;
	let row = {
		"id_supplier": "",
		"name_supplier": "",
		"name_contact_supplier": "",
		"bin_supplier": "",
		"email_supplier": "",
		"phone_supplier": "",
		"address_supplier": "",
		"name_city": ""
	};;

	connection.query('SELECT * FROM suppliers WHERE id_supplier = ?', param, (err, rows) => {
		if (!err) {
			row.id_supplier = rows[0].id_supplier;
			row.name_supplier = rows[0].name_supplier;
			row.name_contact_supplier = rows[0].name_contact_supplier;
			row.bin_supplier = rows[0].bin_supplier;
			row.email_supplier = rows[0].email_supplier;
			row.phone_supplier = rows[0].phone_supplier;
			row.address_supplier = rows[0].address_supplier;
			row.name_city = rows[0].name_city;
			message = "Modification(s) Enregistrée(s)"
		} else {
			row.id_supplier = "Erreur id";
			row.name_supplier = "Erreur nom";
			row.name_contact_supplier = "Erreur nom";
			row.bin_supplier = "Erreur SIRET";
			row.email_supplier = "Erreur email";
			row.phone_supplier = "Erreur téléphone";
			row.address_supplier = "Erreur adresse";
			row.name_city = "Erreur Ville";
			message = message = 'Erreur -1 : ' + err.code + "-" + err.message;
		}
	}); // End of Query

	let promiseSuppliers = getSuppliers(connection);
	promiseSuppliers.then((suppliers) => {
		let promiseCities = getCities(connection);
		promiseCities.then((cities) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('updateSupplier.ejs', { message: message, supplierList: suppliers, cityList: cities, row: row });
		})  /// then
	}); /// then 
}); // End of udpateCleaningAgentSelection

app.post('/updateSupplierValidation', (req, res) => {
	let message = "";
	let row = new Array();
	params = [req.body.name_supplier, req.body.name_contact_supplier, req.body.bin_supplier, req.body.email_supplier, req.body.phone_supplier, req.body.address_supplier, req.body.name_city, req.body.id_supplier];

	// Requete d'insertion
	connection.query('UPDATE suppliers s, cities c SET s.name_supplier = ?, s.name_contact_supplier = ?, s.bin_supplier= ?, s.email_supplier = ?, s.phone_supplier = ?, s.address_supplier = ?, c.name_city = ? WHERE id_supplier = ?', params, (err, affected) => {
		// Si KO
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			console.log("OK");
			message = affected.affectedRows + " fournisseur modifié";
		}
		console.log(message)
		let promiseSuppliers = getSuppliers(connection);
		promiseSuppliers.then((suppliers) => {
			let promiseCities = getCities(connection);
			promiseCities.then((cities) => {
				res.setHeader('Content-Type', 'text/html; charset=utf-8');
				res.render('updateSupplier.ejs', { message: message, supplierList: suppliers, cityList: cities, row: row });
			})  /// then
		}); /// then 
	}); /// query

	console.log("Message : " + message);
}); /// post insert validation










/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * SERVICES : REDIRECTIONS + CRUD
*/

// REDIRECTIONS

// Redirect to services.ejs with GET Method
app.get('/services', (req, res) => {
	let message = "";
	// Use of promise defined at the begining of the app.js
	let promiseServicesAndUsers = getServicesAndUsers(connection);
	promiseServicesAndUsers.then((servicesAndUser) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('services.ejs', { message: message, serviceList: servicesAndUser });
	});
}); /// get


// Vers la page InsertUser.ejs du GET
app.get('/insertUser', (req, res) => {
	let promiseUsers = getUsers(connection);
	promiseUsers.then((users) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('insertUser.ejs', { userList: users, message: "" });
	}); /// then
});


app.get('/navbar', (req, res) => {
	let message = "";
	// Connexion to services table in order to display the services on the main services page
	connection.query('SELECT * FROM `services` INNER JOIN `users` ON services.id_user = users.id_user ', function (err, rows) {
		if (err) {
			message = "Extraction KO";
			rows = new Array();
		}
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render(__dirname + '/views/navbar.ejs', { service: rows, message: message });
	});
});

// END OF REDIRECTIONS


// Validation de l'ajout du POST
app.post('/insertUserValidation', (req, res) => {
	console.log("/insertUserValidation");
	let message = "";
	let user = new Array();

	// Insertion dans la BD et récupération des saisies du formulaire
	// Requete Insertion SQL
	const params = [req.body.name_user, req.body.firstname_user, req.body.email_user, req.body.password_user];
	connection.query('INSERT INTO `users`(name_user, firstname_user, email_user, password_user) VALUES(?, ?, ?, ?)', params, (err, affected) => {
		// SI KO
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.message;
			console.log(message);
		}
		else {
			console.log("OK");
			message = affected.affectedRows + "Utilisateur(s) ajouté(s)";
			console.log(message);
		}
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('insertUser.ejs', { message: message, user: user });
	});/// Fin de query
});/// Fin de validation ajout POST


//////////////////////////////////////////////////////////////////////////////////

// Vers la page DeleteUser.ejs du GET
app.get('/deleteUser', (req, res) => {
	let promiseUsers = getUsers(connection);
	promiseUsers.then((users) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('deleteUser.ejs', { userList: users, message: "" });
	}); /// then
});

// Validation de la suppression
app.post('/deleteUserValidation', (req, res) => {
	console.log("/deleteUserValidation");
	let message = "";
	// Retrieve datas from form
	const param = req.body.id_user;
	console.log(req.body);
	// Request Delete
	connection.query('DELETE FROM users WHERE id_user = ?', param, (err, affected) => {
		//Si KO
		if (err) {
			message = 'Erreur -1 : ' + err.message;
			console.log(message);
		}
		else {
			console.log("OK");
			message = affected.affectedRows + "utilisateur(trice) supprimé(e)";
		}

		let promiseUsers = getUsers(connection);
		promiseUsers.then((users) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('insertUser.ejs', { userList: users, message: "" });
		}); /// then
	});/// Fin de query
}); /// fin de validation suppression


// To page udpateUser.ejs
app.get('/updateUser', (req, res) => {
	let message = "";
	let row = {
		"id_user": "",
		"name_user": "",
		"firstname_user": "",
		"email_user": "",
		"password_user": ""
	};

	let promiseUsers = getUsers(connection);
	promiseUsers.then((users) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('updateUser.ejs', { message: message, userList: users, row: row });
	}) /// then
}); // Update product

/*
* After selection for Update
*/
app.get('/updateSelectionUser', (req, res) => {
	let message = "";
	const param = req.query.id_user;

	let row = {
		"id_user": "",
		"name_user": "",
		"firstname_user": "",
		"email_user": "",
		"password_user": ""
	};

	connection.query('SELECT * FROM users WHERE id_user = ?', param, (err, rows) => {
		if (!err) {
			row.id_user = rows[0].id_user;
			row.name_user = rows[0].name_user;
			row.firstname_user = rows[0].firstname_user;
			row.email_user = rows[0].email_user;
			row.password_user = rows[0].password_user;
			message = "Modification(s) Enregistrée(s)"
		} else {
			row.id_user = "Erreur ID";
			row.name_user = "Erreur nom";
			row.firstname_user = "Erreur prénom";
			row.email_user = "Erreur email";
			row.password_user = "Erreur mot de passe";
			message = message = 'Erreur -1 : ' + err.code + "-" + err.message;
		}
	}); // End of Query

	let promiseUsers = getUsers(connection);
	promiseUsers.then((users) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('updateUser.ejs', { message: message, userList: users, row: row });
	}) /// then
}); // End of udpateSelection

app.post('/updateUserValidation', (req, res) => {
	let message = "";
	let row = new Array();
	params = [req.body.name_user, req.body.firstname_user, req.body.email_user, req.body.password_user, req.body.id_user];

	// Requete d'insertion
	connection.query('UPDATE users SET name_user = ?, firstname_user = ?, email_user = ?, password_user = ? WHERE id_user = ?', params, (err, affected) => {
		// Si KO
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			console.log("OK");
			message = affected.affectedRows + " utilisateur modifié";
		}
		console.log(message)
		let promiseUsers = getUsers(connection);
		promiseUsers.then((users) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('updateUser.ejs', { message: message, userList: users, row: row });
		}) /// then
	}); /// query

	console.log("Message : " + message);
}); /// post insert validation

//////////////////////////////////////////////////////////////////////////////////

// Vers la page InsertService.ejs du GET
app.get('/insertService', (req, res) => {
	connection.query('SELECT * FROM `users`', (err, rows) => {
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.message;
			console.log(message);
			rows = new Array();
		}

		console.log("/insertService");
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render(__dirname + '/views/insertService.ejs', { message: "", user: rows });
	});


});


// Validation de l'ajout du POST
app.post('/insertServiceValidation', (req, res) => {
	console.log("/insertServiceValidation");
	let message = "";
	let user = new Array();


	// Insertion dans la BD et récupération des saisies du formulaire
	// Requete Insertion SQL
	const params = [req.body.name_service, req.body.id_user];
	connection.query('INSERT INTO `services`(name_service, id_user) VALUES(?, ?)', params, (err, affected) => {
		// SI KO
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.message;
			console.log(message);
		}
		else {
			console.log("OK");
			message = affected.affectedRows + "Service(s) ajouté(s)";
			console.log(message);
		}

		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('InsertService.ejs', { user: user, message: message });
	});/// Fin de query
});/// Fin de validation ajout POST

// Vers la page deleteServices.ejs
app.get('/deleteService', (req, res) => {
	let promiseServices = getServices(connection);
	promiseServices.then((services) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('deleteService.ejs', { serviceList: services, message: "" });
	}); /// then
}); /// deleteService


// Validation of suppression with SELECT
app.post('/deleteServiceValidation', (req, res) => {
	// Suppression into Database
	let message = "";
	// Retrieve datas from form id'd by id_service
	const param = req.body.id_service;
	// Requete de suppression
	connection.query('DELETE FROM services WHERE id_service = ?', param, (err, affected) => {
		if (err) {
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			message = affected.affectedRows + " service suprimée";
		}

		let promiseServices = getServices(connection);
		promiseServices.then((services) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('services.ejs', { serviceList: services, message: "" });
		}); /// then
	}); /// query
}); /// post suppression validation


// To page udpateServcice.ejs
app.get('/updateService', (req, res) => {
	let message = "";
	let row = {
		"id_service": "",
		"name_service": "",
		"id_user": ""
	};

	let promiseServices = getServices(connection);
	promiseServices.then((services) => {
		let promiseUsers = getUsers(connection);
		promiseUsers.then((users) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('updateService.ejs', { message: message, serviceList: services, userList: users, row: row });
		})  /// then
	}); /// then 
}); // Update cleaningAgent

/*
* After selection for Update
*/
app.get('/updateSelectionService', (req, res) => {
	let message = "";
	const param = req.query.id_service;

	let row = {
		"id_service": "",
		"name_service": "",
		"id_user": ""
	};
	connection.query('SELECT * FROM services WHERE id_service = ?', param, (err, rows) => {
		if (!err) {
			row.id_service = rows[0].id_service;
			row.name_service = rows[0].name_service;
			row.id_user = rows[0].id_user;
			message = "Modification(s) Enregistrée(s)"
		} else {
			row.id_service = "Erreur produit";
			row.name_service = "Erreur nom";
			row.id_user = "Erreur fournisseur";
			message = message = 'Erreur -1 : ' + err.code + "-" + err.message;
		}
	}); // End of Query

	let promiseServices = getServices(connection);
	promiseServices.then((services) => {
		let promiseUsers = getUsers(connection);
		promiseUsers.then((users) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('updateService.ejs', { message: message, serviceList: services, userList: users, row: row });
		})  /// then
	}); /// then
}); // End of udpateCleaningAgentSelection

app.post('/updateServiceValidation', (req, res) => {
	let message = "";
	let row = new Array();
	params = [req.body.name_service, req.body.id_user, req.body.id_service];

	// Requete d'insertion
	connection.query('UPDATE services SET name_service = ?, id_user = ? WHERE id_service = ?', params, (err, affected) => {
		// Si KO
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			console.log("OK");
			message = affected.affectedRows + " Service modifié";
		}
		console.log(message)
		let promiseServices = getServices(connection);
		promiseServices.then((services) => {
			let promiseUsers = getUsers(connection);
			promiseUsers.then((users) => {
				res.setHeader('Content-Type', 'text/html; charset=utf-8');
				res.render('updateService.ejs', { message: message, serviceList: services, userList: users, row: row });
			})  /// then
		}); /// then
	}); /// query

	console.log("Message : " + message);
}); /// post insert validation












/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * CLEANING AGENTS : REDIRECTIONS + CRUD
 */

// REDIRECTIONS

// Redirect to cleaningAgents.ejs with GET Method
app.get('/cleaningAgents', (req, res) => {
	let message = "";
	// Connexion to cleaning_agents table in order to display the services on the main services page
	connection.query('SELECT * FROM cleaning_agents', function (err, rows) {
		if (err) {
			message = "Extraction KO";
			rows = new Array();
		}
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render(__dirname + '/views/cleaningAgents.ejs', { cleaningAgentList: rows, message: message });
	});
});

// Redirect to insertCleaningAgent.ejs du GET
app.get('/insertCleaningAgent', (req, res) => {
	console.log("/insertCleaningAgent")
	let message = "";
	let promiseSuppliers = getSuppliers(connection);
	promiseSuppliers.then((suppliers) => {
		//console.log(suppliers);
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('insertCleaningAgent.ejs', { message: message, supplierList: suppliers });
	});  /// then
});


// END OF REDIRECTIONS


// Validation de l'ajout
app.post('/insertCleaningAgentValidation', (req, res) => {
	console.log("/insertCleaningAgentValidation");
	let message = "";

	// Insertion dans la BD
	// Recuperation des saisies du formulaire
	const params = [req.body.reference_cleaning_agent, req.body.name_cleaning_agent, req.body.price_wt_cleaning_agent, req.body.description_cleaning_agent, req.body.id_supplier];

	// Requete d'insertion
	connection.query('INSERT INTO `cleaning_agents`(reference_cleaning_agent, name_cleaning_agent, price_wt_cleaning_agent, description_cleaning_agent, id_supplier) VALUES(?,?,?,?,?)', params, (err, affected) => {
		// Si KO
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			console.log("OK");
			message = affected.affectedRows + " produit d'entretien ajouté";
		}
		console.log(message);
		let promiseSuppliers = getSuppliers(connection);
		promiseSuppliers.then((suppliers) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('insertCleaningAgent.ejs', { message: message, supplierList: suppliers });
		});  /// then

	}); /// query

	console.log("Message : " + message);
}); /// post insert validation


// Vers la page deleteCleaningAgent.ejs
app.get('/deleteCleaningAgent', (req, res) => {
	let promiseCleaningAgents = getCleaningAgents(connection);
	promiseCleaningAgents.then((cleaning_agent) => {
		res.setHeader('Content-Type', 'text/html; charset=utf-8');
		res.render('deleteCleaningAgent.ejs', { cleaningAgentList: cleaning_agent, message: "" });
	}); /// then
}); /// DeleteCleaningAgent


// Validation of suppression with SELECT
app.post('/deleteCleaningAgentValidation', (req, res) => {
	// Suppression into Database
	let message = "";
	let cleaningAgentList = new Array();
	// Retrieve datas from form id'd by id_cleaning_agent
	const param = req.body.id_cleaning_agent;
	// Requete de suppression
	connection.query('DELETE FROM `cleaning_agents` WHERE `id_cleaning_agent` = ?', param, (err, affected) => {
		if (err) {
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			message = affected.affectedRows + " produit d'entretien suprimé";
		}
		let promiseCleaningAgents = getCleaningAgents(connection);
		promiseCleaningAgents.then((cleaning_agent) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('CleaningAgents.ejs', { cleaningAgentList: cleaning_agent, message: "" });
		}); /// then	

	}); /// post suppression validation
});


// To page udpateCleaningAgent.ejs
app.get('/updateCleaningAgent', (req, res) => {
	let message = "";
	let row = {
		"id_cleaning_agent": "",
		"reference_cleaning_agent": "",
		"name_cleaning_agent": "",
		"price_wt_cleaning_agent": "",
		"description_cleaning_agent": "",
		"id_supplier": ""
	};

	let promiseCleaningAgents = getCleaningAgents(connection);
	promiseCleaningAgents.then((cleaningAgents) => {
		let promiseSuppliers = getSuppliers(connection);
		promiseSuppliers.then((suppliers) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('updateCleaningAgent.ejs', { message: message, cleaningAgentList: cleaningAgents, supplierList: suppliers, row: row });
		})  /// then
	}); /// then 
}); // Update cleaningAgent

/*
* After selection for Update
*/
app.get('/updateSelectionCleaningAgent', (req, res) => {
	let message = "";
	const param = req.query.id_cleaning_agent;

	let row = {
		"id_cleaning_agent": "",
		"reference_cleaning_agent": "",
		"name_cleaning_agent": "",
		"price_wt_cleaning_agent": "",
		"description_cleaning_agent": "",
		"id_supplier": ""
	};

	connection.query('SELECT * FROM cleaning_agents WHERE id_cleaning_agent = ?', param, (err, rows) => {
		if (!err) {
			row.id_cleaning_agent = rows[0].id_cleaning_agent;
			row.reference_cleaning_agent = rows[0].reference_cleaning_agent;
			row.name_cleaning_agent = rows[0].name_cleaning_agent;
			row.price_wt_cleaning_agent = rows[0].price_wt_cleaning_agent;
			row.description_cleaning_agent = rows[0].description_cleaning_agent;
			row.id_supplier = rows[0].id_supplier;
			message = "Modification(s) Enregistrée(s)"
		} else {
			row.reference_cleaning_agent = "Erreur produit";
			row.name_cleaning_agent = "Erreur nom";
			row.price_wt_cleaning_agent = "Erreur prix";
			row.description_cleaning_agent = "Erreur description";
			row.id_supplier = "Erreur fournisseur";
			message = message = 'Erreur -1 : ' + err.code + "-" + err.message;
		}
	}); // End of Query

	let promiseCleaningAgents = getCleaningAgents(connection);
	promiseCleaningAgents.then((cleaningAgents) => {
		let promiseSuppliers = getSuppliers(connection);
		promiseSuppliers.then((suppliers) => {
			res.setHeader('Content-Type', 'text/html; charset=utf-8');
			res.render('updateCleaningAgent.ejs', { message: message, cleaningAgentList: cleaningAgents, supplierList: suppliers, row: row });
		})  /// then
	}); /// then 
}); // End of udpateCleaningAgentSelection

app.post('/updateCleaningAgentValidation', (req, res) => {
	let message = "";
	let row = new Array();
	params = [req.body.reference_cleaning_agent, req.body.name_cleaning_agent, req.body.price_wt_cleaning_agent, req.body.description_cleaning_agent, req.body.id_supplier];

	// Requete d'insertion
	connection.query('UPDATE cleaning_agents SET reference_cleaning_agent = ?, name_cleaning_agent = ?, price_wt_cleaning_agent = ?, description_cleaning_agent = ?, id_supplier = ?', params, (err, affected) => {
		// Si KO
		if (err) {
			console.log("KO");
			message = 'Erreur -1 : ' + err.code + "-" + err.message;
		} else {
			console.log("OK");
			message = affected.affectedRows + " produit d'entretien modifié";
		}
		console.log(message)
		let promiseCleaningAgents = getCleaningAgents(connection);
		promiseCleaningAgents.then((cleaningAgents) => {
			let promiseSuppliers = getSuppliers(connection);
			promiseSuppliers.then((suppliers) => {
				res.setHeader('Content-Type', 'text/html; charset=utf-8');
				res.render('updateCleaningAgent.ejs', { message: message, cleaningAgentList: cleaningAgents, supplierList: suppliers, row: row });
			})  /// then
		}); /// then 
	}); /// query

	console.log("Message : " + message);
}); /// post insert validation


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





app.listen(3000);

console.log("Le serveur tourne sur http://localhost:3000");