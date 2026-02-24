// Load saved students when page loads
document.addEventListener("DOMContentLoaded", loadStudents);

function addStudent(){
let name = document.getElementById("name").value.trim();
let roll = document.getElementById("roll").value.trim();

if(name === "" || roll === ""){
alert("Fill all fields");
return;
}

let student = {name, roll};

let students = getStudents();
students.push(student);

localStorage.setItem("students", JSON.stringify(students));

displayStudent(student);

document.getElementById("name").value="";
document.getElementById("roll").value="";
}

function getStudents(){
return JSON.parse(localStorage.getItem("students")) || [];
}

function loadStudents(){
let students = getStudents();
students.forEach(student => displayStudent(student));
}

function displayStudent(student){
let li = document.createElement("li");
li.innerHTML = student.name + " (" + student.roll + ")";

let delBtn = document.createElement("button");
delBtn.textContent = "Delete";

delBtn.onclick = function(){
li.remove();
deleteStudent(student.roll);
};

li.appendChild(delBtn);
document.getElementById("list").appendChild(li);
}

function deleteStudent(roll){
let students = getStudents();
students = students.filter(s => s.roll !== roll);
localStorage.setItem("students", JSON.stringify(students));
}

let display = document.getElementById("display");

function appendValue(value){
display.value += value;
}

function clearDisplay(){
display.value = "";
}

function deleteLast(){
display.value = display.value.slice(0,-1);
}

function calculate(){
try{
display.value = eval(display.value);
}
catch{
alert("Invalid Expression");
}
}

const accessKey = "DbNM4cOOhkk03DMCUQ5o_tkFlfkKcVmaiEZdISLG7jU";

function searchImages(){

let query = document.getElementById("searchInput").value.trim();
let resultsDiv = document.getElementById("results");

if(query === ""){
alert("Enter something to search");
return;
}

resultsDiv.innerHTML = "Loading...";

fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${accessKey}`)
.then(response => {
if(!response.ok){
throw new Error("API Error: " + response.status);
}
return response.json();
})
.then(data => {

resultsDiv.innerHTML = "";

data.results.forEach(photo => {
let img = document.createElement("img");
img.src = photo.urls.small;
resultsDiv.appendChild(img);
});

})
.catch(error => {
resultsDiv.innerHTML = error.message;
});
}

let passwordInput = document.getElementById("password");
let strengthText = document.getElementById("strength");

passwordInput.addEventListener("input", function(){

let password = passwordInput.value;

let strength = 0;

// Length
if(password.length >= 8){
document.getElementById("length").innerHTML = "✅ At least 8 characters";
strength++;
}else{
document.getElementById("length").innerHTML = "❌ At least 8 characters";
}

// Uppercase
if(/[A-Z]/.test(password)){
document.getElementById("uppercase").innerHTML = "✅ One uppercase letter";
strength++;
}else{
document.getElementById("uppercase").innerHTML = "❌ One uppercase letter";
}

// Number
if(/[0-9]/.test(password)){
document.getElementById("number").innerHTML = "✅ One number";
strength++;
}else{
document.getElementById("number").innerHTML = "❌ One number";
}

// Symbol
if(/[^A-Za-z0-9]/.test(password)){
document.getElementById("symbol").innerHTML = "✅ One special character";
strength++;
}else{
document.getElementById("symbol").innerHTML = "❌ One special character";
}

// Strength Result
if(strength <= 1){
strengthText.innerHTML = "Weak Password";
strengthText.style.color = "red";
}
else if(strength <= 3){
strengthText.innerHTML = "Medium Password";
strengthText.style.color = "orange";
}
else{
strengthText.innerHTML = "Strong Password";
strengthText.style.color = "green";
}

});