var mySQL=require("mysql");
var inquirer=require("inquirer");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
});

inquirer.prompt([

    {
      type: "text",
      name: "userInput",
      message: "What is the ID of the product you would like to purchase?",
      
    }
  
  // After the prompt, store the user's response in a variable called location.
  ]).then(function(answer) {
    if(answer.userInput=="POST"){
      post();}    
    else{
      bid();
    }
});
  
function bid(){
  inquirer.prompt([

    {
      type: "input",
      name: "userInput",
      message: "What is your bid?", 
    }
  
  // After the prompt, store the user's response in a variable called location.
  ]).then(function(answer) {
    var bid=answer.userInput;
    connection.query("SELECT HIGH_BID FROM greatBay_db.auction", function(err, res) {
      if (err) throw err; 
      for(let i=0; i<res.length; i++){
        if(res[i].HIGH_BID>bid){
          updateHigh(bid)
        }
        else{
          updateLow()
        }
      }
      // Log all results of the SELECT statement
     
    });
});

}

function updateHigh(bid){
  connection.query("INSERT INTO auction(HIGH_BID) VALUES (res[i].HIGH_BID)", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log(res);
connection.end();
}
};


  