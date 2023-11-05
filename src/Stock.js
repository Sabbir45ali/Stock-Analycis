import React, { Component } from "react";
import Plot from "react-plotly.js";

class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stockChartXValues: [],
      stockChartYValues: [],
      currentPrice: 0,
      currentStock: '', // New state variable
    };
  }

  componentDidMount() {
    this.fetchStock("AAPL"); // Fetch AAPL data by default when the component mounts
  }

  fetchStock(stockSymbol) {
    const pointerToThis = this;
    const API_KEY = "pUqP6bCvmRi2h31dNItpeYUQsKLv4kDO";
    const API_Call = `https://api.polygon.io/v2/aggs/ticker/${stockSymbol}/range/1/day/2022-01-09/2023-01-09?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`;
    const stockChartXValuesFunction = [];
    const stockChartYValuesFunction = [];

    fetch(API_Call)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var key in data["results"]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data["results"][key]["l"]);
        }

        pointerToThis.setState({
          stockChartXValues: stockChartXValuesFunction,
          stockChartYValues: stockChartYValuesFunction,
          currentPrice: stockChartYValuesFunction[stockChartYValuesFunction.length - 1],
          currentStock: stockSymbol, // Update currentStock with the stock symbol
        });
      });
  }

  render() {
    return (
      <div className="container">
        <h1>Stock Market</h1>
        <div className="btn-group d-flex justify-content-center my-3" role="group">
          <button
            type="button"
            className="btn btn-dark my"
            onClick={() => this.fetchStock("AAPL")}
          >
            AAPL
          </button>
          <button
            type="button"
            className="btn btn-dark my"
            onClick={() => this.fetchStock("MSFT")}
          >
            MSFT
          </button>
          <button
            type="button"
            className="btn btn-dark my"
            onClick={() => this.fetchStock("TSLA")}
          >
            TSLA
          </button>
          <button
            type="button"
            className="btn btn-dark my"
            onClick={() => this.fetchStock("AMZN")}
          >
            AMZN
          </button>
          <button
            type="button"
            className="btn btn-dark my"
            onClick={() => this.fetchStock("META")}
          >
            META
          </button>
        </div>
        <div className="Text-container">
          <h3>
            Current Stock: {this.state.currentStock}, Price: ${this.state.currentPrice} {/* Display currentStock and currentPrice */}
          </h3>
        </div>
        <div className="plot-container">
          <Plot
            data={[
              {
                x: this.state.stockChartXValues,
                y: this.state.stockChartYValues,
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ title: "Stock Price" }}
            useResizeHandler={true}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className="container">
          
        </div>
      </div>
    );
  }
}

export default Stock;
