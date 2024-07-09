//lert("Script is working!!")

let form = document.getElementById("form");
function handleForm(event) { 
    event.preventDefault(); 
    formData.topic = document.getElementById("topic").innerText;
    console.log(document.getElementById("form")[0].innerText);
    formData.hours = document.getElementById("hours").innerText;
    formData.mins = document.getElementById("mins").innerText;
    formData.link = document.getElementById("link").innerText;
    console.log(formData)
} 
form.addEventListener('submit', handleForm);

let overlay = document.getElementById("overlay")
let bg = document.getElementsByTagName("table")
console.log(overlay)
let addTopic = document.getElementById("btn-add")
addTopic.addEventListener("click", ()=>{
    overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
    bg[0].style.filter = (bg[0].style.filter === "blur(6px)") ? "none" : "blur(6px)";
})

let btnShowHide = document.querySelectorAll(".showHide")

btnShowHide.forEach(btn => {
    btn.addEventListener("click", ()=> {
        console.log("Clicked")
    })
})



let formData = {
    topic: "",
    hours: "",
    mins: "",
    link: ""
}

let submitBtn = document.getElementById("btn-add-topic")

submitBtn.addEventListener("submit", ()=> {
    formData.topic = document.getElementById("topic").innerText;
    formData.hours = document.getElementById("hours").innerText;
    formData.mins = document.getElementById("mins").innerText;
    formData.link = document.getElementById("link").innerText;
    console.log(formData)
})

