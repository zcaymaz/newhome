import React from 'react'
import { TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material'

export const SelectComp = (props) => {
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

export const SelectResidence = (props) => {
    return (
        <FormControl fullWidth sx={{ bgcolor: 'white' }}>
        <InputLabel id="demo-simple-select-label">Mesken</InputLabel>
        <Select
            labelId="demo-simple-select-label"
            label="Mesken"
            name={props.name}
            id={props.id}
            value={props.value}
            onChange={props.onChange}
            >
            <MenuItem value="Daire">Daire</MenuItem>
            <MenuItem value="Müstakil">Müstakil</MenuItem>
            <MenuItem value="Villa">Villa</MenuItem>
        </Select>
    </FormControl>
    );
}

export const SelectRoomCount = (props) => {
    return (
        <FormControl fullWidth sx={{ bgcolor: 'white' }}>
            <InputLabel id="demo-simple-select-label">Oda Sayısı</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                label="Oda Sayısı"
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            >
                <MenuItem value="1+0(Stüdyo)">1+0(Stüdyo)</MenuItem>
                <MenuItem value="1+1">1+1</MenuItem>
                <MenuItem value="2+1">2+1</MenuItem>
            </Select>
        </FormControl>
    );
}