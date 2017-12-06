import './style.css'
import Icon from './npmGInstall.png'
import Data from './data.xml'
import printMe from './print.js'
import _ from 'lodash';


  function component() {
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');

    // let element = document.createElement('pre');
    // element.innerHTML = [
    //     'HeLLO Webpack!',
    //     '5 cubed is equal to ' + math.cube(5)
    // ].join('\n\n');
    
    let myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    console.log(Data);

    
    let btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    btn.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
    var print = module.default;
            print();
     });

    return element;
  }

  document.body.appendChild(component());

  if(module.hot){
      module.hot.accept('./print.js',function(){
          console.log('Accepting the update printMe module!');
          printMe();
      })
  }