import React from "react"
import { useNavigate } from "react-router-dom"
import Chart from "react-apexcharts"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

class Statistics extends React.Component {
    constructor(){
        super()
        this.state = {
            pieChartCategories: {
              series: [],
              options: {
                chart: {
                  width: 380,
                  type: 'pie',
                },
                labels: [],
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
            pieChartLocations:{
              series: [],
              options: {
                chart: {
                  width: 380,
                  type: 'pie',
                },
                labels: [],
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
            barChartCategories:{
                series: [{
                    data: []
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
                      categories: [],
                    }
                  }
            },
            barChartLocations:{
              series: [{
                  data: []
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
                    categories: [],
                  }
                }
            },
            startDate: new Date(),
            endDate: new Date()
        }
        this.fetchStats = this.fetchStats.bind(this)
    }

    componentDidMount(){
      this.fetchStats(null)
    }

    fetchStats(e){
      if(e) e.preventDefault()
      axios.get("http://localhost:3030/stats/", {
        params: {
          from: this.state.startDate,
          to: this.state.endDate
        }
      })
        .then((response) => {
          let data = response.data.data

          let newPieChartCategories  = {
              series: [],
              options: {
                chart: {
                  width: 380,
                  type: 'pie',
                },
                labels: [],
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
          }
          let newPieChartLocations  = {
            series: [],
            options: {
              chart: {
                width: 380,
                type: 'pie',
              },
              labels: [],
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
          }
          let newBarChartCategories = {
            series: [{
                data: []
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
                  categories: [],
                }
              }
          }
          let newBarChartLocations = {
            series: [{
                data: []
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
                  categories: [],
                }
              }
          }

          newPieChartCategories.series = data.category.count.map(el => el.count)
          newPieChartCategories.options.labels = data.category.count.map(el => el._id)

          newPieChartLocations.series = data.location.count.map(el => el.count)
          newPieChartLocations.options.labels = data.location.count.map(el => el._id)

          newBarChartCategories.series[0].data = data.category.revenue.map(el => el.revenue)
          newBarChartCategories.options.xaxis.categories = data.category.revenue.map(el => el._id)

          newBarChartLocations.series[0].data = data.location.revenue.map(el => el.revenue)
          newBarChartLocations.options.xaxis.categories = data.location.revenue.map(el => el._id)
          
          if(response.status === 200) {
              this.setState({
                pieChartCategories: newPieChartCategories,
                pieChartLocations: newPieChartLocations,
                barChartCategories: newBarChartCategories,
                barChartLocations: newBarChartLocations
              })
          }
        })
        .catch((error) => {
            console.log(error)
        });
    }

    render(){
      return(
          <div className="row col-md-10 offset-md-1" style={{backgroundColor: "white", padding: "10px"}}>
              <h3 style={{marginBottom: "10px"}}>Statistics</h3>
              <div className="col-md-3">
                  <div className="input-select">
                  <DatePicker selected={this.state.startDate} onChange={(date) => this.setState({startDate: date})}/>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="input-select">
                  <DatePicker selected={this.state.endDate} onChange={(date) => this.setState({endDate: date})}/>
                  </div>
              </div>
              <div className="col-md-3">
                  <div className="input-select">
                      <a href="#" className="btn btn-primary"
                          onClick={this.fetchStats}>
                          Submit
                      </a>
                  </div>
              </div>
              <div>
                  {
                    this.state.pieChartCategories.series.length > 0 ? 
                    <Chart options={this.state.pieChartCategories.options}
                      series={this.state.pieChartCategories.series} type="pie" width={380} /> : null
                  }
                  {
                    this.state.pieChartLocations.series.length > 0 ? 
                    <Chart options={this.state.pieChartLocations.options} 
                      series={this.state.pieChartLocations.series} type="pie" width={380} /> : null
                  }
                  {
                    this.state.barChartCategories.series[0].data.length > 0 ? 
                    <Chart options={this.state.barChartCategories.options} 
                      series={this.state.barChartCategories.series} type="bar" height={350} /> : null
                  }
                  {
                    this.state.barChartLocations.series[0].data.length > 0 ? 
                    <Chart options={this.state.barChartLocations.options} 
                      series={this.state.barChartLocations.series} type="bar" height={350} /> : null
                  }
                   
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