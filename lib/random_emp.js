let employee = ["santosh","ganesh","kiran","sachin","Amol","deepak","akash"];

exports.getRandomEmp = function(){
  var Emp_index = Math.floor(Math.random() * employee.length);
  return employee[Emp_index];
}	
