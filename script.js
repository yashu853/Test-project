const students = ["Siva", "Rajesh", "Ashok", "Sai", "Haritha", "Ram", "Krishna", "Anu", "Anura", "Adi", "Venkat"];

document.addEventListener("DOMContentLoaded", () => {
  // Set today's date by default
  const today = new Date().toISOString().split('T')[0];
  document.getElementById("date").value = today;

  document.getElementById("searchBtn").addEventListener("click", loadStudents);
  document.getElementById("submitBtn").addEventListener("click", markAttendance);
  document.getElementById("fetchBtn").addEventListener("click", fetchReport);
});

function loadStudents() {
  const dateInput = document.getElementById("date");
  const date = dateInput.value;

  if (!date) {
    alert("Please select a date first!");
    dateInput.focus();
    dateInput.style.border = "2px solid red";
    return;
  }

  dateInput.style.border = "";

  const form = document.getElementById("attendanceForm");
  const report = document.getElementById("reportView");
  form.innerHTML = "";
  report.innerHTML = "";
  report.style.display = "none";

  students.forEach((student, index) => {
    const div = document.createElement("div");
    div.className = "student-row";
    div.innerHTML = `
      <span><strong>${student}</strong></span>
      <label><input type="radio" name="student${index}" value="Present"> Present</label>
      <label><input type="radio" name="student${index}" value="Absent"> Absent</label>
    `;
    form.appendChild(div);
  });

  document.getElementById("submitBtn").style.display = "inline-block";
  form.style.display = "block";
}

function markAttendance() {
  const form = document.getElementById("attendanceForm");
  const rows = form.getElementsByClassName("student-row");

  Array.from(rows).forEach((row, index) => {
    const name = students[index];
    const selected = row.querySelector(`input[name=student${index}]:checked`);
    const status = selected ? selected.value : "Absent";

    const statusHTML = status === "Present"
      ? `<span class="status-icon present">✔ Present</span>`
      : `<span class="status-icon absent">✖ Absent</span>`;

    row.innerHTML = `<span><strong>${name}</strong></span>${statusHTML}`;
  });

  document.getElementById("submitBtn").style.display = "none";
}

function fetchReport() {
  const reportData = [
    { name: "Siva", present: 3, total: 3 },
    { name: "Rajesh", present: 3, total: 3 },
    { name: "Ashok", present: 2, total: 3 },
    { name: "Sai", present: 2, total: 3 },
    { name: "Haritha", present: 3, total: 3 },
    { name: "Ram", present: 3, total: 3 },
    { name: "Krishna", present: 3, total: 3 },
    { name: "Anu", present: 3, total: 3 },
    { name: "Anura", present: 2, total: 3 },
    { name: "Adi", present: 2, total: 3 },
    { name: "Venkat", present: 2, total: 3 }
  ];

  let reportHTML = `<h3 style="margin-top: 20px;">Attendance Report</h3>
  <table border="1" cellpadding="8" cellspacing="0">
    <tr style="background-color: #4CAF50; color: white;">
      <th>Name</th>
      <th>Attendance</th>
      <th>Percentage</th>
    </tr>`;

  reportData.forEach((student) => {
    const percentage = ((student.present / student.total) * 100).toFixed(0);
    reportHTML += `
      <tr>
        <td>${student.name}</td>
        <td>${student.present}/${student.total}</td>
        <td>${percentage}%</td>
      </tr>`;
  });

  reportHTML += `</table>`;

  const reportView = document.getElementById("reportView");
  reportView.innerHTML = reportHTML;
  reportView.style.display = "block";
}
