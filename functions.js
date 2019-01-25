var todos = new Array();
var timer = new easytimer.Timer();
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

 $('#start_intro').click(function () {
    timer.start({precision: 'seconds', startValues: {seconds: 0}, target: {seconds: 10}});
});

 $('#countdownintro .values').html(timer.getTimeValues().toString());
timer.addEventListener('secondsUpdated', function (e) {
    $('#countdownintro .values').html(timer.getTimeValues().toString());
});
timer.addEventListener('targetAchieved', function (e) {
    $('#countdownintro .values').html('PROCEED!!');
});

timer.addEventListener('targetAchieved', function () {
    beep_fn(100, 520, 200)});
    
$("#start_intro").click(function(){
        $("#name_form").toggle();
});