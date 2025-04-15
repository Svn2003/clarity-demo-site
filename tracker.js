 console.log("Click logged:", clicks[clicks.length - 1]);
}

// Attach listener to all buttons
document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", logClick);
});

// When user leaves the page, download the CSV
window.addEventListener("beforeunload", function () {
  if (clicks.length > 0) {
    let csv = "Element,Time,TimeSpent(s)\n";
    clicks.forEach(row => {
      csv += `${row.element},${row.time},${row.timeSpent}\n`;
    });

    let blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "user_behavior.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});
