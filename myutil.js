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

module.exports = {
    filename: getfilename,
    basename: getbasename	
};