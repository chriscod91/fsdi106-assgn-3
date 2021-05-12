var isItImportant = false;
var serverUrl = "http://fsdi.azurewebsites.net/api";

function toggleImportant() {
  console.log("Icon clicked!!");

  if (isItImportant) {
    //change to non important
    isItImportant = false;
    $("#iImportant").removeClass("fas").addClass("far");
  } else {
    //change to important
    isItImportant = true;
    $("#iImportant").removeClass("far").addClass("fas");
  }
}

function saveTask() {
  console.log("saving!!");

  //get the values from control
  let title = $("#txtTitle").val();
  let desc = $("#txtDesc").val();
  let important = $("#iImportant").val();
  let dueDate = $("#txtDueDate").val();
  let alertText = $("#selAlert").val();
  let location = $("#txtLocation").val();
  //create an object
  // let task = new task(pass the perameters, second, third)
  let theTask = new Task(title, desc, important, dueDate, alertText, location);

  //console.log the object
  console.log(theTask);

  // send task to server
  $.ajax({
    url: serverUrl + '/tasks',
    type: 'POST',
    data: JSON.stringify(theTask),
    contentType: "application/Json",
    success: function(res) {
      console.log("Server says", res);

      displayTask(res);
    },
    error: function (error) {
      console.error("Error saving", error);
    }
  });
}

function displayTask(task) {

  let alert = "";
  switch (task.alertText) {
    case "1":
      alert = "Don't Forget to:";
      break;
    case "2":
      alert = "Stop:";
      break;
    case "3":
      alert = "Start:";
      break;
    case "4":
      alert = "Get more coffee:";
      break;
  }

  let syntax = `<div class="task ">  
      <div class="sec-1">${alert}</div>
      <div class="sec-2">
        
        <div class="sec-title">
          <h5>${task.title}</h5>  
          <p>${task.description}</p>
        </div>
  
        <div class="sec-date">
          <label>${task.dueDate}</label>
        </div>
  
        <div class="sec-location">
          <label>${task.location}</label>
        </div>
  
      </div>
    </div>`;

  $("#tasksContainer").append(syntax);
}

function retreiveTasks() {
  $.ajax({
    url: serverUrl + '/tasks',
    type: "GET",
    success: function (list) {
      console.log("Retreived", list);

      for (let i=0; i< list.length; i++) {
        let task = list[i]; 
        if (task.user === "ChrisCod") {
          displayTask(task);
        }
      }
    },
    error: function (err) {
      console.error("Error reading", err);
    }
  });
}

function init() {
  console.log("Task Manager");
  //load data
  retreiveTasks();
  //hook events
  $("#iImportant").click(toggleImportant);
  $("#btnSave").click(saveTask);
  $("#btnDetails").click(function () {
    $("#details").toggle();
  });
}
 
window.onload = init;

function testRequest() {
 
  $.ajax({
    url: "https://restclass.azurewebsites.net/api/test",
    type: 'GET',
    success: function (res) {
      console.log("server says", res);
    },
    error: function (errorDet) {
      console.error("Error on req", errorDet);
    }
  });
}
