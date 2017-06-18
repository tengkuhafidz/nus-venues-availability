import React, { Component } from 'react';
import { Glyphicon, FormGroup, InputGroup, FormControl,  DropdownButton, MenuItem, ListGroup, ListGroupItem} from 'react-bootstrap';
import TimesAvailable from './TimesAvailable';
import { DoubleBounce } from 'better-react-spinkit';
import ScrollToTop from 'react-scroll-up';
import './App.css';
import _ from 'lodash';


class App extends Component {

  constructor(props) {
    super(props)
    const today = (new Date().getDay() - 1) < 0 ? 0 : new Date().getDay()
    this.state = {
      day: today, //if Sunday, today === Monday
      searchTerm: '',
      allVenuesData: {},
      isLoading: true,
    }
  }

  componentDidMount() {
    let allVenuesData = {};

    fetch('http://api.nusmods.com/2016-2017/1/venueInformation.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          isLoading: false,
          allVenuesData: data
        })
      })
  }

  componentWillMount() {

  }

  handleSearch(e) {
    this.setState({searchTerm: e.target.value})
  }

  renderVenues() {
    const allVenuesData = this.state.allVenuesData;
    const day = this.state.day;
    const venueCodes = Object.keys(allVenuesData).sort()



    let filteredVenueCodes = ''
    if(venueCodes.length < 1)
      return <div className="loader"><DoubleBounce size={100} /></div>

      if (venueCodes.length > 0) {
        filteredVenueCodes = venueCodes.filter(
          (venueCode) => {
            return venueCode.toLowerCase().indexOf(this.state.searchTerm.toLowerCase()) > -1;
          },
        );

      }
    return filteredVenueCodes.map(venue => {
        return (
          <ListGroupItem key={venue} header={venue}>
            <TimesAvailable availability={allVenuesData[venue][day].availability} day={this.state.day} key={venue}/>
          </ListGroupItem>
        )
    })
  }

  render() {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = (new Date().getDay() )- 1;
    // const handleSearch = _.debounce((e) => {
    //   this.setState({searchTerm: e.target.value})
    // }, 300)
    //
    const renderVenues = () => this.renderVenues();

    return (
      <div className="App">
        <div className="App-header">
          <span className="links">Book <a href="https://aces.nus.edu.sg/fbs/jsp/index.jsp" target="_blank">Discussion Rooms</a> or <a href="https://utownfbs.nus.edu.sg/utown/apptop.aspx" target="_blank">UTown Facilities</a></span>

          <div className="col-md-offset-2 col-md-8 ">
          <h1 className=""> NUS Venues Availability </h1>
          <FormGroup >
            <InputGroup>
              <InputGroup.Addon className="hidden-xs">
                <Glyphicon glyph="search"/>
              </InputGroup.Addon>
              <FormControl className="input" type="text" placeholder="Search venues" value={this.state.searchTerm} onChange={ this.handleSearch.bind(this) }/>
              <DropdownButton
                componentClass={InputGroup.Button}
                id="input-dropdown-addon"
                title={`On ${days[this.state.day]}s`}
              >
                <MenuItem eventKey={today} onClick={() => this.setState({day: today})}>Today</MenuItem>
                <MenuItem divider />
                {days.map((day, index) => {
                  return (
                    <MenuItem key={index} eventKey={index} onClick={() => this.setState({day: index})}>{day}</MenuItem>
                  )
                })}
              </DropdownButton>
            </InputGroup>
          </FormGroup>
          </div>
        </div>
        <div className="venueList">
          <div className="col-md-offset-2 col-md-8 col-sm-12">
            <p className="displayingMsg">Displaying times when there are no lessons at the venue...</p>
            <ListGroup className="text-left">
              {this.renderVenues()}
            </ListGroup>
          </div>
        </div>
        <ScrollToTop showUnder={160}>
          <span><Glyphicon glyph="chevron-up" className="toTop"/></span>
        </ScrollToTop>
      </div>
    );
  }
}

export default App;
