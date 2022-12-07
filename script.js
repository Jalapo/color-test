var mode = 'HSL'; // 'HSL' or 'RGB'
var modeButton;

var hsl = {DOM:null,inputs:null,spans:null,values:[0,50,50]};
var rgb = {DOM:null,inputs:null,spans:null,values:[191,64,64]};
var colorScreen;


run();
//window.onload = run();

function run() {
    populateApp();

    modeButton = document.querySelector("#swap_colorspace");
    hsl.DOM = document.querySelector("#hsl");
    hsl.inputs = hsl.DOM.getElementsByTagName("input");
    hsl.spans = hsl.DOM.getElementsByTagName("span");

    rgb.DOM = document.querySelector("#rgb");
    rgb.inputs = rgb.DOM.getElementsByTagName("input");
    rgb.spans = rgb.DOM.getElementsByTagName("span");

    colorScreen = document.querySelector("#color");
    colorScreen.style.backgroundColor = `hsl(${hsl.values[0]},${hsl.values[1]}%,${hsl.values[2]}%)`;

    // setup slider input update events
    for (let i = 0; i < 3; i++) {
        hsl.inputs[i].addEventListener("input", ()=>{inputFunc(i)});
        rgb.inputs[i].addEventListener("input", ()=>{inputFunc(i)});
    }
    // swap color mode on button click
    modeButton.addEventListener("click", swapMode);

    // handle slider inputs
    function inputFunc(i /* = iterator */) {
        switch (mode) {
            case 'HSL':
                // change stored array value to user inputted value
                hsl.values[i] = hsl.inputs[i].value;
                // change displayed value under slider
                hsl.spans[i].innerHTML = hsl.values[i];
                // change background color to new color
                colorScreen.style.backgroundColor = `hsl(${hsl.values[0]}, ${hsl.values[1]}%, ${hsl.values[2]}%)`;
                rgb.values = colorScreen.style.backgroundColor.split("(")[1].split(")")[0].split(", ");
                for (let i = 0; i < 3; i++) rgb.values[i]=rgb.values[i].toString();
                break;
            case 'RGB':
                // change stored array value
                rgb.values[i] = rgb.inputs[i].value;
                // change displayed value under slider
                rgb.spans[i].innerHTML = rgb.values[i];
                // change background color to new color
                colorScreen.style.backgroundColor = `rgb(${rgb.values[0]}, ${rgb.values[1]}, ${rgb.values[2]})`;
                break;
        }
        var metaThemeColor = document.querySelector("meta[name=theme-color]");
        metaThemeColor.setAttribute("content", colorScreen.style.backgroundColor);
    }
}

function swapMode() {
    modeButton.style.animation = "animateButton 1.2s ease";
    setTimeout(()=>{modeButton.style.animation = "none"}, 1000);
    // if (ev.button!=1) return ''; // early return if middle mouse button is pressed
    switch (mode) {
        // swap to RGB mode
        case 'HSL':
            // shift 'hsl' DOM out & 'rgb' DOM in
            hsl.DOM.style.animationName = 'shiftOut';
            rgb.DOM.style.animationName = 'shiftIn';
            // update input and span values
            for (let i=0;i<3;i++){
                rgb.inputs[i].value = rgb.values[i];
                rgb.spans[i].innerHTML = rgb.values[i];
            }
            mode = 'RGB';
            document.querySelector("#swap_colorspace").innerHTML = 'HSL';
            break;
            // swap to HSL mode
        case 'RGB':
            // convert RGB values to HSL and store them
            hsl.values = rgbToHSL(rgb.values);
            // shift 'rgb' DOM out & 'hsl' DOM in
            hsl.DOM.style.animationName = 'shiftIn';
            rgb.DOM.style.animationName = 'shiftOut';
            // update input and span values
            for (let i=0;i<3;i++){
                hsl.inputs[i].value = hsl.values[i];
                hsl.spans[i].innerHTML = Math.round(hsl.values[i]);
            }
            mode = 'HSL';
            document.querySelector("#swap_colorspace").innerHTML = 'RGB';
            break;
    }
}

function populateApp() {
    document.body.innerHTML += "<button id='swap_colorspace'>RGB</button>"
    + "<div class='buttons' id='hsl'>"
        +"<div class='btn'>"
            +"<input type='range' min='0' max='360' value='0' class='slider'>"
            +"<div>Hue: <span>0</span></div>"
        +"</div>"
        +"<div class='btn'>"
            +"<input type='range' min='0' max='100' value='50' class='slider'>"
            +"<div>Saturation: <span>50</span></div>"
        +"</div>"
        +"<div class='btn'>"
            +"<input type='range' min='0' max='100' value='50' class='slider'>"
            +"<div>Lightness: <span>50</span></div>"
        +"</div>"
    +"</div>"
    +"<div class='buttons' id='rgb'>"
        +"<div class='btn'>"
            +"<input type='range' min='0' max='255' value='191' class='slider'>"
            +"<div>Red: <span>191</span></div>"
        +"</div>"
        +"<div class='btn'>"
            +"<input type='range' min='0' max='255' value='64' class='slider'>"
            +"<div>Green: <span>64</span></div>"
        +"</div>"
        +"<div class='btn'>"
            +"<input type='range' min='0' max='255' value='64' class='slider'>"
            +"<div>Blue: <span>64</span></div>"
        +"</div>"
    +"</div>"
}


function rgbToHSL(rgb) {
	const r = rgb[0] / 255;
	const g = rgb[1] / 255;
	const b = rgb[2] / 255;
	const min = Math.min(r, g, b);
	const max = Math.max(r, g, b);
	const delta = max - min;
	let h;
	let s;

	if (max === min) {
		h = 0;
	} else if (r === max) {
		h = (g - b) / delta;
	} else if (g === max) {
		h = 2 + (b - r) / delta;
	} else if (b === max) {
		h = 4 + (r - g) / delta;
	}

	h = Math.min(h * 60, 360);

	if (h < 0) {
		h += 360;
	}

	const l = (min + max) / 2;

	if (max === min) {
		s = 0;
	} else if (l <= 0.5) {
		s = delta / (max + min);
	} else {
		s = delta / (2 - max - min);
	}

	return [h, s * 100, l * 100];
};