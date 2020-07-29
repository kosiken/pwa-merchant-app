import React from 'react'
import { TopBar, SwitchBox, Input, Button, IconButton, Checkbox } from '../components'
// import { Link } from "react-router-dom";
import { FiPlus as PlusIcon } from 'react-icons/fi'

const Customers = () => {
    return (
        <div>
            <TopBar />

            <SwitchBox options={['Existing', 'New']} value="New" />

            <form className="f-form" style={{
                marginTop: '1.5em'
            }}>

                <div className="container">

                    <Input type="text" name="name" label="Name" style={{ margin: '0 auto' }} />
                    <Input type="tel" name="Phone Number" label="Phone Number" style={{ margin: '0 auto' }} />
                    <Input type="text" name="address" label="Address" style={{ margin: '0 auto' }} />
                    <Checkbox label='Save this customer for next time' style={{ margin: '0 0 1em' }} />

                    <div style={{ margin: '1em 0 0' }}>
                        <section style={{ width: '60%', display: 'inline-block' }}>
                            <Input type="text" name="food" label="Food" style={{ margin: '0 auto' }} />
                        </section>
                        <section style={{ width: '20%', marginLeft: '10%', display: 'inline-block' }}>
                            <Input type="number" name="quantity" label="Qty" style={{ margin: '0 auto' }} />
                        </section>
                    </div>

                    <div style={{
                    display:'flex',
                    justifyContent: 'right',
                    margin: '0 0 1em'
                    }}> <IconButton variant="beveled-edge">
                        <PlusIcon /> Add
    </IconButton> 
    </div>

                    <Button full>Create Order</Button>
                </div>
            </form>
        </div>
    )
}

export default Customers

