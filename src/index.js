import './style.css'
import Icon from './npmGInstall.png'
import Data from './data.xml'
import printMe from './print.js'

document.getElementById('title').innerHTML='Hello Webpack';


let myIcon = new Image();
myIcon.src = Icon;
document.getElementById('title').appendChild(myIcon);


console.log(Data);

let btn = document.createElement('button');
btn.innerHTML = 'Click me and check the console!';
btn.onclick = printMe;
document.getElementById('title').appendChild(btn);