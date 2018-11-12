
let deletebtns = document.querySelectorAll('a.delete-trigger');
deletebtns.forEach(element => {
    element.addEventListener('click', () => {
        element.nextElementSibling.classList = 'in-view';
    })
});

let closebtns = document.querySelectorAll('button.form-close');
closebtns.forEach(element => {
    element.addEventListener('click', () => {
        element.parentElement.classList = 'hidden';
    })
});

popUp.style.display = "none";
function login(){
    
    if (document.getElementById("email").value==""){
        alert("Please input school email")
    }
    else if(document.getElementById("pwd").value == ""){
        alert("Please input ypur password")
    }
    
}

function reg(){
    if(document.getElementById("schemail").value =="" || document.getElementById("add").value =="" || document.getElementById("schname").value =="" || document.getElementById("name").value =="" || document.getElementById("pwdd").value ==""){
        alert('Incomplete details!')
    }
}

function comment(){
    if (document.getElementById("comments").value == ''){
        alert("No comment yet!")
    }
}

function editCell(field){
    popUp.style.display = "block";
}
function tog(field){
    // let a = document.getElementById("sel1").value;
    // document.getElementById(field).innerHTML = a;
    popUp.style.display = "none";
}
function getSelect(selectObject) {
    let value = selectObject.value;
    console.log(value);
    addSchName(value);
}
function addSchName(classNumber) {
    let container = document.getElementById("className");
    let container2 = document.getElementById("labelName");
    while (container.hasChildNodes()){
        container.removeChild(container.lastChild);
    }
    
    for(let i = 0; i < classNumber; i++) {
        let input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Class" + (i+1);
        input.name = "class" + (i+1);
        input.className = "form-control input-sm";
        container.appendChild(input);
        container.appendChild(document.createElement("br"));
    }
}
function edit1(){
    let a = prompt("Enter a subject");
    js1Mon1.innerHTML = a;
}
function edit2(){
    let a = prompt("Enter a subject");
    js1Mon2.innerHTML = a;
}
function edit3(){
    let a = prompt("Enter a subject");
    js1Mon3.innerHTML = a;
}
function edit4(){
    let a = prompt("Enter a subject");
    js1Mon4.innerHTML = a;
}
function edit5(){
    let a = prompt("Enter a subject");
    js1Mon5.innerHTML = a;
}
function edit6(){
    let a = prompt("Enter a subject");
    js1Mon6.innerHTML = a;
}
function edit7(){
    let a = prompt("Enter a subject");
    js1Mon7.innerHTML = a;
}
function edit8(){
    let a = prompt("Enter a subject");
    js1Mon8.innerHTML = a;
}
function edit9(){
    let a = prompt("Enter a subject");
    js2Mon1.innerHTML = a;
}
function edit10(){
    let a = prompt("Enter a subject");
    js2Mon2.innerHTML = a;
}
function edit11(){
    let a = prompt("Enter a subject");
    js2Mon3.innerHTML = a;
}
function edit12(){
    let a = prompt("Enter a subject");
    js2Mon4.innerHTML = a;
}
function edit13(){
    let a = prompt("Enter a subject");
    js2Mon5.innerHTML = a;
}
function edit14(){
    let a = prompt("Enter a subject");
    js2Mon6.innerHTML = a;
}
function edit15(){
    let a = prompt("Enter a subject");
    js2Mon7.innerHTML = a;
}
function edit16(){
    let a = prompt("Enter a subject");
    js2Mon8.innerHTML = a;
}
function edit17(){
    let a = prompt("Enter a subject");
    js3Mon1.innerHTML = a;
}
function edit18(){
    let a = prompt("Enter a subject");
    js3Mon2.innerHTML = a;
}
function edit19(){
    let a = prompt("Enter a subject");
    js3Mon3.innerHTML = a;
}
function edit20(){
    let a = prompt("Enter a subject");
    js3Mon4.innerHTML = a;
}
function edit21(){
    let a = prompt("Enter a subject");
    js3Mon5.innerHTML = a;
}
function edit22(){
    let a = prompt("Enter a subject");
    js3Mon6.innerHTML = a;
}
function edit23(){
    let a = prompt("Enter a subject");
    js3Mon7.innerHTML = a;
}
function edit24(){
    let a = prompt("Enter a subject");
    js3Mon8.innerHTML = a;
    
}




