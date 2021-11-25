const hexRegex=/[0-9A-Fa-f]{6}/g;

function colorPicked(e){ 
    let rgbValue=convertHexToRGBA(e.target.value);
    let hexValue=e.target.value.replace("#", "");

    document.getElementById("hexValue").value=hexValue;
    document.getElementById('hexValue').style.background="white";
    document.getElementById('hexValue').style.color="black";

    document.getElementById("rvalue").value=rgbValue[0];
    document.getElementById("gvalue").value=rgbValue[1];
    document.getElementById("bvalue").value=rgbValue[2];


}

var copyToClip=function(id){
	let copy_text_val= document.getElementById(id).select();
    let val='#'+copy_text_val;
    document.execCommand("copy",val);
}

var colorInputChanged=function(e){
    if(hexRegex.test(e.target.value)) {
        let value='#'+e.target.value;
        document.getElementById("colorPicker").value=value;
        document.getElementById('hexValue').style.background="white";
        document.getElementById('hexValue').style.color="black";
    } else{
        document.getElementById('hexValue').style.background="#f40808ad";
        document.getElementById('hexValue').style.color="white";
    }
}

// Convertor functions

function convertHexToRGBA(colorHex) {
    let hex = colorHex.replace("#", "");
    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
    }
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    return [r,g,b];
  }
  
document.getElementById("colorPicker")?.addEventListener('input',colorPicked)
document.getElementById("hexValue")?.addEventListener('input',colorInputChanged)
document.getElementById("hexCopyIcon")?.addEventListener('click',copyToClip.bind(event,'hexValue'));