import React, { useState } from 'react';
import './css/Switch.scss';

function Switch({isChecked, setIsChecked,handleChange}) {
//   const [isChecked, setIsChecked] = useState(false);

  const toggleSwitch = () => {
    setIsChecked(!isChecked);
    handleChange()
  };
  const labelClassName = isChecked ? 'switch-label-on' : 'switch-label-off';
  return (
    <div className='switchComponent'>
        <div className="switch">
        <input
            type="checkbox"
            id="switch"
            checked={isChecked}
            onChange={toggleSwitch}
        />
        <label htmlFor="switch" className={labelClassName} />
        </div>
    </div>

  );
}

export default Switch;