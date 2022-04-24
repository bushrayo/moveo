 
  let stop=false;
  let loop=false;

  //pathName
  const path='./soundFile/';

  // audio files:
  const audioNames=new Array('_tambourine_shake_higher.mp3', 'ALL TRACK.mp3', 'B VOC.mp3', 'DRUMS.mp3', 'HE HE VOC.mp3', 'HIGH VOC.mp3','JIBRISH.mp3', 'LEAD 1.mp3', 'UUHO VOC.mp3');
  
   //channelsNumber
   const num=audioNames.length;

  //colors of rows
  const colors = new Array('#303030','#484848','#606060','#707070', '#888888', '#A0A0A0', '#B0B0B0', '#C0C0C0', '#D3D3D3');
  
 
  //create table function - address row and 9 audio rows
  function createTable() {
    let table = document.getElementById("theTable");
    //address row
    let row0 = table.insertRow(0);
    let cell0 = row0.insertCell(0);
    cell0.innerHTML = "List of channels";
    cell0.classList.add("address");

    //audio rows
    for (let index = 1; index < num; index++) {
        let rowI = table.insertRow(index);
        let cellI = rowI.insertCell(0);
        let cellII = rowI.insertCell(1);

        //add audio src for each row,
        let name= path + audioNames[index-1];
        let url = encodeURI(name);
        cellI.innerHTML = '<audio id="audio-player'+ index + '" controls="controls" src= ' + url  +' type="audio/mpeg" >';
        //add mute button for each row
        cellII.innerHTML = '<button id="muteButton"' + index + ' onclick="enableMute(' + index + ')" type="button"> Mute </button>';

        //add backgroundColor for each row
        rowI.style.backgroundColor = colors[index-1 % colors.length]; 
        cellI.classList.add("pointer");
    }
  }


createTable(); 

//enable mute functuin
function enableMute(index){
  let audioID = document.getElementById("audio-player" + index);
  if(audioID.muted == true)
    audioID.muted=false;
  else
    audioID.muted=true;
}

function playAll(){
    stop=true;
    loop=false;
    for (let index = 1; index < num; index++) {
        let audioID = document.getElementById("audio-player" + index);
        if(audioID.muted==false){
            audioID.load();
            audioID.play();
        }
        else
            audioID.load();


    }

}

function stopAll(){
    loop=false;
    stop=true;
    for (let index = 1; index < num; index++) {
        let audioID = document.getElementById("audio-player" + index);
        audioID.pause();
        //audioID.currentTime=0;
        audioID.load();
        
    }

}

async function loopAll(){
    
    //loop should start:
    if(loop==false){
        loop=true;
        stop=false;
        //set all the audio to start point time
       
        for (let index = 1; index < num; index++) {
            let audioID = document.getElementById("audio-player" + index);
            audioID.pause();
            audioID.currentTime=0;
      }
    }
    //loop should stop: 
    else{
        stop=true;
        loop=false;
        stopAll();
        }
    //if loop==true: start the while & use "awiat" function 
    let index=1;

        while(loop){ 
               
            let audioID = document.getElementById("audio-player" + index);
            audioID.currentTime=0;
            audioID.play();
            let time=audioID.duration;
            await new Promise(resolve => setTimeout(resolve, time*1000));
            if(stop) break;     
            index++;
            index=index%(num);
            if(index==0)
            index++;
           
        }
    }