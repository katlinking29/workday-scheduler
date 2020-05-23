// Adds the current date to the header
var date = moment().format('dddd, MMMM Do YYYY');
$("#currentDay").text(date);

// Setting a variable to store the current time (hour)
var currentTime = moment().hours();

//Creating rows for each hour between 9am - 5pm
for (hour = 9; hour < 18; hour++) {
//Creating divs that will contain my rows for where the time will be displayed in the planner 
  var row = $("<div>")    
  row.addClass("row time");
  $(".container").append(row);
  var timeColumn = $("<h1>");
  timeColumn.addClass("col-lg-2 time");
  row.attr("data-hour", hour);
  row.append(timeColumn);
 
  if (hour < 12) {
    hourDisplay = hour + "am";
    timeColumn.text(hourDisplay);
  }

  else if (hour == 12) {
    hourDisplay = hour + "pm"
    timeColumn.text(hourDisplay);
  }

  else if (hour > 12) {
    hourDisplay = hour - 12 + "pm"; 
    timeColumn.text(hourDisplay);
  }
  
// Creating input fields for where the user will type their events into the planner
  var plansColumn = $("<input>"); 
  plansColumn.addClass("col-lg-9 textarea");
  plansColumn.attr("type", "text");
  row.append(plansColumn);

// Appending a save button to the input element, so the user can save their event. When the user clicks save, this should store the event in local storage so the scheduler is persistant. 
  var saveButton = $("<button>"); 
  saveButton.addClass("col-lg-1 saveBtn");
  saveButton.text("Save");
  row.append(saveButton);
  
}

// Adjusting the row color based on the time of day
// For each element with the class "time", check to see if the current time = the data-hour value and add a class to the row 
$(".time").each(function(){
  if (currentTime == $(this).data("hour")) {
    $(this).addClass("present");
  }
  
  else if (currentTime > $(this).data("hour")){
    $(this).addClass("past");
  }
  
  else if (currentTime < $(this).data("hour")) {
    $(this).addClass("future");
  }
})

//Store the user's text in the input field into an array
var userPlans =  [];

// When the save button is clicked, the user's text is saved in local storage as a string
$(".saveBtn").on("click", function(event){
  event.preventDefault();
  var userPlanText = $(".textarea").val();
  userPlans.push(userPlanText);
  localStorage.setItem("userPlans", JSON.stringify(userPlans));
})

function init() {
  // Get stored userPlans from localStorage
  // Parsing the JSON string to an object
  var storedPlans = JSON.parse(localStorage.getItem("userPlans"));

  // If userPlans were retrieved from localStorage, update the userPlans array to it
  if (storedPlans !== null) {
    userPlans = storedPlans;
    $("<input>").text(userPlans);
  }
  console.log(userPlans);
}

init()





    

