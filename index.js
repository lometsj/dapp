var page_index = 0;
var offset = 10;
var size = 0;
var contract_add = "n1sSi3Nu6g4dpxT6XFyi14BEPnWdjDhPyF4";
var Nebpay = require("nebpay")
var nebpay = new Nebpay();


function init(){
    refresh();
    nebpay.simulateCall(contract_add,"0","len","",{
        qrcode: {
            showQRCode: false
        },
        gods: {
            name: "test",
            desc: "test goods"
        },
        listener: doInit
    });
}

function doInit(resp){
    size = parseInt(resp.result);
    document.getElementById("size").innerHTML = resp.result;
}

function refresh(){
    
    var arr = "[\"" + page_index.toString() + "\",\"" + offset.toString() + "\"]";
    nebpay.simulateCall(contract_add,"0","forEach",arr,{
        qrcode: {
            showQRCode: false
        },
        gods: {
            name: "test",
            desc: "test goods"
        },
        listener: doRe
    });
}

function doRe(resp){
    console.log("callback resp: " + JSON.stringify(resp));
    var arr = resp.result;
    arr = arr.replace(/\\n/g,"<br>");
    console.log("arr:"+arr);
    document.getElementById("p1").innerHTML = arr;
}

function left(){
    page_index -= 10;
    if(page_index < 0){
        page_index = 0;
    }
    refresh();
}

function right(){
    page_index += 10;
    refresh();
}

function query(){
    var title = document.getElementById("q").value;
    var arr = "[\"" + title.toString() + "\"]";
    nebpay.simulateCall(contract_add,"0","get",arr,{
        qrcode: {
            showQRCode: false
        },
        gods: {
            name: "test",
            desc: "test goods"
        },
        listener: doQuery
    })
}

function doQuery(resp){
    console.log("callback resp: " + JSON.stringify(resp))
    result = JSON.parse(resp.result)
    document.getElementById("content").innerHTML = "<h1>" + result.title + "</h1><br>";
    document.getElementById("content").innerHTML += "Description:" + result.description + "<br>";
    document.getElementById("content").innerHTML += "Points:" + result.points + "<br>";
    document.getElementById("content").innerHTML += "url:" + result.url + "<br>";
    //var html = "";
    console.log(result.writeup)
    $(function() {
        var converter = new showdown.Converter();
        var text      = result.writeup;
        html      = converter.makeHtml(text);
        $("#wp").html(html);
    });
    //document.getElementById("wp").innerHTML =  html;        
    
}

function insert(){
    var title = document.getElementById("title").value;
    var des = document.getElementById("des").value;
    var points = document.getElementById("points").value;
    var wp = document.getElementById("wp").value;
    var url = document.getElementById("url").value;
    wp = wp.replace(/\n/g,"\\n") ;
    var arr = "[\"" + title.toString() + "\",\"" + des.toString() + "\",\"" + points.toString() + "\",\"" + wp + "\",\"" + url.toString() +  "\"]";
    nebpay.call(contract_add,"0","save",arr,{
        qrcode: {
            showQRCode: false
        },
        gods: {
            name: "test",
            desc: "test goods"
        },
        listener: doInsert
    })

}

function doInsert(resp){
    console.log("callback resp:" + JSON.stringify(resp))
}

