let apiUrl = 'http://api.coindesk.com/v1/bpi/historical/close.json';


 function apiCall() {
    axios
        .get(apiUrl)
        .then(responseFromAPI => {
            printTheChart(responseFromAPI.data);
            console.log(responseFromAPI.data);
            
        })
        .catch(err => console.log("Error while getting the data: ", err));
} 


//graph 
function printTheChart(bitCoinData) {
    const dailyData = bitCoinData['bpi'];

    const bitcoinDates = Object.keys(dailyData);
    const bitcoinPrices = Object.values(dailyData);
    maxMin(bitcoinPrices);
    
    const ctx = document.getElementById("myChart").getContext("2d")
    const chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: bitcoinDates,
            datasets: [{
                label: "Bitcoin Chart",
                backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: bitcoinPrices
            }]
        }
    }); //closing chart

} // closing function printTheChart

apiCall()


document.getElementById('fromDate').addEventListener('input', (event) => {
    fromDate = event.target.value
   toDate= document.getElementById('toDate').value
    apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    apiCall()
  
    updateMaxMinAfterApiCall()
})

document.getElementById('toDate').addEventListener('input', (event) => {
    toDate = event.target.value
    fromDate= document.getElementById('fromDate').value
    apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}`
    apiCall()
   
    updateMaxMinAfterApiCall()
})
       
document.getElementById('currency').addEventListener('change', (event) => {
  let  currency = event.target.value
    apiUrl = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=${currency}`
    apiCall()
   
   
})

function maxMin(bitcoinPrices) {
    max = Math.max(...bitcoinPrices)
    min = Math.min(...bitcoinPrices)
    document.getElementById('maxValue').innerHTML = `Max:${max}`
    document.getElementById('minValue').innerHTML = `Min:${min}`
}


