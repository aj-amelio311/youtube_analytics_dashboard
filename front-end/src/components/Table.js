import React, {Component} from "react";
import { addComma } from "../Util"

class Table extends Component {

  constructor(props) {
    super(props)
  }


  render() {
    const title = this.props.ytdata.title;
    const rawdata = this.props.ytdata.data;
    let tableHeaders = [];
    let tableData = [];
    for (var i in rawdata) {
      if (i !== "_id" && i !== "date" && i !== "status") {
        tableHeaders.push(i.charAt(0).toUpperCase() + i.substring(1, i.length));
        tableData.push(rawdata[i]);
      }
    }
    const head = tableHeaders.map((item, index) => <td key={index}>{item.replace("_", "/")}</td>);
    const data = tableData.map((item, index) => <td key={index}>{addComma(item)}</td>);
    return (
      <div className="table-responsive">
        <table className="table">
          <tbody>
          	<tr>
              {head}
          	</tr>
          	<tr>
              {data}
          	</tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table;
