const hexRegex=/[0-9A-Fa-f]{6}/g;

function colorPicked(e){ 
    let value=e.target.value.split('#')[1];
    document.getElementById("hexValue").value=value;
    document.getElementById('hexValue').style.background="white";
    document.getElementById('hexValue').style.color="black";
}

var copyToClip=function(id){
	let copy_text_val= document.getElementById(id)
    copy_text_val.select();
    document.execCommand("copy");
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

document.getElementById("colorPicker")?.addEventListener('input',colorPicked)
document.getElementById("hexValue")?.addEventListener('input',colorInputChanged)
document.getElementById("hexCopyIcon")?.addEventListener('click',copyToClip.bind(event,'hexValue'));