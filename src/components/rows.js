import React, { Component } from "react";

export default class Rows extends Component {
    state={
        type:'',
        booked:[]
    }

    newseats = (target,selectLen,booked) => {

    let tickets = this.props.tickets - selectLen;
    for (let i = 0; i < tickets; i++) {
      target.className += " select";
      if (i !== 0) {
        let nextEle =
          target.parentElement.nextElementSibling &&
          target.parentElement.nextElementSibling.firstElementChild;
        if (nextEle && !booked.includes(nextEle)) {
          nextEle.className += " select";
          target = nextEle;
        }
      }
    }
    }
  selectSeat = async (e, f) => {
      let booked = Array.from(document.querySelectorAll(".booked"))
      let a = booked.includes(e.target)
      
    if(a){
        return e.preventDefault()
    }
    else {
        let selectLen = this.props.selectedSeats()
    const { target } = e
     
    await this.newseats(target,selectLen, booked)
    if (selectLen == this.props.tickets || f.type!=this.state.type) {
      let allElements = Array.from(document.querySelectorAll(".select"));
      for (let element of allElements) {
        element.classList.remove("select");
      }
      selectLen = this.props.selectedSeats()
      this.newseats(target,selectLen,booked)
    }
    this.setState({type:f.type})
    selectLen = this.props.selectedSeats()
    this.props.calculatePrice(selectLen,f.price)
}
  };
  render() {
    const { club, executive, normal } = this.props;
    return (
      <>
        <table>
          <tbody>
            <tr>
              <th align="center" colSpan="2">{club.length && `Club - Rs.${club[0].price.toFixed(2)}`}</th>
            </tr>
          </tbody>
          <tbody>
            {club &&
              club.map(f => {
                let count = f.start;
                return (
                  <tr key={f.id}>
                    <td>
                      <div style={{float:'right'}}>{f.row}</div>
                    </td>
                    <td style={{ display: "flex" }}>
                      {f.start !== 1 &&
                        [...Array(f.start - 1)].map((m, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "4px 7px",
                              width: "30px",
                              height: "30px"
                            }}
                          >
                            &nbsp;
                          </div>
                        ))}

                      {[...Array(f.seats)].map((m, i) => (
                        <div key={i} style={{ padding: "4px 7px" }}>
                          <button
                            className={f.booked.includes(count) ? 'booked' : "available"}
                            id={`${f.row}_${count}`}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderImage: "none",
                              outline: 0
                            }}
                            key={i}
                            onClick={e => this.selectSeat(e, f)}
                          >
                            {count++}
                          </button>{" "}
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tbody>
            <tr>
            <th align="center" colSpan="2">
                {executive.length &&
                  `Executive - Rs.${executive[0].price.toFixed(2)}`}
              </th>
            </tr>
          </tbody>
          <tbody>
            {executive &&
              executive.map(f => {
                let count = f.start;
                return (
                  <tr key={f.id}>
                    <td>
                      <div style={{float:'right'}}>{f.row}</div>
                    </td>
                    <td style={{ display: "flex" }}>
                      {f.start !== 1 &&
                        [...Array(f.start - 1)].map((m, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "4px 7px",
                              width: "30px",
                              height: "30px"
                            }}
                          >
                            &nbsp;
                          </div>
                        ))}

                      {[...Array(f.seats)].map((m, i) => (
                        <div key={i} style={{ padding: "4px 7px" }}>
                          <button
                            className={f.booked.includes(count) ? 'booked' : "available"}
                            id={`${f.row}_${f.start}`}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderImage: "none",
                              outline: 0
                            }}
                            key={i}
                            onClick={e => this.selectSeat(e, f)}
                          >
                            {count++}
                          </button>{" "}
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
          </tbody>
          <tbody>
            <tr>
            <th align="center" colSpan="2">
                {normal.length && `Normal - Rs.${normal[0].price.toFixed(2)}`}
              </th>
            </tr>
          </tbody>{" "}
          <tbody>
            {normal &&
              normal.map(f => {
                let count = f.start;
                return (
                  <tr key={f.id}>
                    <td>
                      <div style={{float:'right'}}>{f.row}</div>
                    </td>
                    <td style={{ display: "flex" }}>
                      {f.start !== 1 &&
                        [...Array(f.start - 1)].map((m, i) => (
                          <div
                            key={i}
                            style={{
                              padding: "4px 7px",
                              width: "30px",
                              height: "30px"
                            }}
                          >
                            &nbsp;
                          </div>
                        ))}

                      {[...Array(f.seats)].map((m, i) => (
                        <div key={i} style={{ padding: "4px 7px" }}>
                          <button
                            className={f.booked.includes(count) ? 'booked' : "available"}
                            id={`${f.row}_${f.start}`}
                            style={{
                              width: "30px",
                              height: "30px",
                              borderImage: "none",
                              outline: 0
                            }}
                            key={i}
                            onClick={e => this.selectSeat(e, f)}
                          >
                            {count++}
                          </button>{" "}
                        </div>
                      ))}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}
