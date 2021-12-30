import React, { useState, useEffect } from "react";
import './App.css';
import axios from 'axios';
import { Button,Input, Table } from "reactstrap";
import {
  PlusOutlined, MinusOutlined
} from '@ant-design/icons';
export default function App(){

  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:3001/records')
      .then(response => {
        console.log(response.data);
        setRecords(response.data);
      }) 
  }, []);
  


  return (
    <div  className='App'>
      <h1 style={{ marginBottom:'10px'}}> Unit Cost Calculator </h1>
      <div>
        <Table dark>
          <thead style={{color: 'red'}}>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Cost</th>
            <th>Total</th>
          </tr>
          </thead>
          <tbody>
          {records.map((item, index) => 
          <tr key= {index} >
            <td >
              {item.name}
            </td>
          <td >
            {item.quantity}
            
          </td>
          <td >
              {item.unitCost}
          </td>
          <td>
            {item.totalPrice}
          </td>
          </tr>
          )}
          </tbody>
        </Table>

      </div>
  </div>  
  );

}