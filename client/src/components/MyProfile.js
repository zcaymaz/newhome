import React, { useEffect, useState } from 'react'
import { Avatar, Grid, Input, InputLabel, Typography } from '@mui/material'
import FlatItem from './FlatItem'
import Title from './Title'
import axios from 'axios'
import logo from './logo.png'
import { FormInput, MultilineFormInput } from './common/Inputs'

const MyProfile = () => {
    const [myAds, setMyAds] = useState([])

    useEffect(() => {
        axios.post(`http://localhost:3001/api/task/email`, { useremail: localStorage.getItem('email') }).then((res) => { setMyAds(res.data) })
    }, [])
    return (
        <>
            <Grid container direction="row" justifyContent="center">
                <Grid item xs={8} mt={3} p={5} sx={{ bgcolor: '#ffffff', borderRadius: '10px', border: '1px #f0f0f0 solid' }} >
                    <Grid container direction="row">
                        <Grid item xs={12} md={6} p={1} justifyContent="center">
                            <center>
                                <Avatar src={logo} sx={{ width: 170, height: 170, border: '1px solid #ededed' }} />
                                <Typography sx={{ fontSize: '20px' }}>Güzel Emlak</Typography>
                            </center>
                        </Grid>
                        <Grid item xs={12} md={6} pl={1}>
                            <Grid container direction="row">
                                <Grid item xs={12} pt={1}>
                                    <div>
                                        <InputLabel>Telefon Numarası:</InputLabel>
                                        <FormInput disabled />
                                    </div>
                                </Grid>
                                <Grid item xs pt={1}>
                                    <InputLabel>Adres:</InputLabel>
                                    <MultilineFormInput disabled />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <section className="section-all-re">
                        <div className="container">
                            <Title title="İlanlarım" description="" />
                            <hr />
                            <div className="row">
                                {myAds.map((ad) => (
                                    <>
                                        <FlatItem
                                            title={ad.title}
                                            price={ad.price}
                                            type={ad.type}
                                            roomnumber={ad.roomnumber}
                                            squaremeters={ad.squaremeters}
                                        />
                                    </>
                                ))}
                            </div>
                        </div>
                    </section>
                </Grid>
            </Grid>
        </>
    )
}

export default MyProfile