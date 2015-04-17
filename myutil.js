function getfilename(path) {
	return path.split(/[\\/]/).pop();
}

function getbasename(path) {
   var base = new String(path).substring(path.lastIndexOf('/') + 1); 
    var pos=base.lastIndexOf(".");
    if(pos != -1)       
        base = base.substring(0, pos);
   return base;
}

function objToString (obj) {
    var str = '';
    for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
            str += p + '=' + obj[p] + '&';
        }
    }
    if(str.length>0) //rm the last &
	str=str.substr(0, str.length-1);
    return str;
}

module.exports = {
    filename: getfilename,
    basename: getbasename,
    objToString:objToString
};