
//=> @ Timmy API | 2024-SEP-18 <=
//=> + /fiddles/Roulette/api <=

//[ Timmy ]
const Timmy = {
    //[ ^.now ]
    now : function() {
        return new Date();
    } ,
    //[ ^.clock ]
    clock : function() {
        return Timmy.now().getTime();
    }
}

