var url = "http://www.histdata.com/download-free-forex-historical-data/?/metatrader/1-minute-bar-quotes/eurusd/2014";
var waitfor = require('./waitfor.js');
var myutil = require('./myutil.js');


var page = require('webpage').create();

///page.settings.userAgent = "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)";
//===================

page.onConsoleMessage = function(msg) {
   console.log(msg);
}


var loadInProgress = true;

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


var isZipDnloaded = false;

page.onResourceReceived = function(resource) {
   //application/zip, application/octet-stream 
   //console.log(resource.contentType);
   Console.log(resource.header);
   if (resource.contentType && resource.stage === 'end' && resource.contentType.indexOf('application/zip') > -1) {
      console.log(resource);
      isZipDnloaded = true;
   }
};


function postForm(data) {
	console.log("postForm with "+ data);
   var server = 'http://www.histdata.com/get.php';
   //data = 'universe=expanding&answer=42';
   var page2 = require('webpage').create();
   page2.onResourceReceived = function(resource) {
      //application/zip, application/octet-stream   
      Console.log("page2 " + resource.header);
      if (resource.contentType && resource.stage === 'end' && resource.contentType.indexOf('application/zip') > -1) {
         console.log(resource);
         isZipDnloaded = true;
      }
   };

   page.onFileDownload = function(url) {
   console.log("onFileDownload2: " + url);
   return mytutil.basename(url);
}

   page2.onFileDownloadError = function(errorMessage) {
   console.log(errorMessage)
}

page2.onLoadFinished = function(status) {
   console.log('Load2 Finished: ' + status);
   loadInProgress = false;
};


page2.onLoadStarted = function() {
   loadInProgress = true;
   console.log("load2 started");
};

   page2.open(server, 'post', data, function(status) {
      if (status !== 'success') {
         console.log('Unable to post!');
      } else {
         console.log('post success');
	      console.log(page2.content);
      }
      //phantom.exit();
   });
   return;
}

page.open(url, function(status) {
   //console.log("why more indent thant the above ?");
   if (status !== 'success') {
      console.log('Unable to access network');
   } else {

      console.log("page.evaluate() to click dnload link");
      console.log("isZipDnloaded=" + isZipDnloaded);

      var data = page.evaluate(function() {
         console.log("enter page.evaluate()");
         var frm = document.getElementById("file_down");

         if (frm == null) {
            console.log("not found! form file_down not found");
            return null;
         }

         console.log("get form elem with Id file_down");
         console.log(frm.id);

         if (frm.getAttribute('method') == "POST") {
            //frm.submit();
            var kids = frm.childNodes;
            var data = {};
            var kid;
            for (i = 0; i < kids.length; i++) {
               kid = kids[i];
               data[kid.id] = kid.value;
            }
            console.log(JSON.stringify(data));
            console.log("form submitted ... ");
            console.log("setInterval to detect LoadFinished or not ... ");
            return data; //document.querySelectorAll('form')[0].outerHTML;            
         } else return null;

      });

      //console.log(ret);
      postForm(myutil.objToString(data));
   }

   //setTimeout(function() {  phantom.exit();  }, 200);
});

setTimeout(function() {
   var x = 1;
}, 1000);
var interval = setInterval(function() {
   if (!loadInProgress) {
      console.log('this Load shd be finished, how about another one caused by Navigate to ...?');
      clearInterval(interval);
   }
}, 500);