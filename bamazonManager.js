
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
      console.log()
   switch(answer.manageInventory){
    case "View Products for Sale":
        console.log("YES")
        // viewInventory();
        break;

    case "View Low Inventory":
            console.log("YES")

        // viewLowInventory();
        break;
    
    case "Add to Inventory":
        // addInventory();
        console.log("YES")

        break;

    case "Add New Product":
        // addProduct();
        console.log("YES")

        break;

   }
  });
}




  