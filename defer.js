window.onload=()=>{document['head'].innerHTML+="<link rel='stylesheet' href='style.css' />";
/*document.body.innerHTML+="<script type='text/javascript' src='script.js'></script>"*/
let xhr=new XMLHttpRequest();xhr.open("GET","/script.js");xhr.onload=(ev)=>
{let s = document.createElement("script");s.innerHTML=xhr.responseText;
document.body.append(s);
}
xhr.send();
};
