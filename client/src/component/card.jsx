import React, { Component } from "react";
// "proxy": "http://localhost:3001",
class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {
    this.fetchData();
  }

  fetchData = () => {
    const self = this;
    fetch("http://localhost:3001/")
      .then(response => {
        console.log(response);
        return response;
      })
      // .then(schedules => {
      //   schedules.json();
      // })
      .then(schedules => {
        // return schedules;
        self.setState(schedules);
        console.log(self.state.schedules);
        console.log("???");
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div> wtf div #1 </div>
        {this.state.schedules.map(schedule => (
          <div key={schedule}> {schedule} </div>
        ))}
      </div>
    );
  }
}

export default Card;
