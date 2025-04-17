let sessionStart = new Date();
let clicks = [];

function logClick(event) {
  let clickedElement = event.target.innerText;
  let time = new Date();
  let timeSpent = Math.floor((time - sessionStart) / 1000); // seconds

  clicks.push({
    element: clickedElement,
    time: time.toISOString(),
    timeSpent: timeSpent
  });

  console.log("Click logged:", clicks[clicks.length - 1]);
}

document.querySelectorAll("button").forEach(btn => {
  btn.addEventListener("click", logClick);
});

window.addEventListener("beforeunload", function () {
  if (clicks.length > 0) {
    let csvContent = "data:text/csv;charset=utf-8,Element,Time,TimeSpent(s)\n";
    clicks.forEach(row => {
      csvContent += `${row.element},${row.time},${row.timeSpent}\n`;
    });

    let encodedUri = encodeURI(csvContent);
    let link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_clicks.csv");
    document.body.appendChild(link);
    link.click();
  }
});
