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
                <MenuItem value="1.5+1">1.5+1</MenuItem>
                <MenuItem value="2+0">2+0</MenuItem>
                <MenuItem value="2+1">2+1</MenuItem>
                <MenuItem value="2.5+1">2.5+1</MenuItem>
                <MenuItem value="2+2">2+2</MenuItem>
                <MenuItem value="3+0">3+0</MenuItem>
                <MenuItem value="3.5+1">3.5+1</MenuItem>
                <MenuItem value="3+1">3+1</MenuItem>
                <MenuItem value="3+2">3+2</MenuItem>
                <MenuItem value="3+3">3+3</MenuItem>
                <MenuItem value="4+0">4+0</MenuItem>
                <MenuItem value="4+1">4+1</MenuItem>
                <MenuItem value="4.5+1">4.5+1</MenuItem>
                <MenuItem value="4+2">4+2</MenuItem>
                <MenuItem value="4+3">4+3</MenuItem>
                <MenuItem value="4+4">4+4</MenuItem>
                <MenuItem value="5+1">5+1</MenuItem>
                <MenuItem value="5.5+1">5.5+1</MenuItem>
                <MenuItem value="5+2">5+2</MenuItem>
                <MenuItem value="5+3">5+3</MenuItem>
                <MenuItem value="5+4">5+4</MenuItem>
                <MenuItem value="6+1">6+1</MenuItem>
                <MenuItem value="6+2">6+2</MenuItem>
                <MenuItem value="6.5+1">6.5+1</MenuItem>
                <MenuItem value="6+3">6+3</MenuItem>
                <MenuItem value="6+4">6+4</MenuItem>
                <MenuItem value="7+1">7+1</MenuItem>
                <MenuItem value="7+2">7+2</MenuItem>
                <MenuItem value="7+3">7+3</MenuItem>
                <MenuItem value="8+1">8+1</MenuItem>
                <MenuItem value="8+2">8+2</MenuItem>
                <MenuItem value="8+3">8+3</MenuItem>
                <MenuItem value="8+4">8+4</MenuItem>
                <MenuItem value="9+1">9+1</MenuItem>
                <MenuItem value="9+2">9+2</MenuItem>
                <MenuItem value="9+3">9+3</MenuItem>
                <MenuItem value="9+4">9+4</MenuItem>
                <MenuItem value="9+5">9+5</MenuItem>
                <MenuItem value="9+6">9+6</MenuItem>
                <MenuItem value="10+1">10+1</MenuItem>
                <MenuItem value="10+2">10+2</MenuItem>
                <MenuItem value="10 Üzeri">10 Üzeri</MenuItem>
            </Select>
        </FormControl>
    );
}

export const SelectSaleType = (props) => {
    return (
        <FormControl fullWidth sx={{ bgcolor: 'white' }}>
            <InputLabel id="demo-simple-select-label">Satılık/Kiralık</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                label="Satış Tipi"
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
            >
                <MenuItem value="Satılık">Satılık</MenuItem>
                <MenuItem value="Kiralık">Kiralık</MenuItem>
            </Select>
        </FormControl>
    );
}