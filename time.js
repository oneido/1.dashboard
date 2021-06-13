const ClockHandler = {
        createTime: function createTime() {

                const Time = new Date(),
                    Hours = Time.getHours(),
                    Minutes = Time.getMinutes(),
                    seconds = Time.getSeconds();

                return `${Hours}:${Minutes < 10 ? `0${Minutes}` : Minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
},

putInClock: function putInClock(CreatedTime) {

    const Clock = document.querySelector(".js-Time");

    Clock.innerText = CreatedTime ;

},


changeTimeColor:function changeTimeColor(){

    const Clock = document.querySelector(".js-Time");
    const TimeColor = "TimeColor"
    Clock.classList.add(TimeColor);
},

changeTime: function changeTime(){

    ClockHandler.putInClock(ClockHandler.createTime());
}

}

ClockHandler.changeTimeColor();

ClockHandler.putInClock(ClockHandler.createTime());

setInterval(ClockHandler.changeTime,1000);