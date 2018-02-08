import React from 'react'

export default ({name, title, value, onChange, children, ...props }) => (
    <div className="form-group">
        <label htmlFor={name}>{title}</label>
        <select
            className="form-control"
            id={name}
            value={value}
            onChange={onChange}
            {...props}
        >
            {children}
        </select>
    </div>
)