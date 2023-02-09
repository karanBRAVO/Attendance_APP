const viewBtn = document.getElementById("viewBtn");
const tableContainer = document.getElementById("tableContainer");
const table = document.getElementById("table");

viewBtn.addEventListener("click", () => {
    tableContainer.style.display = 'block';
    let numberOfStudents = 10;
    addElementsToTable(numberOfStudents);
})

function addElementsToTable(numberOfStudents) {
    for (let num = 1; num <= numberOfStudents; num++) {
        let tr = document.createElement("tr");
        for (let i = 0; i < 4; i++) {
            let td = document.createElement("td");
            if (i == 0) {
                td.innerHTML = `${num}.`;
            }
            else if (i == 1) {
                td.innerHTML = `std_name`;
            }
            else if (i == 2) {
                td.innerHTML = `std_id`;
            }
            else if (i == 3) {
                if (num % 2 == 0) {
                    td.innerHTML = `A`;
                }
                else {
                    td.innerHTML = `P`;
                }
                if (td.innerHTML.toLowerCase() == 'p') {
                    td.className = 'present';
                }
                else {
                    td.className = 'absent';
                }
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
}