import React from 'react'
import { TopBar, SwitchBox, Input, } from '../components'

const Customers = () => {
    return (
        <div>
          <TopBar />  
          
          <SwitchBox options={['Existing', 'New']} value="New" />
        </div>
    )
}

export default Customers

