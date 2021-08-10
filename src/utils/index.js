export const countInArray = ( array, item ) => {
	var count = 0;
	for(var i = 0; i < array.length; ++i){
	    if(array[i] === item)
	        count++;
	}
	return count;
}