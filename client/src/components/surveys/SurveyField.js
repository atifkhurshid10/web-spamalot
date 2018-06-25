// Renders single label and text input
import React from 'react';

export default ({ input, label, meta: { error, touched } }) => {
  // input = props.input
  // Assign all key-value pairs (e.g, onBlur etc) in props.input to input tag
  // Show error if touched == true
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {touched && error}
      </div>
    </div>
  );
};
