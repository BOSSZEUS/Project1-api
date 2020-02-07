

// let stockSymbol = 'ups'
// currentDate = '2020-02-04'
// function stockInfo(stockSymbol, currentDate) {
$("#makeApiCall").on('click', function () {
  let stockSymbol = $("#searchBox").val()
  let currentTime = moment()
  let currentDate = currentTime.format('YYYY-MM-DD')
  console.log(currentDate)
  console.log(stockSymbol)

  let stockData = {}
  $.getJSON(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stockSymbol}&interval=5min&apikey=MF50LI0Q6H9V0VWV`, function (data) {
    stockData = {
      symbol: data['Meta Data']['2. Symbol'],
      open: data['Time Series (Daily)'][currentDate]['1. open'],
      high: data['Time Series (Daily)'][currentDate]['2. high'],
      low: data['Time Series (Daily)'][currentDate]['3. low'],
      close: data['Time Series (Daily)'][currentDate]['4. close']
    }

    console.log(stockData)

    // $("#cryptoSelector").on('change', function () {

    let cryptoData = {}
    cryptoName = $("#cryptoSelector").val()
    $.getJSON(`https://min-api.cryptocompare.com/data/price?fsym=${cryptoName}&tsyms=USD&api_key=0190464490a4a78ca623e065b1766167f8810d127b191c98a032bb28a9aa1604`)
      // https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD
      .then(({ cryptyName, USD }) => {
        console.log("cryptyName = " + cryptyName)
        console.log("dollarValue = " + USD)
        dollarValue = USD
        let coinType = dollarValue


        // Cant get these to calculate correctly
        let convertOpen = coinType / stockData.open
        let convertHigh = coinType / stockData.high
        let convertLow = coinType / stockData.low
        let convertClose = coinType / stockData.close
        // Cant get these to calculate correctly
        $("#stockCard").html(`
        <div class="card card-back">
        <div class="card-content white-text">
        <span class="right right-align">
        <h5 class="no-margin">Amt in Bitcoin: </h5>
        <p>${convertOpen} to Bitcoin: </p>
        <p>${convertHigh} to Bitcoin: </p>
        <p>${convertLow} to Bitcoin: </p>
        <p>${convertClose} to Bitcoin: </p>
        </span>
        <span class="card-title">${stockData.symbol}</span>
        <p>Open: $${stockData.open}</p>
        <p>High: $${stockData.high}</p>
        <p>Low: $${stockData.low}</p>
        <p>Close: $${stockData.close}</p>
        </div>
        <div class="card-action">
        <a href="#" class="right add-btn"><i class="material-icons">add_circle</i></a><br/>
        </div>
        </div>
        `)
      })
  })
    .catch(e => console.error(e))

  // })
  // stockInfo(stockSymbol, currentDate)
})