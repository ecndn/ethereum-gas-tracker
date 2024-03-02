
$api_key = "your_api_key";

function makeApiRequest() {
    const apiUrl = `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${$api_key}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.status === '1') {
                const gasPrices = data.result;
                displayGasPrices(gasPrices);
            } else {
                console.error('API Request Error:', data.message);
                alert('API Request Error:\n' + data.message);
            }
        })
        .catch(error => {
            console.error('API Request Error:', error);
            alert('API Request Error:\n' + error.message);
        });
}

function displayGasPrices(gasPrices) {
    const gasPricesDiv = document.getElementById('gasPrices');
    gasPricesDiv.innerHTML = ` 
      <div class="middle">
      <div class="score">
          <p><span>L</span> LOW</p>
          <h2>${gasPrices.SafeGasPrice}</h2>
      </div>
      <div class="score">
          <p><span>A</span> AVARAGE</p>
          <h2>${gasPrices.ProposeGasPrice}</h2>
      </div>
      <div class="score">
          <p><span>H</span> HIGH</p>
          <h2>${gasPrices.FastGasPrice}</h2>
      </div>
  </div> 
    `;
}

// Will be called once at startup
makeApiRequest();

// It will make an API request every 12 seconds
setInterval(makeApiRequest, 12 * 1000);
