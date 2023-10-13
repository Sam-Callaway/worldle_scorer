function InitApiCall(){

    const url = ''// add api url here

    fetch(url)
        .then(response => {
        // Check if the response is successful
            if (!response.ok) {
            throw new Error('Network response was not ok');
            }
            // If successful, parse the JSON in the response
            return response.json();
            })
            .then(data => {
            // Process the data from the response
            return(data);
            })
            .catch(error => {
            // Handle any errors during the fetch operation
            console.error('There has been a problem with your fetch operation:', error);
        });
    }
export default InitApiCall;