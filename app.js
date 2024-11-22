document.getElementById("fetchButton").addEventListener("click", async () => {
    const ticker = document.getElementById("stockTicker").value.trim();
    const resultDiv = document.getElementById("result");
    const errorDiv = document.getElementById("error");
  
    resultDiv.innerHTML = ""; // Clear previous results
    errorDiv.innerHTML = ""; // Clear previous errors
  
    if (!ticker) {
      errorDiv.innerText = "Please enter a stock ticker.";
      return;
    }
  
    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${ticker}&apikey=YOUR_API_KEY`);
      const data = await response.json();
  
      if (data["Global Quote"] && data["Global Quote"]["01. symbol"]) {
        const symbol = data["Global Quote"]["01. symbol"];
        const price = data["Global Quote"]["05. price"];
        resultDiv.innerHTML = `<h2>${symbol}</h2><p>Current Price: $${price}</p>`;
      } else {
        errorDiv.innerText = "Invalid ticker. Please enter a valid U.S. stock symbol.";
      }
    } catch (error) {
      errorDiv.innerText = "Failed to fetch stock data. Please try again.";
    }
  });
  