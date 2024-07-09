//lert("Script is working!!")


function toggleOverlay() {

    let overlay = document.getElementById("overlay")
    let bg = document.getElementsByTagName("table")
    overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
    bg[0].style.filter = (bg[0].style.filter === "blur(6px)") ? "none" : "blur(6px)";

}
console.log(overlay)
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
    console.log(fd)
    console.log("_________")
    console.log(fd.get("topic"))
    for (const data of fd) {
        console.log(data)
    }
    let table = document.getElementById("table-body")
    table.innerHTML += `<tr>
                <td><input type="checkbox" class="row-ckbx" /></td>
                <td>${fd.get("topic")}</td>
                <td>${fd.get("hours")} Hours ${fd.get("mins")} Minutes</td>
                <td><a href="${fd.get("link")}"> Link </td>
                <td><button class="showHide" id="sh">Show/Hide</button></td>
            </tr>`;
    toggleOverlay()

}
form.addEventListener('submit', handleForm);




