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

createForm();

function round() {
    let radius = parseFloat(document.forms.form1.radius.value);
    let centerX = radius;
    let centerY = radius;
    
    document.body.removeChild(form1);
    
    let rSvg = document.createElementNS("http://www.w3.org/2000/svg","svg");
    document.body.appendChild(rSvg);
    rSvg.setAttribute('width', radius*2.1 + 'px');
    rSvg.setAttribute('height', radius*2.1 + 'px');
    let round = document.createElementNS("http://www.w3.org/2000/svg","circle");
    rSvg.appendChild(round);
    round.id='round';
    round.setAttribute('cx', radius);
    round.setAttribute('cy', radius);
    round.setAttribute('r', radius);
    round.setAttribute('stroke', 'red');
    round.setAttribute('fill', 'rgb(68, 245, 245)');
    let hoursDistance = radius*0.8;


    for (let h = 1; h <= 12; h++) {    //12 hours
        let numRound = document.createElementNS("http://www.w3.org/2000/svg","circle");
        const hourAngle = Math.PI*2/12*h;
        const hourX = centerX+hoursDistance*Math.sin(hourAngle);
        const hourY = centerY-hoursDistance*Math.cos(hourAngle);
        numRound.setAttribute('cx', hourX);
        numRound.setAttribute('cy', hourY);
        numRound.setAttribute('r', radius*0.1);
        numRound.setAttribute('stroke', 'red');
        numRound.setAttribute('fill', 'rgb(218, 245, 142)');
        rSvg.appendChild(numRound);
        let textH = document.createElementNS("http://www.w3.org/2000/svg","text");
        rSvg.appendChild(textH);
        textH.innerHTML = h;
        textH.setAttribute('font-size', 15*radius/100);//радиус влияет на шрифт
        textH.setAttribute("dominant-baseline", "central");
        textH.setAttribute('text-anchor', 'middle');
        textH.setAttribute('x',hourX);
        textH.setAttribute('y',hourY);
    }
            let angleH = document.createElementNS("http://www.w3.org/2000/svg","line");
            rSvg.appendChild(angleH);
            angleH.setAttribute('x1', radius);
            angleH.setAttribute('y1', radius+radius*0.1);//смещение от центра
            angleH.setAttribute('x2', radius);
            angleH.setAttribute('y2', radius-radius*0.5);//длина
            angleH.setAttribute('stroke', 'black');
            angleH.setAttribute('stroke-width', 15*radius/100);//толщина
            angleH.setAttribute('stroke-linecap','round');//закругление
            angleH.id='angleHours';
            
            let angleM = document.createElementNS("http://www.w3.org/2000/svg","line");
            rSvg.appendChild(angleM);
            angleM.setAttribute('x1', radius);
            angleM.setAttribute('y1', radius+radius*0.1);
            angleM.setAttribute('x2', radius);
            angleM.setAttribute('y2', radius-radius*0.7);
            angleM.setAttribute('stroke', 'black');
            angleM.setAttribute('stroke-width', 7*radius/100);
            angleM.setAttribute('stroke-linecap','round');
            angleM.id='angleMin';
            
            let angleS = document.createElementNS("http://www.w3.org/2000/svg","line");
            rSvg.appendChild(angleS);
            angleS.setAttribute('x1', radius);
            angleS.setAttribute('y1', radius+radius*0.1);
            angleS.setAttribute('x2', radius);
            angleS.setAttribute('y2', radius-radius*0.9);
            angleS.setAttribute('stroke', 'black');
            angleS.setAttribute('stroke-width', 2*radius/100);
            angleS.setAttribute('stroke-linecap','round');
            angleS.id='angleSec';
    
        updateClock();
    }
    
    
    function updateClock() {
        let radius=document.getElementById('round').getBoundingClientRect().width/2;
        let currTime = new Date();
        
        const hours = currTime.getHours()%12;
        const minutes = currTime.getMinutes();
        const seconds = currTime.getSeconds();
        const msec = currTime.getMilliseconds();
        
        const secAngle = Math.PI*2/60*seconds;
        const minAngle = Math.PI*2/60*minutes;
        const hoursAngle = Math.PI*2/12*(hours+minutes/60);
        
        document.getElementById("angleHours").setAttribute('transform','rotate('+hoursAngle*180/Math.PI+' '+radius+' '+radius+')');
        document.getElementById("angleMin").setAttribute('transform','rotate('+minAngle*180/Math.PI+' '+radius+' '+radius+')');
        document.getElementById("angleSec").setAttribute('transform','rotate('+secAngle*180/Math.PI+' '+radius+' '+radius+')');
        console.log(hours+':'+minutes+':'+seconds+'sec');

        setTimeout(updateClock,1000-msec);
}