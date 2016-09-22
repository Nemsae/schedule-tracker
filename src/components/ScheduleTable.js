const React = require('react');
const moment = require('moment');

let ScheduleTable = React.createClass({
  getInitialState() {
    return {
      updatedEvent: '',
      updatedStart: undefined,
      updatedEnd: undefined,
      id: undefined,
    }
  },

  grabId(idFromEditButton) {
    let { id } = this.state;
    let existingId = idFromEditButton;

    this.setState({
      id: existingId,
    })
  },

  editEvent(e) {
    let editedEvent = e.target.value;

    this.setState({
      updatedEvent: editedEvent,
    })
  },

  editStart(e) {
    let editedStart = e.target.value;

    this.setState({
      updatedStart: editedStart,
    })
  },

  editEnd(e) {
    let editedEnd = e.target.value;

    this.setState({
      updatedEnd: editedEnd,
    })
  },

  submitEdit() {
    let { updatedEvent, updatedStart, updatedEnd, id } = this.state;
    let { updateEventPackage } = this.props;
    let newUnix = moment(updatedStart).valueOf();

    let editedPackage = {
      event: updatedEvent,
      start: updatedStart,
      end: updatedEnd,
      id,
      unix: newUnix,
    }

    updateEventPackage(editedPackage);

    document.getElementById('modalForm').reset();
  },

  render() {
    let { events, removeEventPackage } = this.props;
    return  (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* {this.renderRow} */}
            {events.sort((a,b) => {
              return a.unix-b.unix;
            }).map(event => (
              <tr key={event.id}>
                <td>{event.event}</td>
                <td>{event.start}</td>
                <td>{event.end}</td>
                <td>
                  <button onClick={() => this.grabId(event.id)} className="btn btn-sm btn-default" data-toggle="modal" data-target="#myModal">Edit</button>
                </td>
                <td>
                  <button onClick={()=> removeEventPackage(event.id)} className="btn btn-sm btn-danger">X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
                <h4 className="modal-title" id="myModalLabel">Edit Event</h4>
              </div>
              <div className="modal-body">

                <form id='modalForm'>
                  <div className="form-group">
                    <label htmlFor="editEvent">Event:</label>
                    <input onChange={this.editEvent} ref='editEvent' type="text" className="form-control" id="editEvent" required/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="editStart">Start Date:</label>
                    <input onChange={this.editStart} ref='editStart' type="date" className="form-control" id="editStart"/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="editEnd">End Date:</label>
                    <input onChange={this.editEnd} ref='editEnd' type="date" className="form-control" id="editEnd"/>
                  </div>
                </form>

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button onClick= {this.submitEdit} type="button" className="btn btn-primary" data-dismiss="modal">Save changes</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})


module.exports = ScheduleTable;
