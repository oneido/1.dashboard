const Alram = {

        AlramHadler: () => {

            Alram.matchingTime();
        },

        nowTime: () => {
                const Time = new Date(),
                    Hours = Time.getHours(),
                    Minutes = Time.getMinutes(),
                    seconds = Time.getSeconds();

                return `${Hours<10 ?`0${Hours}`:Hours}:${Minutes < 10 ? `0${Minutes}` : Minutes}`
},

getAlramData: () => {
    calledItem = localStorage.getItem("AlramData");
    calledData = JSON.parse(calledItem);

    return calledData;
},

matchingTime: () => {

    if(Alram.getAlramData()!==null){
        setTime = Alram.getAlramData();
        
        setTime.forEach(el => {  
            if(el.setTime==Alram.nowTime()){
                console.log("Alram!!");
                listCollection = document.querySelectorAll("li");
                listCollection.forEach(list=>{                    
                    if(list.firstChild.data ==el.title){
                        list.classList.add("AlramTarget");
                        NewWindow=window.open("", "", "width=300, height=300,location=no",);
                        NewWindow.document.body.style.backgroundColor="green";
                        NewWindow.document.body.style.color="white";
                        
                        AlramList =NewWindow.document.createElement("ul");
                        NewWindow.document.body.appendChild(AlramList);
    
                        test = NewWindow.document.createElement("li");
                        test.style.fontSize="large";
                        test.innerText=`❗${list.firstChild.data}
                        ${list.childNodes[1].innerText}`;
                        AlramList.appendChild(test); 
                        console.log("알람창이 나타납니다.");
                    }
                });

               
            }
            else{
                console.log("no Alram");
            }
        });  
    }
},

}

const setBtn={

Handler:()=>{
 
    const Obj = setBtn.createAlram();
    setBtn.saveAlramData();
    const targetArea =document.querySelector(".AlramList");
    setBtn.createAlramEle(Obj.title,Obj.setTime,targetArea,DelBtn.Handler);
    document.querySelector(".AlramTime").value="";
    document.querySelector(".AlramTitle").value="";
    
},

createAlram: () => {
    AlramObj = {
        title: document.querySelector(".AlramTitle").value,
        setTime: document.querySelector(".AlramTime").value
    }

    return AlramObj;
},

saveAlramData: () => {
    if(Alram.getAlramData()!==null){
        AlramArrData=Alram.getAlramData();
        AlramArrData.push(setBtn.createAlram());
        saveData = JSON.stringify(AlramArrData);
        localStorage.setItem("AlramData", saveData);

    }else{
        
        AlramArrData.push(setBtn.createAlram());
        saveData = JSON.stringify(AlramArrData);
        localStorage.setItem("AlramData", saveData);
    }
},

createAlramEle:(text,time,targetArea,DelBtnEvent)=>{
    List=document.createElement("li");
    List.innerText= `${text}`;
    targetArea.appendChild(List);

    TimeSpan= document.createElement("span");
    TimeSpan.innerText=`⏰${time}`;
    List.appendChild(TimeSpan);

    DelBtnEle =document.createElement("button");
    DelBtnEle.innerText="💥"
    DelBtnEle.classList.add("AlramBtn");
    DelBtnEle.addEventListener("click",DelBtnEvent);
    List.appendChild(DelBtnEle);

},
}

const DelBtn={
Handler:(event)=>{
    DelBtn.deleteEle(event);
    DelBtn.deleteData(event);

},

deleteEle:(event)=>{
    const delTarget= event.target.parentElement;
    delTarget.remove();
},

deleteData:(event)=>{
    console.log("delteData");
    console.log(AlramArrData);
    const delTarget= event.target.parentElement;
    AlramArrData =AlramArrData.filter(el=>{
       return  delTarget.firstChild.data !==el.title;
    });
    saveData = JSON.stringify(AlramArrData);
    localStorage.setItem("AlramData", saveData);
},
}

const LoadAlram={
Handler:()=>{
    if(Alram.getAlramData()!==null){   
        AlramArrData= Alram.getAlramData();
        LoadAlram.settingData(AlramArrData);
        ListCollection=document.querySelectorAll("li");
        ListCollection.forEach(List=>{
            if(List.childNodes[1].innerText < `⏰${Alram.nowTime()}`){
            List.classList.add("AlramTarget");
        }else{
            
            console.log("test1");
            }
        });

        Alram.matchingTime();
    }else{
        console.log("Noting");
    }
},
settingData:(AlramArrData)=>{
    const targetArea =document.querySelector(".AlramList");
    AlramArrData.forEach(Data=>{
        setBtn.createAlramEle(Data.title,Data.setTime,targetArea,DelBtn.Handler);
    });
  
}
}

let AlramObj;
let AlramArrData = [];


LoadAlram.Handler();


setInterval(Alram.AlramHadler, 1000 * 60);

document.querySelector(".SetBtn").addEventListener("click", setBtn.Handler);