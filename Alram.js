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
    let countS=0 ;
    let countL=0 ;
    obj = [TestName];
    if(Alram.getAlramData()!==null){
        setTime = Alram.getAlramData();
        
        setTime.forEach(el => {  
            if(el.setTime==Alram.nowTime()){
                console.log("Alram!!");
                countS++;
                listCollection = document.querySelectorAll("li");
                listCollection.forEach(list=>{                    
                    if(list.firstChild.data ==el.title){
                        list.classList.add("AlramTarget");

                        obj.push(`${list.firstChild.data} ${list.childNodes[1].innerText}`);
                        
                        countL++;

                        

                       /*  NewWindow.document.body.style.backgroundColor="green";
                        NewWindow.document.body.style.color="white";
                        
                        Name= NewWindow.document.createElement("h3");
                        Name.innerText= `😀${nickName}님, 설정하신 알람을 확인해주세요.❗`;
                        NewWindow.document.body.appendChild(Name); 

                        AlramList =NewWindow.document.createElement("ul");
                        NewWindow.document.body.appendChild(AlramList);
                        
                        test = NewWindow.document.createElement("li");
                        test.style.fontSize="large";
                        test.innerText=`❗${list.firstChild.data}
                        ${list.childNodes[1].innerText}`;
                        AlramList.appendChild(test); 
                        console.log("알람창이 나타납니다."); */
                    }
                    
                });
            }
            else{
                console.log("no Alram");
            }
            
            
            
        }); 
        if(countS==countL && countL!==0 && countS!==0){
            console.log(`CountL: ${countL} // countS: ${countS} `);
            Alram.broad();
        }else{
            
            console.log(`CountL: ${countL} // countS: ${countS} `);
        }
        
    }

    
},

 broad:()=>{
    console.log(obj);
    NewWindow=window.open("ChildPage.html", "", "width=412, height=300,location=no",); 

}
    

}


const setBtn={

Handler:()=>{

    
    const Obj = setBtn.createAlram();
    if(Obj.setTime==Alram.nowTime()){

        alert("현재 시간으로 설정할 수 없습니다.");
        document.querySelector(".AlramTime").value="";
        document.querySelector(".AlramTitle").value="";

    }else{
        
        setBtn.saveAlramData();
        const targetArea =document.querySelector(".AlramList");
        setBtn.createAlramEle(Obj.title,Obj.setTime,targetArea,DelBtn.Handler);
        /* nowdata = new Date();
        setdata =document.querySelector(".AlramTime").valueAsNumber
    
        setTimeout(,setdata-(nowdata.getMinutes()*1000*60)); */
        
        document.querySelector(".AlramTime").value="";
        document.querySelector(".AlramTitle").value="";
        
    }   
    
    
  
    
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
    List.classList.add("AddList");
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
let TestName;
TestName = `😀${nickName}님, 설정하신 알람을 확인해주세요.❗`;
let obj = [TestName];

LoadAlram.Handler();


setInterval(Alram.AlramHadler, 1000 * 60);

document.querySelector(".SetBtn").addEventListener("click", setBtn.Handler);