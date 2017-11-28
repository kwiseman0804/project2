// // Takes in all of the command line arguments
// var inputString = process.argv;

// // User creation inputs
// var sex = inputString[2];
// var height = inputString[3];
// var age = inputString[4];
// var weight = inputString[5];

// //activity user inputs
// var activity = inputString[6];
// var speed = inputString[7];
// var duration = inputString[8];
// var intensity = inputString[9];

$(document).ready(function() {

var url = window.location.href;
var userId, activityId;
var sex;
var height;
var weight;
var activity;
var speed;
var duration;
var intensity;
 console.log(url);




var getUserInfo = function(userId) {
  $.get("/api/users/" + userId, function(data) {
    getActivityInfo(userId);
    sex = data.gender;
    height = data.height;
    weight = data.weight;
    console.log(sex);
  });


};

if(url.indexOf("user_id")!== -1) {
  userId = url.split("=")[1];
  getUserInfo(userId);

}

var getActivityInfo = function(userId) {
$.get("/api/calories/" + userId, function(data){
  activity = data.activity;
  speed = data.speed;
  duration = data.duration;
  intensity = data.intensity;
  console.log(activity, speed, duration, intensity);
});
}

var calculateCalories = function(sex, height, age, weight, activity, speed, duration, intensity) {

//used to interpolate between upper and lower linear equations
var lastPound = parseFloat(weight.slice(-1));

//magic number "coefficient" variables
var lowerSlope;
var upperSlope;
var lowerYIntercept;
var upperYIntercept;

//the variables modified by the user inputs
var outputCaloriesPerMinute;
var rmr;
var outputCalories;

//resting metabolic rate calculation
if (sex === "female") {
  rmr = (9.99 * (parseFloat(weight)*.454))+(6.25 * parseFloat(height))-(4.92*parseFloat(age))-161;
}else if (sex === "male"){
  rmr = (9.99 * (parseFloat(weight)*.454))+(6.25 * parseFloat(height))-(4.92*parseFloat(age))+5;
}

//select slope and y-intercept for lower weight and upper weight based on activity
if (activity === "running") {
  if(weight >= "100" && weight <= "110") {
    lowerSlope = 1.2;
    upperSlope = 1.33;
    lowerYIntercept = 0.0333;
    upperYIntercept = -0.00833;
  }else if(weight >= "110" && weight <= "120") {
    lowerSlope = 1.33;
    upperSlope = 1.4;
    lowerYIntercept = -0.00833;
    upperYIntercept = .333;
  }else if(weight >= "120" && weight <= "130") {
    lowerSlope = 1.4;
    upperSlope = 1.53;
    lowerYIntercept = .333;
    upperYIntercept = .292;
  }else if(weight >= "130" && weight <= "140") {
    lowerSlope = 1.53;
    upperSlope = 1.65;
    lowerYIntercept = .292;
    upperYIntercept = .283;
  }else if(weight >= "140" && weight <= "150") {
    lowerSlope = 1.65;
    upperSlope = 1.78;
    lowerYIntercept = .283;
    upperYIntercept = .275;
  }else if(weight >= "150" && weight <= "160") {
    lowerSlope = 1.78;
    upperSlope = 1.9;
    lowerYIntercept = .275;
    upperYIntercept = .233;
  }else if(weight >= "160" && weight <= "170") {
    lowerSlope = 1.9;
    upperSlope = 2.03;
    lowerYIntercept = .233;
    upperYIntercept = .225;
  }else if(weight >= "170" && weight <= "180") {
    lowerSlope = 2.03;
    upperSlope = 2.15;
    lowerYIntercept = .225;
    upperYIntercept = .217;
  }else if(weight >= "180" && weight <= "190") {
    lowerSlope = 2.15;
    upperSlope = 2.25;
    lowerYIntercept = .217;
    upperYIntercept = .383;
  }else if(weight >= "190" && weight <= "200") {
    lowerSlope = 2.25;
    upperSlope = 2.38;
    lowerYIntercept = .383;
    upperYIntercept = .375;
  }
};

if (activity === "cycling") {
  if(weight >= "100" && weight <= "110") {
    lowerSlope = 0.62;
    upperSlope = 0.7;
    lowerYIntercept = -1.9;
    upperYIntercept = -2.43;
  }else if(weight >= "110" && weight <= "120") {
    lowerSlope = 0.7;
    upperSlope = 0.76;
    lowerYIntercept = -2.43;
    upperYIntercept = -2.6;
  }else if(weight >= "120" && weight <= "130") {
    lowerSlope = 0.76;
    upperSlope = 0.82;
    lowerYIntercept = -2.6;
    upperYIntercept = -2.7;
  }else if(weight >= "130" && weight <= "140") {
    lowerSlope = 0.82;
    upperSlope = 0.9;
    lowerYIntercept = -2.7;
    upperYIntercept = -3.37;
  }else if(weight >= "140" && weight <= "150") {
    lowerSlope = 0.9;
    upperSlope = 0.96;
    lowerYIntercept = -3.37;
    upperYIntercept = -3.4;
  }else if(weight >= "150" && weight <= "160") {
    lowerSlope = 0.96;
    upperSlope = 1.02;
    lowerYIntercept = -3.4;
    upperYIntercept = -3.57;
  }else if(weight >= "160" && weight <= "170") {
    lowerSlope = 1.02;
    upperSlope = 1.06;
    lowerYIntercept = -3.57;
    upperYIntercept = -3.37;
  }else if(weight >= "170" && weight <= "180") {
    lowerSlope = 1.06;
    upperSlope = 1.14;
    lowerYIntercept = -3.37;
    upperYIntercept = -3.87;
  }else if(weight >= "180" && weight <= "190") {
    lowerSlope = 1.14;
    upperSlope = 1.21;
    lowerYIntercept = -3.87;
    upperYIntercept = -4.2;
  }else if(weight >= "190" && weight <= "200") {
    lowerSlope = 1.21;
    upperSlope = 1.27;
    lowerYIntercept = -4.2;
    upperYIntercept = -4.4;
  }
};

if (activity === "swimming" && speed <= 35) {
  if(weight >= "100" && weight <= "110") {
    lowerSlope = 0.08;
    upperSlope = 0.1;
    lowerYIntercept = 2;
    upperYIntercept = 1.9;
  }else if(weight >= "110" && weight <= "120") {
    lowerSlope = 0.1;
    upperSlope = 0.11;
    lowerYIntercept = 1.9;
    upperYIntercept = 2.05;
  }else if(weight >= "120" && weight <= "130") {
    lowerSlope = 0.11;
    upperSlope = 0.12;
    lowerYIntercept = 2.05;
    upperYIntercept = 2.2;
  }else if(weight >= "130" && weight <= "140") {
    lowerSlope = 0.12;
    upperSlope = 0.12;
    lowerYIntercept = 2.2;
    upperYIntercept = 2.6;
  }else if(weight >= "140" && weight <= "150") {
    lowerSlope = 0.12;
    upperSlope = 0.13;
    lowerYIntercept = 2.6;
    upperYIntercept = 2.75;
  }else if(weight >= "150" && weight <= "160") {
    lowerSlope = 0.13;
    upperSlope = 0.14;
    lowerYIntercept = 2.75;
    upperYIntercept = 2.9;
  }else if(weight >= "160" && weight <= "170") {
    lowerSlope = 0.14;
    upperSlope = 0.15;
    lowerYIntercept = 2.9;
    upperYIntercept = 3.05;
  }else if(weight >= "170" && weight <= "180") {
    lowerSlope = 0.15;
    upperSlope = 0.16;
    lowerYIntercept = 3.05;
    upperYIntercept = 3.2;
  }else if(weight >= "180" && weight <= "190") {
    lowerSlope = 0.16;
    upperSlope = 0.16;
    lowerYIntercept = 3.2;
    upperYIntercept = 3.6;
  }else if(weight >= "190" && weight <= "200") {
    lowerSlope = 0.16;
    upperSlope = 0.17;
    lowerYIntercept = 3.6;
    upperYIntercept = 3.75;
  }
};

if (activity === "swimming" && speed > 35) {
  if(weight >= "100" && weight <= "110") {
    lowerSlope = 0.147;
    upperSlope = 0.153;
    lowerYIntercept = -0.333;
    upperYIntercept = 0.0333;
  }else if(weight >= "110" && weight <= "120") {
    lowerSlope = 0.153;
    upperSlope = 0.173;
    lowerYIntercept = 0.0333;
    upperYIntercept = -0.167;
  }else if(weight >= "120" && weight <= "130") {
    lowerSlope = 0.173;
    upperSlope = 0.187;
    lowerYIntercept = -0.167;
    upperYIntercept = -0.133;
  }else if(weight >= "130" && weight <= "140") {
    lowerSlope = 0.187;
    upperSlope = 0.207;
    lowerYIntercept = -0.133;
    upperYIntercept = -0.433;
  }else if(weight >= "140" && weight <= "150") {
    lowerSlope = 0.207;
    upperSlope = 0.22;
    lowerYIntercept = -0.433;
    upperYIntercept = -0.4;
  }else if(weight >= "150" && weight <= "160") {
    lowerSlope = 0.22;
    upperSlope = 0.233;
    lowerYIntercept = -0.4;
    upperYIntercept = -0.367;
  }else if(weight >= "160" && weight <= "170") {
    lowerSlope = 0.233;
    upperSlope = 0.247;
    lowerYIntercept = -0.367;
    upperYIntercept = -0.333;
  }else if(weight >= "170" && weight <= "180") {
    lowerSlope = 0.247;
    upperSlope = 0.267;
    lowerYIntercept = -0.333;
    upperYIntercept = -0.533;
  }else if(weight >= "180" && weight <= "190") {
    lowerSlope = 0.267;
    upperSlope = 0.287;
    lowerYIntercept = -0.533;
    upperYIntercept = -0.833;
  }else if(weight >= "190" && weight <= "200") {
    lowerSlope = 0.287;
    upperSlope = 0.3;
    lowerYIntercept = -0.833;
    upperYIntercept = -0.8;
  }
};


//calulate output calories per minute of avtivity 
if(activity === "running" || activity === "cycling" || activity === "swimming"){
  //this equation breaks down to:  outputCaloriesPerMinute = (value to nearest 10lbs above weight)-(value to nearest 10lbs below weight)*(x/10)+(value to nearest 10lbs below weight)
  //or the per pound difference between the upper linear equation and the lower added to the value of the lower linear equation
  outputCaloriesPerMinute = (lastPound*((upperSlope*speed+upperYIntercept)-(lowerSlope*speed+lowerYIntercept))/10)+(lowerSlope*speed+lowerYIntercept);
}else if(activity === "lifting"){
  outputCaloriesPerMinute = 0.0528*weight + (-0.105);
}else if(activity === "aerobic"){
  outputCaloriesPerMinute = 0.0461*weight + (0.105);
}
//calories per minute multiplied by time length of activity 
outputCalories = outputCaloriesPerMinute*duration;

// Prints the outputNumber
console.log("calories per minute = "+outputCaloriesPerMinute);
console.log("output calories = "+outputCalories);
console.log("rmr = "+rmr);

//Daily nutrient requirments for training variable declaration
var carbsPerLbUpper;
var carbsPerLbLower;
var proteinPerLbUpper;
var proteinPerLbLower;
var fatPerLbUpper;
var fatPerLbLower;
var carbsPerDayLower;
var carbsPerDayUpper
var proteinPerDayLower;
var proteinPerDayUpper
var fatPerDayLower;
var fatPerDayUpper;

//nutrient recomendation based on training intensity
if(intensity === "moderate"){
  carbsPerLbLower = 2.3;
  carbsPerLbUpper = 3.0; 
  proteinPerLbLower = 0.5;
  proteinPerLbUpper = 0.5;
  fatPerLbLower = 0.5;
  fatPerLbUpper = 0.5;
}else if(intensity === "heavy"){
  carbsPerLbLower = 2.7;
  carbsPerLbUpper = 4.5;
  proteinPerLbLower = 0.5;
  proteinPerLbUpper = 0.8;
  fatPerLbLower = 0.5;
  fatPerLbUpper = 0.6; 
}else if(intensity === "very heavy"){
  carbsPerLbLower = 3.6;
  carbsPerLbUpper = 5.5;
  proteinPerLbLower = 0.8;
  proteinPerLbUpper = 0.9;
  fatPerLbLower = 0.5;
  fatPerLbUpper = 0.8;
};

//calulate daily macro nutrient requirements
carbsPerDayLower = weight*carbsPerLbLower;
carbsPerDayUpper = weight*carbsPerLbUpper;
proteinPerDayLower = weight*proteinPerLbLower;
proteinPerDayUpper = weight*proteinPerLbUpper;
fatPerDayLower = weight*fatPerLbLower;
fatPerDayUpper = weight*fatPerLbUpper;

console.log("carbs L = "+carbsPerDayLower);
console.log("carbs U = "+carbsPerDayUpper);
console.log("protein L = "+proteinPerDayLower);
console.log("protein U = "+proteinPerDayUpper);
console.log("fat L = "+fatPerDayLower);
console.log("fat U = "+fatPerDayUpper);


}
});




