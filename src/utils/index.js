export const countInArray = ( array, item ) => {
	let count = 0;
	for(let i = 0; i < array.length; ++i){
	    if(array[i] === item)
	        count++;
	}
	return count;
}