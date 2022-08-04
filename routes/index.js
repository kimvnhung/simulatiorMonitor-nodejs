var express = require('express');
const https = require('https');
var router = express.Router();

var initObject = [];
var host = "https://binanceapi-go.herokuapp.com"
// refresh();

/* GET home page. */
router.get('/', function(req, res, next) {
  initObject.push({positions : "[]",orders:"[]"})
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

function updateBalance() {
  const url = host+"/v1/getBalance";
  const request = https.request(url, (response) => {
      response.on('end', () => {
          const rs = JSON.parse(data);
          initObject.push({totalBalance:rs.balance});
      });
  })
    
  request.on('error', (error) => {
      console.log('An error', error);
  });
    
  request.end() 
}

function updateTotalGain() {
  //update totalGain
  const url = host+"/v1/getTotalGain";
  const request = https.request(url, (response) => {
      response.on('end', () => {
          const rs = JSON.parse(data);
          initObject.push({totalGain : rs.totalGain})
      });
  })
    
  request.on('error', (error) => {
      console.log('An error', error);
  });
    
  request.end()
}

function updateTotalLost() {
  //update totalLost
  const url = host+"/v1/getTotalLost";
  const request = https.request(url, (response) => {
      response.on('end', () => {
          const rs = JSON.parse(data);
          initObject.push({totalLost : rs.totalLost})
      });
  })
    
  request.on('error', (error) => {
      console.log('An error', error);
  });
    
  request.end()
}

function updateTopPnl(){
  //update topPnl
  const url = host+"/v1/getTopPnl";
  const request = https.request(url, (response) => {
      response.on('end', () => {
          const rs = JSON.parse(data);
          initObject.push({topPnl : rs.topPnl})
      });
  })
    
  request.on('error', (error) => {
      console.log('An error', error);
  });
    
  request.end()
}

function updateTopRoe() {
  //update topRoe
  const url = host+"/v1/getTopRoe";
  const request = https.request(url, (response) => {
      response.on('end', () => {
          const rs = JSON.parse(data);
          initObject.push({topRoe : rs.topRoe})
      });
  })
    
  request.on('error', (error) => {
      console.log('An error', error);
  });
    
  request.end()
  
}

function updatePositions() {
  //update positions
  const url = host+"/v1/getPositions";
  const request = https.request(url, (response) => {
      response.on('end', () => {
          const rs = JSON.parse(data);
          initObject.push({positions : rs.positions})
      });
  })
    
  request.on('error', (error) => {
      console.log('An error', error);
  });
    
  request.end()
  
}

function updateOrders() {
  //update orders
  const url = host+"/v1/getOrders";
  const request = https.request(url, (response) => {
      response.on('end', () => {
          const rs = JSON.parse(data);
          initObject.push({orders : rs.orders})
      });
  })
    
  request.on('error', (error) => {
      console.log('An error', error);
  });
    
  request.end()
  
}

// setInterval(updateView,10000)



module.exports = router;
