//This is the utility function which opens the overlay to add the topics
function toggleOverlay() {
    let overlay = document.getElementById("overlay")
    let bg = document.getElementById("main-div")
    overlay.style.display = (overlay.style.display === "flex") ? "none" : "flex";
    bg.style.filter = (bg.style.filter === "blur(6px)") ? "none" : "blur(6px)";
}

//Toggle to open and close the Overlay
let addTopic = document.getElementById("btn-add")
addTopic.addEventListener("click", toggleOverlay)

//Overlay Close button
let closeOverlay = document.getElementById("close-overlay")
closeOverlay.addEventListener("click", () => {
    toggleOverlay();
})


//New Topic Form Data Handling Logic
let form = document.querySelector("#form");
function handleForm(event) {
    event.preventDefault();
    let fd = new FormData(form)
    let table = document.getElementById("table-body")
    table.innerHTML += `<tr class="show">
                <td><input type="checkbox" class="row-ckbx" /></td>
                <td>${fd.get("topic")}</td>
                <td>${fd.get("hours")} Hours ${fd.get("mins")} Minutes</td>
                <td><a href="${fd.get("link")}"> ${fd.get("link")} </td>
            </tr>`;
    toggleOverlay()

}
form.addEventListener('submit', handleForm);



let view = document.getElementById("view")


//A utility function for changing the view and updating the UI to show proper data.
function viewChanger() {
    if (view.value == "show") {
        let toHide = document.getElementsByClassName("hide")
        for (const i of toHide) {
            i.style.display = "none"
        }
        let toShow = document.getElementsByClassName("show")
        for (const i of toShow) {
            i.style.display = "table-row"
        }
        document.getElementById("view-toggle").innerText = "Hide";
        document.getElementById("btn-add").style.display = "table-row";
        uncheck();

    }
    if (view.value == "hide") {
        let toHide = document.getElementsByClassName("show")
        for (const i of toHide) {
            i.style.display = "none"
        }
        let toShow = document.getElementsByClassName("hide")
        for (const i of toShow) {
            i.style.display = "table-row"
        }
        document.getElementById("view-toggle").innerText = "Show";
        document.getElementById("btn-add").style.display = "none";
        uncheck();
    }

}
viewChanger()
view.addEventListener("change", viewChanger)

//A utility function that unchecks the checkboxes on UI Update
function uncheck() {
    let rows = document.getElementsByClassName("row-ckbx");
    for (const i of rows) {
        i.checked = false;
    }
    document.getElementById("master-ckbx").checked = false;
}


//This function returns an array containing the checked rows w.r.t. view.
function toChange(view) {
    let toHide = []
    if (view == "show") {
        let rows = document.getElementsByClassName("show");

        for (const i of rows) {
            if (i.children[0].children[0].checked) toHide.push(i);
        }
    }
    if (view == "hide") {
        let rows = document.getElementsByClassName("hide");

        for (const i of rows) {
            if (i.children[0].children[0].checked) toHide.push(i);
        }
    }
    return toHide
}

//This button triggers the change of classes and UI update.
let viewBtn = document.getElementById("view-toggle")
viewBtn.addEventListener("click", () => {

    if (view.value == "show") {
        //debugger;
        let rows = document.getElementsByClassName("show")
        let toHide = toChange("show");
        for (const i of toHide) {
            i?.classList?.replace("show", "hide")
        }
        uncheck();
        viewChanger();
    }
    if (view.value == "hide") {
        let rows = document.getElementsByClassName("hide")
        let toHide = toChange("hide");
        for (const i of toHide) {
            i.classList.replace("hide", "show")
        }
        uncheck();
        viewChanger();
    }

})


//Logic for master Checkbox which when checked checks all the checkboxes in the view.
let masterCheck = document.getElementById("master-ckbx")

masterCheck.addEventListener("change", () => {
    if (view.value == "show") {
        console.log(masterCheck.checked)
        let rows = document.getElementsByClassName("show")
        for (const i of rows) {
            i.children[0].children[0].checked = masterCheck.checked;
        }
    }
    if (view.value == "hide") {
        let rows = document.getElementsByClassName("hide")
        for (const i of rows) {
            console.log(masterCheck.checked)
            i.children[0].children[0].checked = masterCheck.checked;
        }
    }
})


