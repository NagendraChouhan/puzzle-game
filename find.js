var image=-1;
var score=0;
var hscore;
var time_interval;
var img_div=document.getElementsByClassName("btn_block");
var bg_div=document.getElementsByClassName("bg_div");

var score_id=document.getElementById("score");
var hscore_id=document.getElementById("hscore");
var result_id=document.getElementById("result");
var end_btn_id=document.getElementById("end_btn");
var time_id=document.getElementById("time");
var start_btn_id=document.getElementById("start_btn");


hscore_id.value=window.localStorage.getItem("Hscore");
var click_audio = new Audio('audio/mixkit-fast-double-click-on-mouse-275.wav');
var same_audio = new Audio('audio/mixkit-sci-fi-click-900.wav');
var timeout_audio = new Audio('audio/mixkit-sad-game-over-trombone-471.wav');


function photo(url,i)
{
    click_audio.play();
    hscore=hscore_id.value;
    if(img_div[i].style.backgroundImage == "")
    {
        img_div[i].style.backgroundImage ="url('"+url+"')";
        comp(i);
    }
    else
    {
        
        img_div[i].style.backgroundImage ="";
        image=-1;
        
    }
}

function comp(i)
{
    var im=image;
    if(image==-1){
    }
    else
    {
        for(var x=0;x<=15;x++){
            img_div[x].style.pointerEvents="none";
        }
        if(img_div[image].style.backgroundImage==img_div[i].style.backgroundImage)
        {
            setTimeout(()=>setimage(im,i,0),500);
            score+=4;
            score_id.value=score;
            same_audio.play();
        }
        else
        {
            setTimeout(()=>setimage(im,i,1),500);
            if(score<=0){
                score=0;
            }
            else{
                score-=1; 
            }
            score_id.value=score;
        }
    }
    image=i;
    
}
function setimage(i1,i2,t)
{
    if(t==1)
    {
        img_div[i1].style.backgroundImage="";
        img_div[i2].style.backgroundImage="";
        for(var x=0;x<=15;x++){
            if(img_div[x].style.backgroundImage != ""){
                img_div[x].style.pointerEvents="none";
            }
            else{

                img_div[x].style.pointerEvents="auto";
            }
        }
        image=-1;
    }
    else if(t==0)
    {
       
        var v=0;
        for(var x=0;x<=15;x++){
            if(img_div[x].style.backgroundImage != ""){
                img_div[x].style.pointerEvents="none";
                v++;
                if(v==15){
                    setscore();
                    result_id.style.backgroundColor="black";
                    result_id.innerHTML="Congratulation You Win";
                    start_btn_id.innerText="New Game";
                    bg_div[0].style.backgroundImage= "url('img/671801409ba-awesome-coloful-fireworks-animated-gif-image-3.gif')";
                    clearInterval(time_interval);
                    end_btn.disabled=true;
                    end_btn.style.opacity="0.5";
                    start_btn.disabled =false;
                    start_btn.style.opacity="1";
                }
            }
            else{

                img_div[x].style.pointerEvents="auto";
            }
        }
        img_div[i1].style.opacity="0.7";
        img_div[i2].style.opacity="0.7";
        image=-1;
    }
}

function start()
{
    click_audio.play();
    end_btn.style.opacity="1";
    start_btn_id.innerText="START";
    bg_div[0].style.backgroundImage= "";
    result_id.style.backgroundColor="";
    score_id.value="0";
    time_id.innerHTML="Time &nbsp;&nbsp;&nbsp;"+45;
    result_id.innerHTML="";
    start_btn=document.getElementById("start_btn");
    end_btn.disabled=false;
    start_btn.disabled = true;
    start_btn.style.opacity="0.5";
    for(var i=0;i<16;i++){
        img_div[i].style.display="inline-block";
        img_div[i].style.pointerEvents="none";
        img_div[i].style.opacity="1";
    }

    setTimeout(()=>unvisible(),2000);
}
function unvisible(){
    for(var i=0;i<16;i++){
        img_div[i].style.backgroundImage ="";
        img_div[i].style.pointerEvents="auto";
    }
    time_fun();
    
}

function time_fun()
{
    var t=45;
    time_interval=setInterval(()=>{ 
        t--;
        if(t>=0){
            time_id.innerHTML="Time &nbsp;&nbsp;&nbsp;"+t;    
        }
        else{
            clearInterval(time_interval);
            result_id.style.backgroundColor="black";
            result_id.innerHTML = "<img src='3d-clock-03.gif'+>";
            result_id.innerHTML+="Opps Time Out";
            timeout_audio.play();
            setscore();
            for(x=0;x<16;x++){
                img_div[x].style.pointerEvents="none";
            }
            setTimeout(()=>location.reload(),5000);
            end_btn.disabled=true;
            end_btn.style.opacity="0.50";
            start_btn.disabled =true;
            start_btn.style.opacity="0.50";
        }
        if(t<=5){
            time_id.style.color="red";
        }
    },1000);
        
}
function setscore()
{
    if(score>hscore){
        window.localStorage.setItem("Hscore",score);
        hscore_id.value=window.localStorage.getItem("Hscore");
        score=0;
    }
    else{
        score=0;
    }
}
function end()
{
    click_audio.play();
    for(var i=0;i<16;i++){
        img_div[i].style.display="none";
    }
    end_btn.disabled=true;
    end_btn.style.opacity="0.5";
    start_btn.disabled =false;
    for(i=0;i<400000000;i++);
    location.reload();
}