

  //channelsNumber
  const num=10;
  let loop=false;

  const colors = new Array('#303030','#484848','#606060','#707070', '#888888', '#A0A0A0', '#B0B0B0', '#C0C0C0', '#D3D3D3');
  
  function createTable() {
    let table = document.getElementById("theTable");
    let row0 = table.insertRow(0);
    let cell0 = row0.insertCell(0);
    cell0.innerHTML = "List of channels";
    cell0.classList.add("address");
    
    

    for (let index = 1; index < num; index++) {
        let rowI = table.insertRow(index);
        let cellI = rowI.insertCell(0);
        let cellII = rowI.insertCell(1);

        //add audio src for each row
        cellI.innerHTML = '<audio id="audio-player'+ index + '"controls="controls" src="./sounds/song' + index + '.mp3" type="audio/mpeg" >';
        cellII.innerHTML = '<button id="muteButton"' + index + ' onclick="enableMute(' + index + ')" type="button"> Mute </button>';

        //add backgroundColor for each row
        rowI.style.backgroundColor = colors[index-1 % colors.length]; 
        cellI.classList.add("pointer");
    }
  }


createTable(); 

function enableMute(index){

  let audioID = document.getElementById("audio-player" + index);
  if(audioID.muted == true)
    audioID.muted=false;
  else
    audioID.muted=true;
}

function playAll(){
    for (let index = 1; index < num; index++) {
        let audioID = document.getElementById("audio-player" + index);
        if(audioID.muted==false)
            audioID.play();
        
    }

}

function stopAll(){
    for (let index = 1; index < num; index++) {
        let audioID = document.getElementById("audio-player" + index);
        audioID.pause();
        audioID.load();
        
    }

}

async function loopAll(){
    if(loop==false){
        loop=true;
    }
    else{
        loop=false;
        stopAll();
    }
    
    
    let index=1;

        while(loop){
            
            let audioID = document.getElementById("audio-player" + index);
            audioID.play();
            let time=audioID.duration;
            await new Promise(resolve => setTimeout(resolve, time*1000));
            index++;
            index=index%(num);
            if(index==0)
            index++;
           
        }
    }


