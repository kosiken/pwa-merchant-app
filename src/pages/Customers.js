import React, {useState, useEffect} from 'react'
import {  TopBar, CustomerListItem } from '../components'
//import { TopBar, SwitchBox, Input, Button, IconButton, Checkbox } from '../components'
// import { Link } from "react-router-dom";


const Customers = () => {
	let [customers, setCustomers] = useState([{name: 'John Lennon', phone: '080320978654'}, {name: 'Luis Scola', phone: '080320656654'}, {name: 'Kyle Kuzma', phone: '0807890978654'}, {name: 'John Bryne', phone: '080920978654'}])

    return (
        <div style={{ minHeight: '100vh' }}>
            <TopBar title="Customers" />
            <div className="customers" >
            {customers.map(customer => (<CustomerListItem customer={customer} />))}
            	
            </div>
        </div>
    )
}

export default Customers

