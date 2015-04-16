var url = "http://www.histdata.com/download-free-forex-historical-data/?/metatrader/1-minute-bar-quotes/eurusd/2014";
//var url = phantom.args[0];


var page = require('webpage').create();

page.settings.userAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)";

//= 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';


page.onConsoleMessage = function(msg) {
   console.log(msg);
}

page.onLoadFinished = function(status) {
    console.log('Load Finished: ' + status);
};
page.onLoadStarted = function() {
    console.log('Load Started');
};
page.onNavigationRequested = function(url, type, willNavigate, main) {
    console.log('Trying to navigate to: ' + url);
};


var isZipDnloaded=false;

page.onResourceReceived= function(resource) {
   //application/zip, application/octet-stream 
   console.log(resource.contentType);
   if (resource.contentType && resource.stage === 'end' && resource.contentType.indexOf('application/zip') > -1) {
      console.log(resource);
	   isZipDnloaded=true;
   }
};



page.open(url, function(status) {
   //console.log("why more indent thant the above ?");
   if (status !== 'success') {
      console.log('Unable to access network');
   } else {
	console.log("page.evaluate() to click dnload link");
        	
        page.evaluate(function() {
          var frm = document.getElementById("file_down");
          
     	  if(frm==null) { console.log("not found! form file_down not found");return null;}

	   console.log("get form elem with Id file_down");
           console.log(frm.id);

           if(frm.getAttribute('method') == "POST") {		
            frm.submit();
            return ; //document.querySelectorAll('form')[0].outerHTML;            
           }         
       });
      //console.log(ret);
   }

   //phantom.exit();
});

setTimeout(function() {  var x=1;  }, 200);

var waitfor=require('./waitfor.js');
var onready=function(){
	console.log("isZipDnloaded=" + isZipDnloaded);
	
	}
waitfor.waitfor(function(){
	console.log("isZipDnloaded=" + isZipDnloaded);
	return isZipDnloaded;}, 
	onready, 3000);


setTimeout(function() {  phantom.exit();  }, 200);