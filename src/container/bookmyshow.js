import React, { Component } from "react";
import { data } from "../data";
import Rows from "../components/rows";

export default class Bookmyshow extends Component {
  state = {
    club: [],
    executive: [],
    normal: [],
    tickets:1,
    total:0,
    billReady:false
  };

  componentDidMount = async () => {
    const club = await data.filter(f => f.type.toLowerCase() === "club");
    const executive = await data.filter(
      f => f.type.toLowerCase() === "executive"
    );
    const normal = await data.filter(f => f.type.toLowerCase() === "normal");
    
    this.setState({ club, executive, normal });
  };
  selectedSeats = () => {
    return  document.getElementsByClassName("select").length;

  }
  calculatePrice = (len, price) => {
      if(len == this.state.tickets){
    let total = this.state.tickets * price
    this.setState({total,billReady:true})
      }
      else{
        this.setState({billReady:false})
      }
        }
  handleChange =  (e) => {
    this.setState({tickets:e.target.value,billReady:false})
    let allElements = Array.from(document.querySelectorAll(".select"));
      for (let element of allElements) {
        element.classList.remove("select");
      }
      
  }
  render() {
    const { club, executive, normal ,tickets, total, billReady} = this.state;
    return (
        <div style={{display:'flex',flexDirection:'column'}}>
      <div style={{ display:'flex',justifyContent:'space-evenly',alignItems:'center' }}>
        <Rows club={club} executive={executive} normal={normal} tickets={tickets} calculatePrice={this.calculatePrice} selectedSeats={this.selectedSeats}/>
        <div style={{display:'flex',flexDirection:'column'}}>
        <label style={{paddingBottom:'1rem'}} htmlFor="select-tickets">Select Tickets</label>

            <select value={tickets} onChange={this.handleChange} id="select-tickets" style={{width:'6rem'}}>
            {[...Array(10)].map((m,i) => <option key ={i} value={++i}>{`${i++} tickets`}</option>)}
            </select>
        </div>
      </div>
      <div style={{alignSelf:'center', paddingTop:'4rem'}}>
          {billReady && <button style={{fontSize: '1rem',
    borderImage: 'none',
    outline: 0,cursor:'pointer',padding:'1rem 4rem',background:'#0078ff',color:'#fff'}}>Pay Rs.{total}</button>}
      </div>
      </div>
    );
  }
}
