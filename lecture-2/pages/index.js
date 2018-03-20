import React from 'react'
import { Select, DatePicker, Button, Spin, Card, Rate } from 'antd'
import Head from 'next/head'

const { Option } = Select
const { RangePicker } = DatePicker

export default class Main extends React.Component {
  state = {
    dataCountries: [],
    dataCities: [],
    dataHotels: [],
    fetchingCountries: false,
    fetchingCities: false,
    fetchingHotels: false,

    country: null,
    city: null,
    dateRange: null,
  }

  handleCountryChange = value => {
    this.setState({
      country: value,
      city: null,
    })
  }

  handleCityChange = value => {
    this.setState({
      city: value,
    })
  }

  handleRangeChange = (date, dateString) => {
    this.setState({
      dateRange: dateString,
    })
  }

  fetchData = async ({
    uri,
    data,
    startFetching,
    stopFetching,
    setData,
    forceFetch,
  }) => {
    if (!forceFetch && data && data.length !== 0) {
      return
    }

    startFetching()
    try {
      const response = await fetch(uri)
      const result = await response.json()
      stopFetching()
      setData(result.data)
    } catch (error) {
      console.error(`Error while searching - ${error}`)
    }
  }

  handleCountryFocus = () => {
    this.fetchData({
      uri: '/static/countries.json',
      data: this.state.dataCountries,
      startFetching: () => this.setState({ fetchingCountries: true }),
      stopFetching: () => this.setState({ fetchingCountries: false }),
      setData: data => {
        const dataCountries = data.allLocations.edges
        this.setState({ dataCountries })
      },
    })
  }

  // fetchCountriesData = async () => {
  //   if (this.state.dataCountries && this.state.dataCountries.length !== 0) { return }

  //   this.setState({
  //     fetchingCountries: true,
  //   })

  //   try {
  //     const response = await fetch('/static/countries.json')
  //     const dataCountries = await response.json()
  //     this.setState({
  //       fetchingCountries: false,
  //       dataCountries: dataCountries.data.allLocations.edges,
  //     })
  //   } catch (error) {
  //     console.error('Error while searching countries')
  //   }

  // }

  handleCityFocus = () => {
    this.fetchData({
      uri: '/static/cities.json',
      data: this.state.dataCities,
      forceFetch: true,
      startFetching: () => this.setState({ fetchingCities: true }),
      stopFetching: () => this.setState({ fetchingCities: false }),
      setData: data => {
        const allCities = data.allLocations.edges
        const { country } = this.state
        const filteredCities = allCities.filter(
          item => country === item.node.country.name
        )
        this.setState({ dataCities: filteredCities })
      },
    })
  }

  handleSearchBtn = () => {
    this.fetchData({
      uri: '/static/hotels.json',
      data: this.state.dataHotels,
      forceFetch: true,
      startFetching: () => this.setState({ fetchingHotels: true }),
      stopFetching: () => this.setState({ fetchingHotels: false }),
      setData: data => {
        const dataHotels = data.allAvailableHotels.edges
        this.setState({ dataHotels })
      },
    })
  }

  render() {
    return (
      <div>
        <Head>
          <title>NajdiHotel</title>
          <link rel="stylesheet" href="/static/antd.css" />
        </Head>
        <div className="layout">
          <h1 className="headline">NajdiHotel</h1>

          <div className="flexbox">
            <div className="field-box">
              <Select
                showSearch
                onChange={this.handleCountryChange}
                onFocus={this.handleCountryFocus}
                placeholder="Vyberte zemi"
                style={{ width: 200 }}
                notFoundContent={
                  this.state.fetchingCountries ? <Spin size="small" /> : null
                }
              >
                {this.state.dataCountries.map(dataCountry => (
                  <Option key={dataCountry.node.name}>
                    {dataCountry.node.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="field-box">
              <Select
                showSearch
                onChange={this.handleCityChange}
                onFocus={this.handleCityFocus}
                placeholder="Vyberte mesto"
                value={this.state.city || 'Vyberte mesto'}
                disabled={this.state.country === null}
                style={{ width: 200 }}
                notFoundContent={
                  this.state.fetchingCities ? <Spin size="small" /> : null
                }
              >
                {this.state.dataCities.map(dataCity => (
                  <Option key={`${dataCity.node.locationId}`}>
                    {dataCity.node.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="field-box">
              <RangePicker
                onChange={this.handleRangeChange}
                disabled={this.state.city === null}
              />
            </div>
            <div className="field-box">
              <Button
                onClick={this.handleSearchBtn}
                type="primary"
                disabled={this.state.dateRange === null}
              >
                Vyhledat
              </Button>
            </div>
          </div>

          <div className="list-view">
            {this.state.dataHotels.map(dataHotel => {
              const hotel = dataHotel.node.hotel
              return (
                <div className="list-view-item flexbox" key={dataHotel.node.id}>
                  <div className="flexbox flex flex-direction-column">
                    <h2>{hotel.name}</h2>
                    <Rate value={hotel.rating.stars} />
                  </div>
                  <Card
                    style={{ width: 260 }}
                    cover={<img src={hotel.mainPhoto.highResUrl} />}
                  >
                    <p>
                      {hotel.address.street}<br />
                      {hotel.address.city}<br />
                      {hotel.address.zip}<br />
                    </p>
                    
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
        <style jsx>
          {`
            .layout {
              width: 750px;
              margin: 0 auto;
            }
            .headline {
              padding: 50px 0 30px;
            }
            .flexbox {
              display: flex;
            }
            .flex-direction-column {
              flex-direction: column;
            }
            .flex {
              flex: 1;
            }
            .field-box {
              margin-right: 8px;
            }
            .list-view-item {
              margin: 20px 0;
            }
          `}
        </style>
      </div>
    )
  }
}
