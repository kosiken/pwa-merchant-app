import React from 'react';
import {Input, Button, SwitchBox, BottomNav} from './components'
import { BrowserRouter as Router,} from "react-router-dom";
function App() {
  return (
  <Router>
    <div className="App">
      <Input type="text" name="input" /> <br/>
      <Button>Create order</Button>
      <SwitchBox options={['Existing', 'New']} onChange={console.log} />
      <BottomNav/>
    </div>
    </Router>
  );
}

export default App;
