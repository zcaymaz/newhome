import React, { useState, useContext } from 'react'
import { Grid, Stack, Typography, Button, Container } from '@mui/material'
import { FormInput } from './common/Inputs'
import { SelectResidence, SelectRoomCount, SelectSaleType } from './common/SelectComp'
import AutoComp from './common/AutoComp'
import { GlobalState } from '../GlobalState'
import axios from 'axios'
import ImageUploader from './ImageUpload'
import { MultilineFormInput } from './common/Inputs'

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
    const [saletype, setSaleType] = useState('')
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
                const res = await axios.put(`http://localhost:3001/api/task/${id}`, { name: localStorage.getItem('name'), useremail: localStorage.getItem('email'), title: title, address: address, price: price, description: description, type: type, images: images, roomnumber: roomnumber, saletype: saletype ,squaremeters: squaremeters, features: features }, {
                    headers: { Authorization: token }
                })
                console.log(res.data.msg)
            } else {
                const res = await axios.post('http://localhost:3001/api/task', { name: localStorage.getItem('name'), useremail: localStorage.getItem('email'), title: title, address: address, price: price, description: description, type: type, images: images, roomnumber: roomnumber, saletype: saletype , squaremeters: squaremeters, features: features }, {
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
            setSaleType('')
            setSquareMeters('')
            setFeatures([])
            setCallback(!callback)
            window.location.href = "http://localhost:3000/flatadd"
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

    const editTask = async (id, title, address, price, description, type, images, roomnumber, saletype, squaremeters, features) => {
        setID(id)
        setTitle(title)
        setAddress(address)
        setPrice(price)
        setDesc(description)
        setType(type)
        setImages(images)
        setRoomNumber(roomnumber)
        setSaleType(roomnumber)
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

    return (
        <Container maxWidth="lg" className='flattAddContainer'>
            <Grid container padding={2} direction='row' sx={{ height: '100vh' }}>
                <Grid item xs='12'>
                    <Typography padding={2} className='flatAddTypography' >
                        <center><h4>İlan Ekle</h4></center>
                        <hr />
                    </Typography>
                    <form onSubmit={createTask}>
                        <ImageUploader value={images} pickImages={setImages} />
                        <Stack direction="row" spacing={3} padding={1}>
                            <FormInput label="Başlık" name="title" id="title" value={title} required onChange={e => setTitle(e.target.value)} />
                            <FormInput label="Adres" name="address" id="address" value={address} required onChange={e => setAddress(e.target.value)} />
                            <FormInput label="Fiyat" type="number" name="price" id="price" value={price} required onChange={e => setPrice(e.target.value)} />
                        </Stack>
                        <Stack direction="row" spacing={3} padding={1}>
                            <MultilineFormInput label="Açıklama" name="description" id="description" value={description} required onChange={e => setDesc(e.target.value)} />
                        </Stack>
                        <Stack direction="row" spacing={3} padding={1}>
                            <SelectResidence name="type" id="type" value={type} onChange={e => setType(e.target.value)} />
                            <SelectRoomCount name="roomnumber" id="roomnumber" value={roomnumber} onChange={e => setRoomNumber(e.target.value)} />
                            <SelectSaleType name="saletype" id="saletype" value={saletype} onChange={e => setSaleType(e.target.value)} />
                            <FormInput size="medium" label="Metrekare" type="number" name="squaremeters" id="squaremeters" value={squaremeters} required onChange={e => setSquareMeters(e.target.value)} />
                        </Stack>
                        <Stack direction="row" spacing={3} padding={1}>
                            <AutoComp value={features} name="features" id="features" onChange={(event, newValue) => { setFeatures(newValue) }} />
                        </Stack>
                        <center>
                            <Button className='FlatAddButton' type='submit'>
                                Onayla
                            </Button>
                        </center>
                    </form>
                </Grid>
            </Grid>
        </Container>
    )
}

export default FlatAdd