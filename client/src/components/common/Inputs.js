import { TextField } from '@mui/material'
import React from 'react'

export const FormInput = (props) => {
    return (
        <>
            <TextField
                className='FormInput'
                size={props.size || 'small'}
                label={props.label}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                text={props.text}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
        </>
    )
}

export const MultilineInput = (props) => {
    return (
        <>
            <TextField
                className='MultilineInput'
                multiline
                rows={props.rows}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                text={props.text}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
        </>
    )
}

export const MultilineFormInput = (props) => {
    return (
        <>
            <TextField
                className='MultilineInput'
                id="outlined-multiline-static"
                label={props.label}
                multiline
                rows={3}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}
            />
        </>
    )
}
