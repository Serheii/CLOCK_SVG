"use strict";

function createForm() {
    let form = document.createElement("form");
    document.body.appendChild(form);
    
    let labelElem = document.createElement("label");
    labelElem.innerHTML = 'Радиус циферблата часов: '
    form.name='form1';
    form.appendChild(labelElem);
    let br1 = document.createElement("br");
    form.appendChild(br1);
    
    let radInput = document.createElement("input");
    radInput.type = "number";
    radInput.name = "radius";
    radInput.value = 100;
    form.appendChild(radInput);
    let br = document.createElement("br");
    form.appendChild(br);
    
    let button = document.createElement("input");
    button.type = "button";
    button.value = "Нарисовать часы";
    button.setAttribute('onclick', 'round()');
    form.appendChild(button);
}

function round() {
    let radius = parseFloat(document.forms.form1.radius.value);
    let centerX = radius;
    let centerY = radius;
    
    document.body.removeChild(form1);
    
    let round = document.createElement("div");
    document.body.appendChild(round);
    round.style.width = radius*2 + "px";
    round.style.height = radius*2 + "px";
    round.style.position = 'absolute';
    round.classList.add("round");
    let hoursDistance = radius*0.8;
    for (let h = 1; h <= 12; h++) {    //12 hours
        let numRound = document.createElement("div");
        numRound.innerHTML = h;
        round.appendChild(numRound);
        const hourAngle = Math.PI*2/12*h;
        const hourX = centerX+hoursDistance*Math.sin(hourAngle);
        const hourY = centerY-hoursDistance*Math.cos(hourAngle);
        numRound.style.width = radius*0.2 + "px";
        numRound.style.height = radius*0.2 + "px";
        numRound.style.textAlign = 'center';
        numRound.style.fontSize = radius/100+'em';//размер шрифта от размера циферблата
        numRound.style.position = 'absolute';
        numRound.style.left = (hourX-radius*0.2/2) + 'px';
        numRound.style.top = (hourY-radius*0.2/2) + 'px';
        numRound.classList.add("numRound");
    }
        let angleH = document.createElement("div");
        round.appendChild(angleH);
        angleH.id='angleHours';
        angleH.style.position = 'absolute';
        angleH.style.width = radius*0.15 + "px";//толщина стрелки
        angleH.style.height = radius*0.6 + "px";//длина
        angleH.classList.add("angle");
        angleH.style.left = (radius-parseFloat(angleH.style.width)/2) + 'px';//смещение стрелки на половину толщины
        angleH.style.top = radius-parseFloat(angleH.style.height)*0.9 + 'px';

        let angleM = document.createElement("div");
        round.appendChild(angleM);
        angleM.id='angleMin';
        angleM.style.position = 'absolute';
        angleM.style.width = radius*0.1 + "px";//толщина стрелки
        angleM.style.height = radius*0.7 + "px";//длина
        angleM.classList.add("angle");
        angleM.style.left = (radius-parseFloat(angleM.style.width)/2) + 'px';//смещение стрелки на половину толщины
        angleM.style.top = radius-parseFloat(angleM.style.height)*0.9 + 'px';
    
        let angleS = document.createElement("div");
        round.appendChild(angleS);
        angleS.id='angleSec';
        angleS.style.position = 'absolute';
        angleS.style.width = radius*0.05 + "px";//толщина стрелки
        angleS.style.height = radius + "px";//длина
        angleS.classList.add("angle");
        angleS.style.left = (radius-parseFloat(angleS.style.width)/2) + 'px';//смещение стрелки на половину толщины
        angleS.style.top = radius-parseFloat(angleS.style.height)*0.9 + 'px';
    
        updateClock();
    }
    
    createForm();
    
    function updateClock() {
        let currTime = new Date();
        
        const hours = currTime.getHours()%12;
        const minutes = currTime.getMinutes();
        const seconds = currTime.getSeconds();
        const msec = currTime.getMilliseconds();
        
        const secAngle = Math.PI*2/60*seconds;
        const minAngle = Math.PI*2/60*minutes;
        const hoursAngle = Math.PI*2/12*(hours+minutes/60);
        
        document.getElementById("angleHours").style.transform='rotate('+hoursAngle+'rad)';
        document.getElementById("angleMin").style.transform='rotate('+minAngle+'rad)';
        document.getElementById("angleSec").style.transform='rotate('+secAngle+'rad)';
        console.log(hours+':'+minutes+':'+seconds+'sec');

        setTimeout(updateClock,1000-msec);
}