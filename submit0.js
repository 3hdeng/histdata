var waitfor=require('./waitfor.js');
//=require('/c/tools/phantomjs2/examples/waitfor.js');
var url = "http://www.histdata.com/download-free-forex-historical-data/?/metatrader/1-minute-bar-quotes/eurusd/2014";
//var url = phantom.args[0];

var page = require('webpage').create();

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




page.onResourceReceived= function(resource) {
   //application/zip, application/octet-stream 
   console.log(resource.contentType);
   if (resource.contentType && resource.stage === 'end' && resource.contentType.indexOf('application/zip') > -1) {
      console.log(resource);
   }
};



var onready=function(){
   var ret = page.evaluate(function() {
          var arr = document.getElementById("file_down");
          var i = 0;
	 
          if (arr.length > 0){
	   console.log("onready(), get form elem for file_download");
           console.log(arr[i].id);

           if(arr[i].getAttribute('method') == "POST") {		
            arr[i].submit();
            return document.querySelectorAll('form')[0].outerHTML;          
           }
         }
       });
   return ret;
}

page.open(url, function(status) {
   //console.log("why more indent thant the above ?");
   if (status !== 'success') {
      console.log('Unable to access network');
   } else {
	console.log("page.evaluate() to click dnload link");
        
	//waitfor.waitfor(testfix,null,1000);
      var ret= onready();  
      console.log(ret);
   }

   phantom.exit();
});