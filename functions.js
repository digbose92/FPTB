var todos = new Array();
var timer = new easytimer.Timer();
var timer_1 = new easytimer.Timer();
var timer_task_1 = new easytimer.Timer();
var timer_task_1_exc = new easytimer.Timer();

a=new AudioContext();

window.onload = init;


function beep_fn(vol, freq, duration){
  v=a.createOscillator()
  u=a.createGain()
  v.connect(u)
  v.frequency.value=freq
  v.type="square"
  u.connect(a.destination)
  u.gain.value=vol*0.01
  v.start(a.currentTime)
  v.stop(a.currentTime+duration*0.001)
}


function init() {
    var submitButton = document.getElementById("submit");
    submitButton.onclick = getFormData;
    getTodoData();
}

function getTodoData() {
    var request = new XMLHttpRequest();
    request.open("GET", "todo.json");
    request.onreadystatechange = function() {
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText) { 
                parseTodoItems(this.responseText);
                addTodosToPage();
            }
            else {
                console.log("Error: Data is empty");
            }
        }
    };
    request.send();
}

function parseTodoItems(todoJSON) {
    if (todoJSON == null || todoJSON.trim() == "") {
        return;
    }
    var todoArray = JSON.parse(todoJSON);
    if (todoArray.length == 0) {
        console.log("Error: the patient details are empty!");
        return;
    }
    for (var i = 0; i < todoArray.length; i++) {
        var todoItem = todoArray[i];
        todos.push(todoItem);
    }
}

function addTodosToPage() {
    var ul = document.getElementById("todoList");
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = document.createElement("li");
        li.innerHTML =
            "ID:" + todoItem.patient_ID + "Age:" + todoItem.age ;
        ul.appendChild(li);
    }
}

function getFormData() {
    var patient_ID = document.getElementById("patient_ID").value;
    if (checkInputText(patient_ID, "Please enter the ID of the person")) return;

    var age = document.getElementById("age").value;
    if (checkInputText(age, "Please enter the age of the person")) return; 

    console.log("New entry: " + patient_ID + " Age: " + age );
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);
        return true;
    }
    return false;
}         


function showDiv() {
    document.getElementById('intro_question_1').style.display = "block";
    document.getElementById('countdownintro_1').style.display = "block";
    document.getElementById('stop_intro_1').style.display = "block";
    
 }

 function showDiv_1()
 {
    document.getElementById('intro_question_2').style.display = "block";
    document.getElementById('countdownintro_2').style.display = "block";
    document.getElementById('stop_intro_2').style.display = "block";
 }
 

 function showDiv_task()
 {
    document.getElementById('task_question_1').style.display = "block";
    document.getElementById('countdownquestion_1').style.display = "block";
 }




 //first counter after intro 1 
 $('#start_intro_1').click(function () {
    timer.start({precision: 'seconds', startValues: {seconds: 0}, target: {seconds: 10}});
});

 $('#countdownintro_1 .values').html(timer.getTimeValues().toString());
timer.addEventListener('secondsUpdated', function (e) {
    $('#countdownintro_1 .values').html(timer.getTimeValues().toString());
});
timer.addEventListener('targetAchieved', function (e) {
    $('#countdownintro_1 .values').html('PROCEED!!');
});

timer.addEventListener('targetAchieved', function () {
    beep_fn(100, 520, 200)});
    
//$("#start_intro_1").click(function(){
    //    $("#name_form").toggle();
//});


//second counter after intro 2 
$('#start_intro_2').click(function () {
    timer_1.start({precision: 'seconds', startValues: {seconds: 0}, target: {seconds: 10}});
});

 $('#countdownintro_2 .values').html(timer_1.getTimeValues().toString());
timer_1.addEventListener('secondsUpdated', function (e) {
    $('#countdownintro_2 .values').html(timer_1.getTimeValues().toString());
});
timer_1.addEventListener('targetAchieved', function (e) {
    $('#countdownintro_2 .values').html('PROCEED!!');
});

timer_1.addEventListener('targetAchieved', function () {
    beep_fn(100, 520, 200)});
    
//$("#start_intro_1").click(function(){
        //$("#name_form").toggle();
//})


//counter after task 1
$('#start_task_1').click(function () {
    timer_task_1.start({precision: 'seconds', startValues: {seconds: 0}, target: {seconds: 5}});
});

 $('#countdownquestion_1 .values').html(timer_task_1.getTimeValues().toString());
timer_task_1.addEventListener('secondsUpdated', function (e) {
    $('#countdownquestion_1 .values').html(timer_task_1.getTimeValues().toString());
});
timer_task_1.addEventListener('targetAchieved', function (e) {
    $('#countdownquestion_1 .values').html('PROCEED!!');
});

timer_task_1.addEventListener('targetAchieved', function () {
    beep_fn(100, 520, 200)});


//task counter just after timer_task is executed
timer_task_1.addEventListener('targetAchieved', function(){timer_task_1_exc.start({precision: 'seconds', startValues: {seconds: 0}, target: {seconds: 5}});});
timer_task_1_exc.addEventListener('secondsUpdated', function (e) {
    $('#taskquestion_1 .values').html(timer_task_1_exc.getTimeValues().toString());
});
timer_task_1_exc.addEventListener('targetAchieved', function (e) {
    $('#taskquestion_1 .values').html('Finish response to the question');
});

timer_task_1_exc.addEventListener('targetAchieved', function () {
    beep_fn(100, 520, 200)});
    