let FinishTaskValueArr = [];
let PendingTaskValueArr = [];
const AddTask = document.querySelector("input");
const PendingList = document.querySelector(".js-Pending-ul");
const FinishList = document.querySelector(".js-Finish-ul");

const AT_EventHandlers = {

    KeyEvent: function KeyEvent(event) {
        if (event.keyCode == 13) {


            CreatedTaskObj = AT_EventHandlers.createTaskObj();
            AT_EventHandlers.saveTaskObj(PendingTaskValueArr, CreatedTaskObj, "PL");
            savedStoragePL_Data = AT_EventHandlers.getPL_Item("PL");
            DataNumber = savedStoragePL_Data.length - 1;

            AT_EventHandlers.createEle(savedStoragePL_Data[DataNumber], PendingList, AT_EventHandlers.BtnDelEvent, AT_EventHandlers.BtnFinEvent);
            AddTask.value = "";
        }
    },
    getPL_Item: function getPL_Item(List) {
        PL_Item = localStorage.getItem(List);
        TransPL_Item = JSON.parse(PL_Item);
        // console.log(typeof(TransPL_Item));
        return TransPL_Item //:Obj

    },
    BtnDelEvent: function BtnDelEvent(event) {

        //PL 키 데이터 재 저장
        console.dir(event.target.parentElement.firstChild.data);
        filterResult = PendingTaskValueArr.filter(el => { return el !== event.target.parentElement.firstChild.data });
        console.log(filterResult);
        PendingTaskValueArr = filterResult;
        localStorage.setItem("PL", JSON.stringify(filterResult));
        event.target.parentElement.remove();


    },
    BtnFinEvent: function BtnFinEvent(event) { //FL 키 데이터 저장, PL 키 데이터 재저장, FL 추가


        FinishTaskValueArr.push(event.target.parentElement.firstChild.data);
        localStorage.setItem("FL", JSON.stringify(FinishTaskValueArr)); //FL 키 데이터 저장
        event.target.parentElement.remove();

        AT_EventHandlers.BtnDelEvent(event); //PL 키 데이터 재저장

        AT_EventHandlers.createEle(event.target.parentElement.firstChild.data, FinishList, AT_EventHandlers.BtnFinDelEvent, AT_EventHandlers.BtnReturnEvent); //FL 추가

    },
    BtnFinDelEvent: function BtnFinDelEvent(event) {
        // FL 재저장
        console.dir(FinishTaskValueArr);
        FinfilterResult = FinishTaskValueArr.filter(el => { return el !== event.target.parentElement.firstChild.data });
        FinishTaskValueArr = FinfilterResult;
        localStorage.setItem("FL", JSON.stringify(FinfilterResult));

        // 지정 List 삭제
        event.target.parentElement.remove();
    },

    BtnReturnEvent: function BtnReturnEvent(event) {
        // PL 재저장
        console.dir(PendingTaskValueArr);
        PendingTaskValueArr.push(event.target.parentElement.firstChild.data);
        localStorage.setItem("PL", JSON.stringify(PendingTaskValueArr));
        // FL 재저장
        AT_EventHandlers.BtnFinDelEvent(event);
        // PL 추가
        AT_EventHandlers.createEle(event.target.parentElement.firstChild.data, PendingList, AT_EventHandlers.BtnDelEvent, AT_EventHandlers.BtnFinEvent);
        // 지정 List 삭제
        event.target.parentElement.remove();
    },

    createEle: function createEle(TransPL_Item, List, event1, event2) {

        CreatedList = document.createElement("li");
        CreatedList.innerText = TransPL_Item;
        List.appendChild(CreatedList);

        CreatedBtnDel = document.createElement("button");
        CreatedBtnDel.innerText = "❌"
        CreatedBtnDel.addEventListener("click", event1);
        CreatedList.appendChild(CreatedBtnDel);

        CreatedBtnFin = document.createElement("button");
        CreatedBtnFin.innerText = "✔️"
        CreatedBtnFin.addEventListener("click", event2);
        CreatedList.appendChild(CreatedBtnFin);
    },
    saveTaskObj: function saveTaskObj(Arr, TaskObj, List) {

        Arr.push(TaskObj);

        localStorage.setItem(List, JSON.stringify(Arr));
    },

    createTaskObj: function createTaskObj() {

        TaskObj = AddTask.value

        return TaskObj;
    },


}

const OpenPageHandlers = {
    loadEvent: function loadEvent() {

        OpenPageHandlers.LoadPL();
        OpenPageHandlers.LoadFL();

    },

    LoadPL: function LoadPL() {
        // PL 불러오기
        savedStoragePL_Data = AT_EventHandlers.getPL_Item("PL");
        DataNumber = savedStoragePL_Data.length;

        for (i = 0; i < DataNumber; i++) {

            AT_EventHandlers.createEle(savedStoragePL_Data[i], PendingList, AT_EventHandlers.BtnDelEvent, AT_EventHandlers.BtnFinEvent);
            //PL ARR 및 PL 키 데이터 재저장
            AT_EventHandlers.saveTaskObj(PendingTaskValueArr, savedStoragePL_Data[i], "PL");
        }
    },
    LoadFL: function LoadFL() {
        // FL 불러오기
        savedStoragePL_Data = AT_EventHandlers.getPL_Item("FL");
        DataNumber = savedStoragePL_Data.length;

        for (i = 0; i < DataNumber; i++) {

            AT_EventHandlers.createEle(savedStoragePL_Data[i], FinishList, AT_EventHandlers.BtnFinDelEvent, AT_EventHandlers.BtnReturnEvent);
            //PL ARR 및 PL 키 데이터 재저장
            AT_EventHandlers.saveTaskObj(FinishTaskValueArr, savedStoragePL_Data[i], "FL");
        }
    }
}
window.addEventListener("load", OpenPageHandlers.loadEvent);
AddTask.addEventListener("keypress", AT_EventHandlers.KeyEvent);