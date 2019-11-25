
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
    showCase()
});

function showCase(){
    connection.query("SELECT * from bamazon_db.products" , function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log("Item ID: " + res[i].item_id + " || Product Name: " + res[i].product_name + " || Department: " + res[i].department_name +
           " || Price: " + res[i].price + " || Quantity: " + res[i].stock_quantity + "\n");
        }
    customerPrompt(res);
});
}

function customerPrompt(res){
inquirer.prompt([
    {
      type: "input",
      name: "inputID",
      message: "What is the ID of the product you would like to purchase?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      } 
    },
    {
      type: "input",
      name: "inputQuantity",
      message: "How many units would you like to purchase?",
      validate: function(value) {
        if (isNaN(value) === false) {
          return true;
        }
        return false;
      }}

]).then(function(answer) {
      answerObject={
      item_Id: answer.inputID,
      item_Quantity: answer.inputQuantity
    }
    for (var i = 0; i < res.length; i++) {
    if(answerObject.item_Id==res[i].item_id && answerObject.item_Quantity<=res[i].stock_quantity) {
      var inventoryAdjustment=res[i].stock_quantity-answerObject.item_Quantity;
      var total= res[i].price*answerObject.item_Quantity;
        if(inventoryAdjustment>0){
        connection.query("UPDATE bamazon_db.products SET? WHERE?", [{stock_quantity:inventoryAdjustment},{item_id:res[i].item_id}])  
        console.log("SOLD! Your total is:" + "$" + total)
        }
        
  }
    else if(answerObject.item_Id==res[i].item_id && answerObject.item_Quantity>res[i].stock_quantity){
    console.log("Insufficient Quantity!")
    }
 }
    
   showCase(); 
  });  
}




  