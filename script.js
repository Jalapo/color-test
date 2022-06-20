let color = [0,50,50];

window.onload = () => {
    inputs = document.querySelector(".buttons").getElementsByTagName("input");
    texts = document.querySelector(".buttons").getElementsByTagName("span");
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].addEventListener("input", () => {
            color[i] = inputs[i].value;
            texts[i].innerHTML = color[i];
            document.getElementById("color").style.backgroundColor = `hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`;
            console.log(`hsl(${color[0]}, ${color[1]}%, ${color[2]}%)`);
        })
    }
}
