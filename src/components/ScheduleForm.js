const React = require('react');
const moment = require('moment');

let ScheduleForm = React.createClass({

  submitForm(e) {
    e.preventDefault();
    let { events, addEventPackage } = this.props;
    let { event, start, end } = this.refs;


    let newEvent = event.value;
    let newStart = start.value;
    let newEnd = end.value;
    let newUnix = moment(newStart).valueOf();

    let newEventPackage = {
      event: newEvent,
      start: newStart,
      end: newEnd,
      id: uuid(),
      unix: newUnix,
    };

    addEventPackage(newEventPackage);

    document.getElementById('submitForm').reset();
  },

  render() {

    return (
      <form id='submitForm' onSubmit={this.submitForm}>
        <div className="form-group">
          <label htmlFor="newEvent">Event:</label>
          <input ref='event' type="text" className="form-control" id="newDate" required/>
        </div>
        <div className="form-group">
          <label htmlFor="newStartDate">Start Date:</label>
          <input ref='start' type="date" className="form-control" id="newStartDate"/>
        </div>
        <div className="form-group">
          <label htmlFor="newEndDate">End Date:</label>
          <input ref='end' type="date" className="form-control" id="newEndDate"/>
        </div>
        <button onClick={this.submitForm} className="btn btn-default">Add</button>
      </form>
    )
  }
})

module.exports = ScheduleForm;
