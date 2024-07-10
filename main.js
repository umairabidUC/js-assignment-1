//This is the utility function which opens the overlay to add the topics


//Toggle to open and close the Overlay


//Overlay Close button

function minsToHours(min) {
    if (min > 59) {
        dec = (min / 60) % 1;
        hoursToAdd = Math.floor(min / 60);
        minsToAdd = Math.floor(dec * 60);
        return [hoursToAdd, minsToAdd]
    }
    else return [0,min]
}

//New Topic Form Data Handling Logic
let tooltipflag = false;
let form = document.querySelector("#form");
function handleForm(event) {
    debugger;
    event.preventDefault();
    let fd = new FormData(form)
    let mins = fd.get("mins")
    let hours = fd.get("hours")
    console.log(mins)
    let correctedHoursMins = minsToHours(mins);
    console.log(correctedHoursMins)
    fd.set("hours", Number(hours) + correctedHoursMins[0]);
    fd.set("mins", correctedHoursMins[1])

    let table = document.getElementById("table-body")
    table.innerHTML += `<tr class="show">
                <td><input type="checkbox" class="row-ckbx" /></td>
                <td>${fd.get("topic")}</td>
                <td>${fd.get("hours")} Hours ${fd.get("mins")} Minutes</td>
                <td><a href="${fd.get("link")}"> ${fd.get("link")} </td>
                <td><button type="button" class="btn btn-outline-danger delete" data-bs-toggle="modal"
                                data-bs-target="#confirmDeletion" data-mdb-ripple-init>Delete</button><button type="button"
                                class="btn btn-outline-warning edit" data-bs-toggle="modal"
                                data-bs-target="#editForm">Edit</button></td>
            </tr>`;
    tooltipflag = true;

}
form.addEventListener('submit', handleForm);



const toastLiveExample = document.getElementById('liveToast')
const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample)
let toastTrigger = document.getElementById("btn-add-topic")
toastTrigger.addEventListener('click', () => {
    if(tooltipflag){
        toastBootstrap.show()
    }
    tooltipflag = false;
})
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




//Checkbox Errors Solution:
let ckbxs = document.getElementsByClassName("row-ckbx")


for (const ckbx of ckbxs) {
    ckbx.addEventListener("change", () => {
        let row_ckbx = document.getElementsByClassName("row-ckbx");
        console.log(row_ckbx[0].parentElement.parentElement.classList.value)
        let check = true;
        debugger;
        for (const i of row_ckbx) {
            if (check && i.parentElement.parentElement.classList.value == "show" && view.value == "show" && i.checked) {
                console.log(check);
            } else if (check && i.parentElement.parentElement.classList.value == "hide" && view.value == "hide" && i.checked) {
                console.log(check);
            } else if (i.parentElement.parentElement.classList.value == "show" && view.value == "hide") console.log(check);
            else if (i.parentElement.parentElement.classList.value == "hide" && view.value == "show") console.log(check);
            else check = false;
        }
        if (check) {
            masterCheck.checked = true;
        }
        else masterCheck.checked = false;
    })
}

//Deleting a Row:
let rowToDelete = document.getElementsByClassName("delete");



for(const del of rowToDelete){
    let row = del;
    del.addEventListener("click" ,()=>{
        document.getElementById("btn-confirm-delete").addEventListener("click", ()=>{
            row.parentElement.parentElement.remove()
        })
    })
}

let editBtn = document.getElementsByClassName("edit")
let currRow = null;
//let row = null;
for(const edit of editBtn){
    let row = edit.parentElement.parentElement;
    edit.addEventListener("click", ()=>{
        currRow = row;
        let topic = row.children[1].innerText;
        let hours = Number(row.children[2].innerText.split(" ")[0]);
        let mins = Number(row.children[2].innerText.split(" ")[2]);
        let link = row.children[3].innerText;
        let editForm = document.getElementById("edit-form-body").children
        editForm[1].value = topic;
        editForm[3].value = hours;
        editForm[5].value = mins;
        editForm[7].value = link;
    })
}

let editForm = document.getElementById("formEdit");

let link = null;
editForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    let ef = new FormData(editForm);
    let mins = ef.get("mins")
    let hours = ef.get("hours")
    console.log(mins)
    let correctedHoursMins = minsToHours(mins);
    console.log(correctedHoursMins)
    ef.set("hours", Number(hours) + correctedHoursMins[0]);
    ef.set("mins", correctedHoursMins[1])
    currRow.children[1].innerText = ef.get("topic");
    currRow.children[2].innerText = `${ef.get("hours")} Hours ${ef.get("mins")} Minutes`;
    link = currRow.children[3]
    currRow.children[3].children[0].href = ef.get("link");
    currRow.children[3].children[0].innerText = ef.get("link")

})