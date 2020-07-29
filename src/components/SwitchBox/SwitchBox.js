import React, { useState, useEffect } from "react";
import './SwitchBox.scss'
const SwitchBox = ({ options, value, onChange }) => {

    let [selected, setSelected] = useState(!!value ? value : options[0])
    useEffect(() => {
        if (onChange) onChange(selected)

    }, [selected, onChange])

    return (
        <div className="switch-box">
            <span className={"switch-item " + (selected === options[0] ? "active" : '')} onClick={() => {
                setSelected(options[0])
            }}>{options[0]}</span>

            <span className={"switch-item " + (selected === options[1] ? "active" : '')}
                onClick={() => {
                    setSelected(options[1])
                }}>{options[1]}</span>
        </div>
    );
};
export default SwitchBox