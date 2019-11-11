import React, {Component} from 'react';

export default class Legend extends Component {
  
  render(){
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
          {Object.keys(this.props.vals).map(colour => {return(
            <tr>
              <td>
                {colour}
              </td>
              <td>
                {this.props.vals[colour]}
              </td>
            </tr>
          )})}
        </table>
    )
  }
}