var featureList = document.getElementById("features");

chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
    chrome.storage.local.get(['results', 'legitimatePercents', 'isPhish'], function (items) {
        let url = tabs[0].url;
        alert(url);
        var result = items.results[tabs[0].id];
        var isPhish = items.isPhish[tabs[0].id];
        var legitimatePercent = items.legitimatePercents[tabs[0].id];

        document.getElementById("legitimatePercents").innerText = legitimatePercent;

        // Prepare the visit data
        var visitData = {
            dns: "exampleDNS", // Replace this with the actual DNS if available
            url: url,
            dateTime: new Date().toISOString(),
            result: result
        };

        // Send the data to the backend
        fetch('http://localhost:8080/addVisit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(visitData)
        }).then(response => {
            if (response.ok) {
                console.log('Visit added successfully');
            } else {
                console.error('Failed to add visit');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    });
});

const redirectButton = document.getElementById('redirectButton');  // Assuming your button has this ID
redirectButton.addEventListener('click', () => {

    // Define the target URL to redirect to
    const targetUrl = "history.html";  // Replace with your desired URL
  
    // Use the chrome.tabs API to redirect the current tab
    chrome.tabs.update({ url: targetUrl });
  });
