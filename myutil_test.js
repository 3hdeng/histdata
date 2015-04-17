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

var data={};
	data['k1']='v1';
	data['k2']='v2';
	
var s=myutil.objToString(data);
console.log(s);

phantom.exit();