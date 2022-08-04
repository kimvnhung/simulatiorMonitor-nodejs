var express = require('express');
var XMLHttpRequest = require('xhr2');
var router = express.Router();

var initObject = [];

refresh();

/* GET home page. */
router.get('/', function(req, res, next) {
  refresh()
  res.render('index',initObject);
});

function refresh(){
  updateBalance();
  updateTotalGain();
  updateTotalLost();
  updateTopPnl();
  updateTopRoe();
  updateOrders();
  updatePositions();
}

var host = "https://binanceapi-go.herokuapp.com"

function updateBalance() {
  //update balance
  var xmlhttp = new XMLHttpRequest();
  var url = host+"/v1/getBalance";
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  var rs = JSON.parse(xmlhttp.responseText)
  initObject.push({totalBalance : rs.balance})
}

function updateTotalGain() {
  //update totalGain
  var xmlhttp = new XMLHttpRequest();
  var url = host+"/v1/getTotalGain"
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  var rs = JSON.parse(xmlhttp.responseText)
  initObject.push({totalGain : rs.totalGain})
}

function updateTotalLost() {
  //update totalLost
  var xmlhttp = new XMLHttpRequest();
  var url = host+"/v1/getTotalLost"
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  var rs = JSON.parse(xmlhttp.responseText)
  initObject.push({totalLost : rs.totalLost})
}

function updateTopPnl(){
  //update topPnl
  var xmlhttp = new XMLHttpRequest();
  var url = host+"/v1/getTopPnl"
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  var rs = JSON.parse(xmlhttp.responseText)
  initObject.push({topPnl : rs.topPnl})
}

function updateTopRoe() {
  //update topRoe
  var xmlhttp = new XMLHttpRequest();
  var url = host+"/v1/getTopRoe"
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  var rs = JSON.parse(xmlhttp.responseText)
  initObject.push({topRoe : rs.topRoe})
}

function updatePositions() {
  //update positions
  var xmlhttp = new XMLHttpRequest();
  var url = host+"/v1/getPositions"
  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  var rs = JSON.parse(xmlhttp.responseText)
  initObject.push({positions : rs.positions})
}

function updateOrders() {
  //update orders
  var xmlhttp = new XMLHttpRequest();
  var url = host+"/v1/getOrders"
  xmlhttp.open("GET", url, false);
  xmlhttp.send();

  var rs = JSON.parse(xmlhttp.responseText)
  initObject.push({orders : rs.orders})
}

// setInterval(updateView,10000)

module.exports = router;
