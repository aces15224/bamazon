
var inquirer=require("inquirer");
var mysql = require("mysql");
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
        addProduct();
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
          message: "What is the ID of the product you would like to add?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
              return false;
          }
        },
        {
          type: "input",
          name: "quantityID",
          message: "How many units would you like to add?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
              return false;
          }

        }
    ]).then(function(answer) {
      connection.query("SELECT * FROM bamazon_db.products WHERE item_id="+ answer.inputID, function(err, res) {
        for(let i=0; i<res.length; i++){
          answer.quantityID=parseInt(answer.quantityID)+ parseInt(res[i].stock_quantity);       
          connection.query("UPDATE bamazon_db.products SET stock_quantity="+ answer.quantityID +" WHERE item_id=" + answer.inputID, function(err, res) {
            
            viewInventory()
      });
        }
  });
    //       connection.query("UPDATE bamazon_db.products SET stock_quantity=" + newQuantity + "WHERE item_id="+ answer.inputID, function(err, res) {
    //       viewInventory()
    // });
});
}

function addProduct(){
  inquirer.prompt([
    {
    type: "input",
    name: "addName",
    message: "What would you like add?",
    },
    {
    type: "input",
    name: "addDepartment",
    message: "In what department should it be listed ?",
    },
    {
    type: "input",
    name: "addPrice",
    message: "How much does it cost?",
    },
    {
    type: "input",
    name: "addQuantity",
    message: "How many units would you like add?",
    },
  ]).then(function(answer) {
      answer.addPrice=parseInt(answer.addPrice)
      answer.addQuantity=parseInt(answer.addQuantity)    
      connection.query("INSERT INTO bamazon_db.products (product_name, department_name, price, stock_quantity) VALUES ('"+
      answer.addName +"','" + answer.addDepartment +"',"+ answer.addPrice + "," + answer.addQuantity + ")", function(err, res) {
        viewInventory()
  });
});
}


  