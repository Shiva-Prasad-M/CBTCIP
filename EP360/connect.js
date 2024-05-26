document.addEventListener("DOMContentLoaded", function () {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log("Connected to DB");
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error("Failed to connect to DB:", xhr.statusText);
    }
  };
  xhr.open("POST", "connect.js", true);
  xhr.send();
});
