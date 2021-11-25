const hexRegex=/[0-9A-Fa-f]{6}/g;

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


function rgbTohex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }  
//Calling Required Functions

var copyToClip=function(id){
	let copy_text_val= document.getElementById(id).select();
    let val='#'+copy_text_val;
    document.execCommand("copy",val);
}

//Hex Input Event Handelers 
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

//RGB Input Event Handelers 
function rgbColor() {
    let R= (0<=parseInt(document.getElementById('rvalue').value)<256) ? parseInt(document.getElementById('rvalue').value) : 0;
    let G=(0<=parseInt(document.getElementById('gvalue').value)<=255) ? parseInt(document.getElementById('gvalue').value) : 0;
    let B=(0<=parseInt(document.getElementById('bvalue').value)<=255) ? parseInt(document.getElementById('bvalue').value) : 0;
    R=(0<=R && R<256) ? R : 0;
    G=(0<=G && G<256) ? G : 0;
    B=(0<=B && B<256) ? B : 0;
    let convertedvalue=rgbTohex(R,G,B);
    document.getElementById("hexValue").value=convertedvalue.replace("#","");
    document.getElementById('hexValue').style.background="white";
    document.getElementById('hexValue').style.color="black";
    document.getElementById("colorPicker").value=convertedvalue;
    
  }



document.getElementById("colorPicker")?.addEventListener('input',colorPicked);
document.getElementById("hexValue")?.addEventListener('input',colorInputChanged);
document.getElementById("hexCopyIcon")?.addEventListener('click',copyToClip.bind(event,'hexValue'));

document.getElementById("rvalue")?.addEventListener('input',rgbColor);
document.getElementById("gvalue")?.addEventListener('input',rgbColor);
document.getElementById("bvalue")?.addEventListener('input',rgbColor);
document.getElementById("rgbCopyIcon")?.addEventListener('click',copyToClip.bind(event,'hexValue'));
