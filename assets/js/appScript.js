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

function HEXtoHSL(hex) {
    hex = hex.replace(/#/g, '');
    if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (!result) {
        return null;
    }
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
        case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
        case g:
            h = (b - r) / d + 2;
            break;
        case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
    }
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return {
        h: h,
        s: s,
        l: l
    };
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }
//Calling Required Functions

var copyToClip=function(id){
	let copy_text_val= document.getElementById(id);
    copy_text_val.select();
    let val='#'+copy_text_val;
    document.execCommand("copy",val);
}

//Hex Input Event Handelers 
function colorPicked(e){ 
    let value= e?.target?.value || e;
    let rgbValue=convertHexToRGBA(value);
    let hslValue=HEXtoHSL(value)
    let hexValue=value.replace("#", "");
    document.getElementById("colorPicker").value=value;
    document.getElementById("hexValue").value=hexValue;
    document.getElementById('hexValue').style.background="white";
    document.getElementById('hexValue').style.color="black";

    document.getElementById("rvalue").value=rgbValue[0];
    document.getElementById("gvalue").value=rgbValue[1];
    document.getElementById("bvalue").value=rgbValue[2];

    document.getElementById("hvalue").value=hslValue["h"];
    document.getElementById("svalue").value=hslValue["s"];
    document.getElementById("lvalue").value=hslValue["l"];

    document.getElementById("lock").style.display="none";
    document.getElementById("unlock").style.display="inline";

    document.getElementById("rgbStringValue").value=`rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
    document.getElementById("hslStringValue").value=`hsl(${hslValue["h"]},${hslValue["s"]}%,${hslValue["l"]}%)`;
    document.getElementById("colorResult").style.background=`hsl(${hslValue["h"]},${hslValue["s"]}%,${hslValue["l"]}%)`;
    
}

var colorInputChanged=function(e){
    if(hexRegex.test(e.target.value)) {
        let rgbValue=convertHexToRGBA(e.target.value);
        let hslValue=HEXtoHSL(e.target.value)
        let value='#'+e.target.value;
        document.getElementById("colorPicker").value=value;
        document.getElementById("rvalue").value=rgbValue[0];
        document.getElementById("gvalue").value=rgbValue[1];
        document.getElementById("bvalue").value=rgbValue[2];

        document.getElementById("hvalue").value=hslValue["h"];
        document.getElementById("svalue").value=hslValue["s"];
        document.getElementById("lvalue").value=hslValue["l"];

        document.getElementById('hexValue').style.background="white";
        document.getElementById('hexValue').style.color="black";

        document.getElementById("lock").style.display="none";
        document.getElementById("unlock").style.display="inline";

        document.getElementById("rgbStringValue").value=`rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
        document.getElementById("hslStringValue").value=`hsl(${hslValue["h"]},${hslValue["s"]}%,${hslValue["l"]}%)`;
        document.getElementById("colorResult").style.background=`hsl(${hslValue["h"]},${hslValue["s"]}%,${hslValue["l"]}%)`;
        
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
    let hslValue= HEXtoHSL(rgbTohex(R,G,B));
    document.getElementById("hexValue").value=convertedvalue.replace("#","");
    document.getElementById('hexValue').style.background="white";
    document.getElementById('hexValue').style.color="black";
    document.getElementById("colorPicker").value=convertedvalue;
    document.getElementById("hvalue").value=hslValue["h"];
    document.getElementById("svalue").value=hslValue["s"];
    document.getElementById("lvalue").value=hslValue["l"];    

    document.getElementById("lock").style.display="none";
    document.getElementById("unlock").style.display="inline";

    document.getElementById("rgbStringValue").value=`rgb(${R},${G},${B})`;
    document.getElementById("hslStringValue").value=`hsl(${hslValue["h"]},${hslValue["s"]}%,${hslValue["l"]}%)`;
    document.getElementById("colorResult").style.background=`hsl(${hslValue["h"]},${hslValue["s"]}%,${hslValue["l"]}%)`;
  }

//HSL Input Event Handelers 
function hslColor(){
    let h= (0<=parseInt(document.getElementById('hvalue').value)<360) ? parseInt(document.getElementById('hvalue').value) : 0;
    let s=(0<=parseInt(document.getElementById('svalue').value)<=100) ? parseInt(document.getElementById('svalue').value) : 0;
    let l=(0<=parseInt(document.getElementById('lvalue').value)<=100) ? parseInt(document.getElementById('lvalue').value) : 0;
    h=(0<=h && h<360) ? h : 0;
    s=(0<=s && s<100) ? s : 0;
    l=(0<=l && l<100) ? l : 0;

    let hexValue= hslToHex(h,s,l);
    let rgbValue=convertHexToRGBA(hexValue);

    document.getElementById("hexValue").value=hexValue.replace("#","");
    document.getElementById("colorPicker").value=hexValue;
    document.getElementById("rvalue").value=rgbValue[0];
    document.getElementById("gvalue").value=rgbValue[1];
    document.getElementById("bvalue").value=rgbValue[2];

    document.getElementById("lock").style.display="none";
    document.getElementById("unlock").style.display="inline";

    document.getElementById("rgbStringValue").value=`rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
    document.getElementById("hslStringValue").value=`hsl(${h},${s}%,${l}%)`;
    document.getElementById("colorResult").style.background=hexValue;
}


document.getElementById("colorPicker")?.addEventListener('input',colorPicked);
document.getElementById("hexValue")?.addEventListener('input',colorInputChanged);
document.getElementById("hexCopyIcon")?.addEventListener('click',copyToClip.bind(event,'hexValue'));

document.getElementById("rvalue")?.addEventListener('input',rgbColor);
document.getElementById("gvalue")?.addEventListener('input',rgbColor);
document.getElementById("bvalue")?.addEventListener('input',rgbColor);
document.getElementById("rgbCopyIcon")?.addEventListener('click',copyToClip.bind(event,'hexValue'));

document.getElementById("hvalue")?.addEventListener('input',hslColor);
document.getElementById("svalue")?.addEventListener('input',hslColor);
document.getElementById("lvalue")?.addEventListener('input',hslColor);

chrome.storage.sync.get(['savedColor'], function(color) {
    if(document.getElementById("colorPicker")?.value && color["savedColor"] ){
    let value=color["savedColor"];
    this.colorPicked(value);
    }
    if(document.getElementById("lock")){
    document.getElementById("lock").style.display="inline";
    document.getElementById("unlock").style.display="none";}
    
  });
 function lock(){
    let color=  document.getElementById("colorPicker").value;
    chrome.storage.sync.set({'savedColor':color});
    document.getElementById("lock").style.display="inline";
    document.getElementById("unlock").style.display="none";
 
 }

 function unlock(){
    document.getElementById("unlock").style.display="none";
    document.getElementById("lock").style.display="inline";
 }

 function expand(action){
     switch(action){
         case 'expand':
            document.getElementById("colorResult").style.height="59vh";
            document.getElementById("colorResult").style.transition="all 0.5ms";
            document.getElementById("expand").style.display="none";
            document.getElementById("collapse").style.display="inline";
            break;
         case 'collapse':
            document.getElementById("colorResult").style.height="auto";
            document.getElementById("expand").style.display="inline";
            document.getElementById("collapse").style.display="none";
            break;
        }
     }
     
  document.getElementById("lock")?.addEventListener('click',lock);
  document.getElementById("unlock")?.addEventListener('click',lock);

  document.getElementById("rgbStringcopy")?.addEventListener('click',copyToClip.bind(event,'rgbStringValue'));
  document.getElementById("hslStringcopy")?.addEventListener('click',copyToClip.bind(event,'hslStringValue'));

  document.getElementById("expand")?.addEventListener('click',expand.bind(event,'expand'));
  document.getElementById("collapse")?.addEventListener('click',expand.bind(event,'collapse'));