var url = "http://www.histdata.com/download-free-forex-historical-data/?/metatrader/1-minute-bar-quotes/eurusd/2014";
var waitfor=require('./waitfor.js');
var myutil=require('./myutil.js');


var page = require('webpage').create();

///page.settings.userAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)";

//= 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36';
//=================
phantom.onError = function(msg, trace) {
  var msgStack = ['PHANTOM ERROR: ' + msg];
  if (trace && trace.length) {
    msgStack.push('TRACE:');
    trace.forEach(function(t) {
      msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
    });
  }
  console.error(msgStack.join('\n'));
  phantom.exit(1);
};


//===================

page.onConsoleMessage = function(msg) {
   console.log(msg);
}


var loadInProgress=true;

page.onLoadFinished = function(status) { 
    console.log('Load Finished: ' + status);
   loadInProgress = false;
};


page.onLoadStarted = function() {
  loadInProgress = true;
  console.log("load started");
};





page.onNavigationRequested = function(url, type, willNavigate, main) {
	console.log('Trying to navigate to: ' + url);
	console.log('Caused by: ' + type);
	console.log('Will actually navigate: ' + willNavigate);
	console.log('Sent from the page\'s main frame: ' + main);
};


var isZipDnloaded=false;

page.onResourceReceived= function(resource) {
   //application/zip, application/octet-stream 
   //console.log(resource.contentType);
   Console.log(resource.header);
   if (resource.contentType && resource.stage === 'end' && resource.contentType.indexOf('application/zip') > -1) {
      console.log(resource);
      isZipDnloaded=true;
   }
};

page.onFileDownload = function(url) {
	console.log("onFileDownload: " + url);
    return mytutil.basename(url);
}

page.onFileDownloadError = function(errorMessage) {
    console.log(errorMessage)
}

page.open(url, function(status) {
   //console.log("why more indent thant the above ?");
   if (status !== 'success') {
      console.log('Unable to access network');
   } else {
   
	console.log("page.evaluate() to click dnload link");
	console.log("isZipDnloaded=" + isZipDnloaded);
        
	page.evaluate(function() {
		console.log("enter page.evaluate()");        
		var frm = document.getElementById("file_down");
          
		if(frm==null) { console.log("not found! form file_down not found");return null;}

		console.log("get form elem with Id file_down");
		console.log(frm.id);

		if(frm.getAttribute('method') == "POST") {		
		   frm.submit();
		   console.log("form submitted ... ");
		   console.log("setInterval to detect LoadFinished or not ... ");				
		   return ; //document.querySelectorAll('form')[0].outerHTML;            
              }         
       });
      //console.log(ret);
   }

   //setTimeout(function() {  phantom.exit();  }, 200);
});

setTimeout(function() {  var x=1;  }, 1000);
var interval = setInterval (  function () {
		    if (!loadInProgress)   {
			console.log( 'this Load shd be finished, how about another one caused by Navigate to ...?' );
			clearInterval(interval); 
			  }
	  },   500 );



/*
console.log('after page.open(), wait for data dnloading ...');
setTimeout(function() {  var x=1;  }, 200);

var onready=function(){
	console.log("isZipDnloaded=" + isZipDnloaded);	
	console.log("phantom.exit() has to be placed in the end of event chain");
	setTimeout(function() {  phantom.exit();  }, 200);
	}
waitfor.waitfor(function(){
	console.log("isZipDnloaded=" + isZipDnloaded);
	//console.log("var scope problem");
	return isZipDnloaded;}, 
	onready, 15000);

*/
//setTimeout(function() {  phantom.exit();  }, 200);