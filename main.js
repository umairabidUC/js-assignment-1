//lert("Script is working!!")


function toggleOverlay() {

    let overlay = document.getElementById("overlay")
    let bg = document.getElementById("main-div")
    overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
    bg.style.filter = (bg.style.filter === "blur(6px)") ? "none" : "blur(6px)";

}
let addTopic = document.getElementById("btn-add")
addTopic.addEventListener("click", toggleOverlay)

let btnShowHide = document.querySelectorAll(".showHide")

btnShowHide.forEach(btn => {
    btn.addEventListener("click", () => {
        console.log("Clicked")
    })
})



let form = document.querySelector("#form");
function handleForm(event) {
    event.preventDefault();
    let fd = new FormData(form)
    let table = document.getElementById("table-body")
    table.innerHTML += `<tr class="show">
                <td><input type="checkbox" class="row-ckbx" /></td>
                <td>${fd.get("topic")}</td>
                <td>${fd.get("hours")} Hours ${fd.get("mins")} Minutes</td>
                <td><a href="${fd.get("link")}"> Link </td>
            </tr>`;
    toggleOverlay()

}
form.addEventListener('submit', handleForm);

let view = document.getElementById("view")

function viewChanger(){
    if(view.value == "show") {
        let toHide = document.getElementsByClassName("hide")
        for(const i of toHide){
            i.style.display = "none"
        }
        let toShow = document.getElementsByClassName("show")
        for(const i of toShow){
            i.style.display = "table-row"
        }
        document.getElementById("view-toggle").innerText = "Hide";
        document.getElementById("btn-add").style.display = "table-row";

    }
    if(view.value == "hide"){
        let toHide = document.getElementsByClassName("show")
        for(const i of toHide){
            i.style.display = "none"
        }
        let toShow = document.getElementsByClassName("hide")
        for(const i of toShow){
            i.style.display = "table-row"
        }
        document.getElementById("view-toggle").innerText = "Show";
        document.getElementById("btn-add").style.display = "none";
    }
    
}

view.addEventListener("change", viewChanger)
function uncheck(){
    let rows = document.getElementsByClassName("row-ckbx");
    for(const i of rows){
        i.checked = false;
    }
    document.getElementById("master-ckbx").checked = false;
}

function toChange(view){
    let toHide = []
    let toHideIndex = 0

    if(view == "show"){
        let rows = document.getElementsByClassName("show");
        
        for(const i of rows){
           if(i.children[0].children[0].checked) toHide.push(i);
           toHideIndex++; 
        }
    }
    if (view == "hide"){
        let rows = document.getElementsByClassName("hide");
        
        for(const i of rows){
           if(i.children[0].children[0].checked) toHide.push(i);
           toHideIndex++; 
        }
    }
    return toHide
}

let viewBtn = document.getElementById("view-toggle")
viewBtn.addEventListener("click", () => {
   
    if (view.value == "show") {
        //debugger;
        let rows = document.getElementsByClassName("show")
        let toHide = toChange("show");
        for (const i of toHide) {
            i?.classList?.replace("show","hide")
        }
        uncheck();
        viewChanger();
    }
    if (view.value == "hide"){
        let rows = document.getElementsByClassName("hide")
        let toHide = toChange("hide");
        for (const i of toHide) {
            i.classList.replace("hide","show")
        }
        uncheck();
        viewChanger();
    }

})

let masterCheck = document.getElementById("master-ckbx")

masterCheck.addEventListener("change", () => {
    if (view.value == "show") {
        console.log(masterCheck.checked)
        let rows = document.getElementsByClassName("show")
        for(const i of rows){
            i.children[0].children[0].checked = masterCheck.checked;
        }
    }
    if (view.value == "hide") {
        let rows = document.getElementsByClassName("hide")
        for(const i of rows){
            console.log(masterCheck.checked)
            i.children[0].children[0].checked = masterCheck.checked;
        }
    }
})


