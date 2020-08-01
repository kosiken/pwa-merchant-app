import React, {useState, useEffect} from 'react'
import {  TopBar, CustomerListItem, Typography } from '../components'
//import { TopBar, SwitchBox, Input, Button, IconButton, Checkbox } from '../components'
// import { Link } from "react-router-dom";
import uuid from 'uuid/v4'

const Customers = () => {
	let [customers, setCustomers] = useState([{name: 'John Lennon', phone: '080320978654'}, {name: 'Luis Scola', phone: '080320656654'}, {name: 'Kyle Kuzma', phone: '0807890978654'}, {name: 'John Bryne', phone: '080920978654'}])

    return (
        <div style={{ minHeight: '100vh' }}>
            <TopBar title="Customers" />
            <div className="customers" >
            {customers.map(customer => (<CustomerListItem key={uuid()} customer={customer} />))}
            	
            </div>
                <Typography style={{ textAlign: 'center' }}>
        Made with <span role="img" aria-label="love" >❤️ </span><span style={{
          color: '#f0324b'
        }}>500Chow</span>
      </Typography>
        </div>
    )
}

export default Customers

