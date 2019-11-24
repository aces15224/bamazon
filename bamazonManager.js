
var inquirer=require("inquirer");
var mysql = require("mysql");
var answerObject="";

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
    managePrompt()
});



function managePrompt(){
inquirer.prompt([
    {
    type: "list",
    name: "manageInventory",
    message: "What would you like to do?",
    choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
    
  
  // After the prompt, store the user's response in a variable called location.
  ]).then(function(answer) {
   switch(answer.manageInventory){
    case "View Products for Sale":
        viewInventory();
        break;

    case "View Low Inventory":
        viewLowInventory();
        break;
    
    case "Add to Inventory":
        addInventory();
        break;

    case "Add New Product":
        // addProduct();
        console.log("YES")

        break;

   }
  });
}

function viewInventory(){
    connection.query("SELECT * from bamazon_db.products" , function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department: " + res[i].department_name +
           " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity + "\n");
        }
        managePrompt()
   });
}

function viewLowInventory(){
    // var lowInventory= stock_quantity<10;
    connection.query("SELECT * from bamazon_db.products WHERE stock_quantity<10", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department: " + res[i].department_name +
           " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity + "\n");
        }
        managePrompt()
   });
}

function addInventory(){
    inquirer.prompt([
        {
          type: "input",
          name: "inputID",
          message: "What is the ID of the product you would like to manage?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
              return false;
          }
        }
    ]).then(function(answer) {
        // connection.query("SELECT * from bamazon_db.products" , function(err, res) {
        // for(let i=0; i<res.length; i++){

        // }
        // });
        // var answerObject={
        //     itemID:answer.inputID
        // }
        console.log(answerObject)
        connection.query("SELECT * from bamazon_db.products WHERE item_id=" + answer.inputID, function(err, res) {
            for(let i=0; i<res.length; i++){
                console.log(res[i])
            }
    // //    connection.query("INSERT INTO bamazon_db.products.stock_quantity WHERE stock_quantity<10", function(err, res) {

    });
});
}





  