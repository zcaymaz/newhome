import React, { useState, useContext } from 'react'
import { Grid, Stack, Typography, Button, TextField, InputLabel, MenuItem, FormControl, Select } from '@mui/material'
import { FormInput, MultilineFormInput } from './common/Inputs'
import { SelectResidence, SelectRoomCount } from './common/SelectComp'
import AutoComp from './common/AutoComp'
import FileUpload from './FileUpload'
import { GlobalState } from '../GlobalState'
import axios from 'axios'
import ImageUploader from './ImageUpload'

const onFilesUpload = (files) => {
    window.console.log(files)
}
const FlatAdd = () => {
    const state = useContext(GlobalState)
    const [tasks] = state.tasksAPI.tasks

    const [id, setID] = useState('')
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDesc] = useState('')
    const [type, setType] = useState('')
    const [images, setImages] = useState([])
    const [roomnumber, setRoomNumber] = useState('')
    const [squaremeters, setSquareMeters] = useState('')
    const [features, setFeatures] = useState([])
    const [token] = state.token
    const [callback, setCallback] = state.tasksAPI.callback
    const [onEdit, setOnEdit] = useState(false)

    console.log(features)
    const createTask = async e => {
        e.preventDefault()
        try {
            if (onEdit) {
                const res = await axios.put(`http://localhost:3001/api/task/${id}`, { useremail: localStorage.getItem('email'), title: title, address: address, price: price, description: description, type: type, images: images, roomnumber: roomnumber, squaremeters: squaremeters, features: features }, {
                    headers: { Authorization: token }
                })
                console.log(res.data.msg)
            } else {
                const res = await axios.post('http://localhost:3001/api/task', { useremail: localStorage.getItem('email'), title: title, address: address, price: price, description: description, type: type, images: images, roomnumber: roomnumber, squaremeters: squaremeters, features: features }, {
                    headers: { Authorization: token }
                })
                console.log(res.data.msg)
            }
            setOnEdit(false)
            setTitle('')
            setAddress('')
            setPrice('')
            setDesc('')
            setType('')
            setImages([])
            setRoomNumber('')
            setSquareMeters('')
            setFeatures([])
            setCallback(!callback)

        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editTask = async (id, title, address, price, description, type, images, roomnumber, squaremeters, features) => {
        setID(id)
        setTitle(title)
        setAddress(address)
        setPrice(price)
        setDesc(description)
        setType(type)
        setImages(images)
        setRoomNumber(roomnumber)
        setSquareMeters(squaremeters)
        setFeatures(features)
        setOnEdit(true)
    }

    const deleteTask = async _id => {
        try {
            const res = await axios.delete(`/api/task/${_id}`, {
                headers: { Authorization: token }
            })
            alert(res.data.msg)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <Grid container padding={2} direction='row' sx={{ bgcolor: '#Eef1f3', height: '100vh' }}>
            <Grid item xs='12'>
                <Typography padding={2}>
                    <center><h4>İlan Ekle</h4></center>
                    <hr />
                </Typography>
                <form onSubmit={createTask}>
                    <Stack direction="row" spacing={3} padding={1}>
                        <FormInput label="Başlık" name="title" id="title" value={title} required onChange={e => setTitle(e.target.value)} />
                        <FormInput label="Adres" name="address" id="address" value={address} required onChange={e => setAddress(e.target.value)} />
                        <FormInput label="Fiyat" name="price" id="price" value={price} required onChange={e => setPrice(e.target.value)} />
                    </Stack>
                    <Stack direction="row" spacing={3} padding={1}>
                        <FormInput label="Açıklama" name="description" id="description" value={description} required onChange={e => setDesc(e.target.value)} />
                    </Stack>
                    <Stack direction="row" spacing={3} padding={1}>
                        <SelectResidence name="type" id="type" value={type} onChange={e => setType(e.target.value)} />
                        <SelectRoomCount name="roomnumber" id="roomnumber" value={roomnumber} onChange={e => setRoomNumber(e.target.value)} />
                        <FormInput label="Metrekare" name="squaremeters" id="squaremeters" value={squaremeters} required onChange={e => setSquareMeters(e.target.value)} />
                    </Stack>
                    <Stack direction="row" spacing={3} padding={1}>
                        <AutoComp value={features} name="features" id="features" onChange={(event, newValue) => { setFeatures(newValue) }} />
                    </Stack>
                    <ImageUploader value={images} onChange={e => setImages(e.target.value)}/>
                    <Button className='TaskCardButton' type='submit'>
                        Onayla
                    </Button>
                </form>
            </Grid>
            <Grid item xs={12}>
                <FileUpload onFilesUpload={onFilesUpload} />
            </Grid>
        </Grid>
    )
}

export default FlatAdd