var myutil=require('./myutil.js');

var arr=["/a/folder/.file.a.ext",
"/a/folder/.file.ext",
"/a/folder/.file",
"/a/folder/.fil",
"a/folder/.file..a.." ];

for (var i = 0; i < arr.length; i++) {
	console.log("\n\n================");
	console.log(myutil.filename(arr[i]));
	console.log(myutil.basename(arr[i]));	
}