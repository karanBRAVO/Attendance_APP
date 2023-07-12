try {
  const stdCount = document.getElementById("stdCount");
  const stdSub = document.getElementById("stdSub");
  const getCodeBtn = document.getElementById("getCodeBtn");
  const getCodeForm = document.getElementById("getCodeForm");

  getCodeBtn.addEventListener("click", () => {
    let studentCount = Number(stdCount.value);
    let studentSubject = String(stdSub.value);
    
    if (studentCount > 0 && studentSubject.length > 0) {
      let confirm_head = confirm("Do you want to generate code?");
      if (confirm_head) {
        getCodeForm.action = "/head-session-get-code";
        getCodeForm.method = "post";
      } else {
        getCodeForm.action = "/head-start-session";
        getCodeForm.method = "get";
      }
    } else {
      alert("Please enter the number of students");
      getCodeForm.action = "/head-start-session";
      getCodeForm.method = "get";
    }
  });
} catch (TypeError) {
  console.log(`Changed`);
}

try {
  const copyCodeBtn = document.getElementById("copyCodeBtn");
  copyCodeBtn.addEventListener("click", () => {
    const codeSpan = document.getElementById("codeSpan");
    navigator.clipboard.writeText(codeSpan.innerText);
    alert("Code copied");
  });
} catch (TypeError) {
  console.log("Message");
}
