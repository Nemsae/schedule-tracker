const React = require('react');
const ScheduleForm = require('./ScheduleForm');
const ScheduleTable = require('./ScheduleTable');

const App = React.createClass({
  getInitialState() {
    return {
      events:[],
    }
  },

  addEventPackage(event) {
    let { events } = this.state;

    this.setState({
      events: [...events,event],
    })
  },

  removeEventPackage(id) {
    let { events } = this.state;
    let currId = id;

    let updatedEvents = events.filter(event => event.id !== currId);

    this.setState({
      events: updatedEvents,
    })
  },

  updateEventPackage(editedPackage) {
    let { events } = this.state;

    let updatedEvents = events.map(event => {
      if(event.id === editedPackage.id){
        return editedPackage;
      } else {
        return event;
      }
    })

    this.setState({
      events: updatedEvents,
    })
  },

  componentWillMount() {
    let serializedData = localStorage.savedState;
    let savedState;

    try {
      savedState = JSON.parse(serializedData);
      this.setState(savedState);
    } catch(error) {};
  },

  componentDidUpdate() {
    const serializedData = JSON.stringify(this.state);
    localStorage.savedState = serializedData;
  },

  render() {
    return (
      <div className="container">
        <h1 className="text-center">Schedule Tracker</h1>
        <ScheduleForm events={this.state.events} addEventPackage={this.addEventPackage}/>
        <ScheduleTable events={this.state.events} removeEventPackage={this.removeEventPackage} updateEventPackage={this.updateEventPackage}/>
      </div>
    )
  }
})


module.exports = App;
