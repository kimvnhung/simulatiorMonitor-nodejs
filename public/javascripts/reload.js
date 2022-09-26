console.log("from reload");

// var socket = io("http://192.168.0.106:3001");
var socket = io();


socket.on('updateBalance', function(balance) {
    console.log("update balance")
    var element = document.getElementById("balance")
    if (isNumber(balance)){
        element.innerText = balance.toFixed(2) + "$";
    }else {
        element.innerText = balance + "$";
    }
    element.style.color = '#000000'
});

socket.on('updateAccount', function(account) {
    console.log("update account")
    var orderCount = document.getElementById("orderCount")
    orderCount.innerText = account.orderCount;
    orderCount.style.color = '#000000'

    var totalFee = document.getElementById("totalFee")
    if (isNumber(account.totalFee)){
        totalFee.innerText = account.totalFee.toFixed(2) + "$";
    }else {
        totalFee.innerText = account.totalFee + "$";
    }
    totalFee.style.color = '#FF0000'
});

socket.on('updateTotalGain', function(totalGain){
    console.log("update totalGain")
    var element = document.getElementById("totalGain")
    if(isNumber(totalGain)){
        element.innerText = totalGain.toFixed(2)+"$";
    }else {
        element.innerText = totalGain+"$";
    }
    element.style.color = '#00FF00'
});

socket.on('updateTotalLost', function(totalLost){
    console.log("update total lost")
    var element = document.getElementById("totalLost")
    if(isNumber(totalLost)){
        element.innerText = totalLost.toFixed(2) + "$";
    }else {
        element.innerText = totalLost + "$";
    }
    element.style.color = '#FF0000'
});

socket.on('updateTopPnl', function(topPnl){
    console.log("update top pnl")
    var element = document.getElementById("topPnl")
    if(isNumber(topPnl)){
        element.innerText = topPnl.toFixed(2) + "$";
    }else {
        element.innerText = topPnl + "$";
    }
    if (topPnl >= 0 ){
        element.style.color = '#00FF00'
    }else{
        element.style.color = '#FF0000'
    }
});

socket.on('updateTopRoe', function(topRoe){
    console.log("update top roe")
    var element = document.getElementById("topRoe")
    if (isNumber(topRoe)){
        element.innerText = topRoe.toFixed(2)+"%";
    }else {
        element.innerText = topRoe+"%";
    }
    if (topRoe >= 0) {
        element.style.color = '#00FF00'
    }else {
        element.style.color = '#FF0000'
    }
});

socket.on('updatePositions', function(positions) {
    console.log("update position")

    var posList = document.getElementById('posList');
    posList.innerHTML = '';
    console.log(positions)
    console.log("positions lenght : "+positions.length);
    for (let i=0;i<positions.length;i++){
        var pos = positions[i];
        console.log(pos);
        posList.appendChild(createPositionElement(pos));
    }
});

socket.on('updateOrders', function(orders){
    console.log("update orders")
    var orderlist = document.getElementById('orderList')
    orderlist.innerHTML = '';
    for (let i=0;i<orders.length;i++) {
        var order = orders[i];
        orderlist.appendChild(createOrderElement(order))
    }
});

function createPositionElement(pos) {
    //h
    var posSide = document.createElement('div');
    posSide.className = 'posSide';
    posSide.innerText = pos.quantity>0?"B":"S"
    if (pos.quantity > 0){
        posSide.style.color = '#00FF00';
    }else {
        posSide.style.color = '#FF0000';
    }

    var posSymbol = document.createElement('div')
    posSymbol.className = 'posSymbol'
    posSymbol.innerText = pos.symbol

    var leverage = document.createElement('div')
    leverage.className = 'leverage'
    leverage.innerText = pos.leverage+"x"

    var h = document.createElement('div')
    h.className = 'h'
    h.appendChild(posSide)
    h.appendChild(posSymbol)
    h.appendChild(leverage)

    //line1
    var titSize = document.createElement('div')
    titSize.className = 'tit'
    titSize.innerText = "Size"

    var valtSize = document.createElement('div')
    valtSize.className = 'valt'
    if(isNumber(pos.amount)){
        valtSize.innerText = pos.quantity.toFixed(2) +"$";
    }else {
        valtSize.innerText = pos.quantity+"$";
    }

    var titPnlRoe = document.createElement('div')
    titPnlRoe.className = 'tit'
    titPnlRoe.innerText = "Pnl/Roe:"

    var valtPnlRoe = document.createElement('div')
    valtPnlRoe.className = 'valt'
    if ( isNumber(pos.pnl) && isNumber(pos.roe)){
        valtPnlRoe.innerText = pos.pnl.toFixed(2)+"$/"+pos.roe.toFixed(2)+"%";
    }else {
        valtPnlRoe.innerText = pos.pnl+"$/"+pos.roe+"%";
    }

    if (pos.pnl > 0){
        valtPnlRoe.style.color = '#00FF00';
    }else {
        valtPnlRoe.style.color = '#FF0000';
    }

    var l1 = document.createElement('div')
    l1.className = 'l'
    l1.appendChild(titSize)
    l1.appendChild(valtSize)
    l1.appendChild(titPnlRoe)
    l1.appendChild(valtPnlRoe)

    //l2
    var titEntryMark = document.createElement('div')
    titEntryMark.className = 'tit'
    titEntryMark.innerText = "Entry/Mark:"

    var valtEntryMark = document.createElement('div')
    valtEntryMark.className = 'valt'
    valtEntryMark.innerText = pos.entryPrice+"/"+pos.markPrice

    var titTPSL  = document.createElement('div')
    titTPSL.className = 'tit'
    titTPSL.innerText = "TP/SL:"

    var valtTPSL = document.createElement('div')
    valtTPSL.className = 'valt'
    valtTPSL.innerText = pos.takeProfitPrice+"/"+pos.stopLostPrice

    var l2 = document.createElement('div')
    l2.className = 'l'
    l2.appendChild(titEntryMark)
    l2.appendChild(valtEntryMark)
    l2.appendChild(titTPSL)
    l2.appendChild(valtTPSL)

    var posItem = document.createElement('div')
    posItem.className = 'pos'
    posItem.appendChild( h)
    posItem.appendChild(l1)
    posItem.appendChild(l2)

    return posItem
}

function createOrderElement(order) {
    //h
    var orderSide = document.createElement('div')
    orderSide.className = 'orderSide'
    orderSide.innerText = order.side

    var orderSymbol = document.createElement('div')
    orderSymbol.className = 'orderSymbol'
    orderSymbol.innerText = order.symbol

    var time = document.createElement('div')
    time.className = 'time'
    time.innerText = order.time.substring(0,19)

    var h = document.createElement('div')
    h.className = 'h'
    h.appendChild(orderSymbol)
    h.appendChild(time)

    //l1
    var orderType = document.createElement('div')
    orderType.className = 'orderType'
    orderType.innerText = order.type.toUpperCase()

    var titAmount = document.createElement('div')
    titAmount.className = 'tit'
    titAmount.innerText = "Amount:"

    var valtAmount = document.createElement('div')
    valtAmount.className = 'valt'
    if (isNumber(order.amount)){
        valtAmount.innerText = order.amount.toFixed(2)+"$";
    }else {
        valtAmount.innerText = order.amount+"$";
    }

    var l1 = document.createElement('div')
    l1.className = 'l'
    l1.appendChild(orderType)
    l1.appendChild(titAmount)
    l1.appendChild(valtAmount)

    //l2
    var titPrice = document.createElement('div')
    titPrice.className = 'tit'
    titPrice.innerText = "Price:"

    var valtPrice = document.createElement('div')
    valtPrice.className = 'valt'
    valtPrice.innerText = order.price

    var l2 = document.createElement('div')
    l2.className = 'l'
    l2.appendChild(titPrice)
    l2.appendChild(valtPrice)

    var order = document.createElement('div')
    order.className = 'order'
    order.appendChild(h)
    order.appendChild(l1)
    order.appendChild(l2)

    return order
}

// program to check if a number is a float or integer value

function isNumber(x) {
    // check if the passed value is a number
    if(typeof x == 'number' && !isNaN(x)){
        // check if it is integer
        return true;
    } else {
        console.log(`${x} is not a number`);
    }
    return false;
}