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

export const SelectResidence = () => {
    const [residence, setResidence] = React.useState('');
    const handleChange = (event) => {
        setResidence(event.target.value);
    };
    return (
        <FormControl fullWidth sx={{ bgcolor: 'white' }}>
            <InputLabel id="demo-simple-select-label">Mesken</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={residence}
                label="Mesken"
                onChange={handleChange}
            >
                <MenuItem value="Daire">Daire</MenuItem>
                <MenuItem value="Müstakil">Müstakil</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
            </Select>
        </FormControl>
    );
}

export const SelectRoomCount = () => {
    const [residence, setResidence] = React.useState('');
    const handleChange = (event) => {
        setResidence(event.target.value);
    };
    return (
        <FormControl fullWidth sx={{ bgcolor: 'white' }}>
            <InputLabel id="demo-simple-select-label">Oda Sayısı</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={residence}
                label="Oda Sayısı"
                onChange={handleChange}
            >
                <MenuItem value="Daire">Daire</MenuItem>
                <MenuItem value="Müstakil">Müstakil</MenuItem>
                <MenuItem value="Villa">Villa</MenuItem>
            </Select>
        </FormControl>
    );
}