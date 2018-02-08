import React from 'react'

export default ({name, placeholder, title, type, value, onChange, ...props }) => (
    <div className="form-group">
        <label htmlFor={name}>{title}</label>
        <input
            type={type || 'text'}
            className="form-control"
            id={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            {...props}
        />
    </div>
)