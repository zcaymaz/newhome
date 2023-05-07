import React, { useEffect, useState } from 'react'
import { Avatar, Grid, Input, InputLabel, Typography } from '@mui/material'
import FlatItem from './FlatItem'
import Title from './Title'
import axios from 'axios'

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
                        <Grid item xs={12} p={1} justifyContent="center">
                            <center>
                                <Avatar />
                                <Typography>Güzel Emlak</Typography>
                            </center>
                        </Grid>
                        <Grid item xs pl={1}>
                            <center>
                                <Grid container direction="row">
                                    <Grid item xs={6} pt={1}>
                                        <div>
                                            <InputLabel>Telefon Numarası</InputLabel>
                                            <Input disabled placeholder='05417143740' sx={{ border: '#dedede 3px solid', bgcolor: '#eeeeee', width: '80%', borderRadius: '8px', }} />
                                        </div>
                                    </Grid>
                                    <Grid item xs pt={1}>
                                        <InputLabel>Adres</InputLabel>
                                        <Input disabled placeholder='Ankara/Çukurören' sx={{ border: '#dedede 3px solid', bgcolor: '#eeeeee', width: '80%', borderRadius: '8px', }} />
                                    </Grid>
                                </Grid>
                            </center>
                        </Grid>
                    </Grid>
                </Grid>
                <section className="section-all-re">
                    <div className="container">
                        <Title title="İlanlarım" description="" />
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
        </>
    )
}

export default MyProfile