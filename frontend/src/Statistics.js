import React from "react";
import { useNavigate } from "react-router-dom";
import Chart from "react-apexcharts"

class Statistics extends React.Component {
    constructor(){
        super()
        this.state = {
            pieChartData:{
                series: [44, 55, 13, 43, 22],
                options: {
                  chart: {
                    width: 380,
                    type: 'pie',
                  },
                  labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                  responsive: [{
                    breakpoint: 480,
                    options: {
                      chart: {
                        width: 200
                      },
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }]
                }
            },
            barChartData:{
                series: [{
                    data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
                  }],
                  options: {
                    chart: {
                      type: 'bar',
                      height: 350
                    },
                    plotOptions: {
                      bar: {
                        borderRadius: 4,
                        vertical: true,
                      }
                    },
                    dataLabels: {
                      enabled: false
                    },
                    xaxis: {
                      categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
                        'United States', 'China', 'Germany'
                      ],
                    }
                  }
            }
        }
    }

    render(){
        return(
            <div className="row col-md-10 offset-md-1" style={{backgroundColor: "white", padding: "10px"}}>
                <h3 style={{marginBottom: "10px"}}>Statistics</h3>
                <div className="col-md-3">
                    <div className="input-select">
                        <input type="number" className="form-control" placeholder="From"
                            onChange={(e) => this.setState({from: e.target.value})}/>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-select">
                        <input type="number" className="form-control" placeholder="To"
                            onChange={(e) => this.setState({to: e.target.value})}/>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="input-select">
                        <a href="#" className="btn btn-primary"
                            onClick={(e) => this.props.changeOrderState(e, "novoStanje")}>
                            Submit
                        </a>
                    </div>
                </div>
                <div>
                    <Chart options={this.state.pieChartData.options} 
                        series={this.state.pieChartData.series} type="pie" width={380} />
                    <Chart options={this.state.barChartData.options} 
                    series={this.state.barChartData.series} type="bar" height={350} />
                </div>
            </div>
        )
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <Statistics {...props} navigate={navigate} />
}
  
export default WithNavigate