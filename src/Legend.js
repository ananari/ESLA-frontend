import React, {Component} from 'react';

export default class Legend extends Component {
  
  render(){
    if(this.props.vals && Object.keys(this.props.vals).length > 0){
      return(
          <table className="legend">
            <tr>
              <th>
                Colour
              </th>
              <th>
                Value
              </th>
            </tr>
            {Object.keys(this.props.vals).map(val => {return(
              <tr>
                <td>
                  {this.props.vals[val]}
                </td>
                <td>
                  {val}
                </td>
              </tr>
            )})}
          </table>
      )
    }
    else {
      return(<p>No legend here.</p>)
    }
  }
}