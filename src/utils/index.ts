export const countInArray = ( array:any[], item:any ) => {
	let count = 0;
	for(let i = 0; i < array.length; ++i){
	    if(array[i] === item)
	        count++;
	}
	return count;
}

// из теоретической части
export function setCookie(name:string, value:string, props?:{ [key:string]:any }) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name:string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

// according to https://stackoverflow.com/questions/4639716/dot-dotdot-dotdotdot-as-loading
export const dots = window.setInterval(
  function() {
    const wait = document.getElementById("wait");
    if ( wait !== null ) {
      if ( wait.innerHTML.length > 2 ) 
          wait.innerHTML = "";
      else 
          wait.innerHTML += ".";
    }
  }, 300);

// форматирование числительных 
export function numberWithSpaces(x:(string|number)) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}