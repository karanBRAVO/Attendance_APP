const stdName = document.getElementById("stdName");
const stdRoll = document.getElementById("stdRoll");
const stdSub = document.getElementById("stdSub");
const teacher_name = document.getElementById("teacher_name");
const teacher_id = document.getElementById("teacher_id");
const stdMail = document.getElementById("stdMail");
const markAtt_form = document.getElementById("markAtt_form");
const mark_presentBtn = document.getElementById("mark_presentBtn");

mark_presentBtn.addEventListener("click", () => {
  let student_name = String(stdName.value);
  let student_roll = String(stdRoll.value);
  let student_sub = String(stdSub.value);
  let t_name = String(teacher_name.value);
  let t_id = String(teacher_id.value);
  let student_mail = String(stdMail.value);

  if (
    student_name.length > 0 &&
    student_roll.length > 0 &&
    student_sub.length > 0 &&
    t_name.length > 0 &&
    t_id.length > 0 &&
    student_mail.length > 0
  ) {
    let confirmation = confirm("Do you want to continue?");
    if (confirmation) {
      markAtt_form.action = "/mark-attendance";
      markAtt_form.method = "post";
    }
  } else {
    alert("Please fill out the form");
    markAtt_form.action = "/student-app-mark-attendance";
    markAtt_form.method = "get";
  }
});
