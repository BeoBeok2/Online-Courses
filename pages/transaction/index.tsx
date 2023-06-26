import axios from 'axios';
import React, { useEffect, useState } from 'react';
import host from '../api/host';
import router from 'next/router';
import Header from '../components/footerheader/header';
import Paper from '@material-ui/core/Paper/Paper';
import TableHead from '@material-ui/core/TableHead/TableHead';
import TableCell from '@material-ui/core/TableCell/TableCell';
import TableRow from '@material-ui/core/TableRow/TableRow';
import TableBody from '@material-ui/core/TableBody/TableBody';
import { TableContainer, Table } from '@material-ui/core';



interface Payment {
  payment: [
    paymentId: string,
    paymentDate: string,
    total: string
  ]
}
const Transaction = () => {
  const [transaction, setTransaction] =  useState<Payment | null>(null);
  
  
  useEffect(() => {
    const  callAPI = async () => {
        try {
          const accessToken = localStorage.getItem('accessToken');
          const headers = { Authorization: `Bearer ${accessToken}` };
          const response = await axios.get(`${host}/payment/`, { headers });
          const data = response.data;
          setTransaction(data);
        } catch (error) {
          console.log(error);
          // Xử lý lỗi khi gọi API
        }
    }
    callAPI()

    },[])
  return (
    <div>
      <Header></Header>
      <div style={{marginTop: "100px", display: "flex", flexDirection:"column", padding: "50px"}}>
      <h1 style={{textAlign:"center"}}>Transaction History</h1>
      <table className="table">
  <thead>
    <tr>
      <th style={{textAlign: "left", width: "20%"}} scope="col">#</th>
      <th  style={{textAlign: "left", width: "20%"}} scope="col">Created</th>
      <th  style={{textAlign: "left", width: "20%"}} scope="col">Amount</th>
      <th  style={{textAlign: "left", width: "20%"}} scope="col">Currency</th>
      <th  style={{textAlign: "left", width: "20%"}} scope="col">Operation</th>

    </tr>
  </thead>
  <tbody>
      {
        transaction?.payment.map((t, index) => {
          return (
            <tr key={index}>
              <th  style={{textAlign: "left", width: "20%"}} scope="row">{t.paymentId}</th>
              <td  style={{textAlign: "left", width: "20%"}} >{t.paymentDate}</td>
              <td  style={{textAlign: "left", width: "20%"}}>{t.total}</td>
              <td  style={{textAlign: "left", width: "20%"}}>VND</td>
              <td  style={{textAlign: "left", width: "20%"}}>{t.refundStatus}</td>

           </tr>
          )
    

})
      }
   
  </tbody>
</table>
      </div>
    </div>
  );
};

export default Transaction;
