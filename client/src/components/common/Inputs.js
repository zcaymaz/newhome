import { TextField } from '@mui/material'
import React from 'react'

export const FormInput = (props) => {
    return (
        <>
            <TextField
                className='FormInput'
                size='small'
                label={props.label}
                name={props.name}
                type={props.type}
                placeholder={props.placeholder}
                text={props.text}
                value={props.value}
                onChange={props.onChange}
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
                type={props.type}
                placeholder={props.placeholder}
                text={props.text}
                value={props.value}
                onChange={props.onChange}
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
            />
        </>
    )
}
