function submitForm(event) {
  event.preventDefault();

  // Get the form input values
  var temperature = document.getElementById("tempInput").value;
  var conversionType = document.querySelector(
    'input[name="convertType"]:checked'
  ).value;

  // Create a new XMLHttpRequest object
  var xhr = new XMLHttpRequest();

  // Configure the request
  xhr.open("POST", "/temp");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Set up the callback function to handle the response
  xhr.onload = function () {
    if (xhr.status === 200) {
      // Display the response under the form
      document.getElementById("responseContainer").innerHTML = xhr.responseText;
    } else {
      console.error("Request failed. Status: " + xhr.status);
    }
  };

  // Send the request with the form data
  xhr.send(
    "temp=" +
      encodeURIComponent(temperature) +
      "&convertType=" +
      encodeURIComponent(conversionType)
  );
}

document.getElementById("myForm").addEventListener("submit", submitForm);
