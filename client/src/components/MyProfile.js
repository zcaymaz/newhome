import { Avatar, Grid, Input, Typography } from '@mui/material'
import React from 'react'
import FlatItem from './FlatItem'
import Title from './Title'

const MyProfile = () => {
    return (
        <>
            <Grid container direction="row" justifyContent="center">
                <Grid item xs={8} mt={3} p={5} sx={{ border: 'orange 2px solid' }} >
                    <Grid container direction="row">
                        <Grid item xs={4} p={1} sx={{ bgcolor: 'red' }}>
                            <Avatar />
                            <Typography>Güzel Emlak</Typography>
                        </Grid>
                        <Grid item xs pl={1} sx={{ bgcolor: 'khaki' }}>
                            <Grid container direction="row">
                                <Grid item xs={6} pt={1}>
                                    <Typography>Telefon Numarası:</Typography>
                                    <Input disabled placeholder='05417143740' sx={{border:'#dedede 3px solid', bgcolor:'#eeeeee', width:'80%', borderRadius:'8px', }}/>
                                </Grid>
                                <Grid item xs pt={1}>
                                    <Typography>Adres:</Typography>
                                    <Input disabled placeholder='Ankara/Çukurören' sx={{border:'#dedede 3px solid', bgcolor:'#eeeeee', width:'80%', borderRadius:'8px', }}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <section className="section-all-re">
                    <div className="container">
                        <Title title="İlanlarım" description="" />
                        <div className="row">
                            <FlatItem slug="lorem-ipsum-1" />
                            <FlatItem slug="lorem-ipsum-2" />
                            <FlatItem slug="lorem-ipsum-3" />
                            <FlatItem slug="lorem-ipsum-4" />
                            <FlatItem slug="lorem-ipsum-5" />
                            <FlatItem slug="lorem-ipsum-6" />
                        </div>
                    </div>
                </section>
            </Grid>
        </>
    )
}

export default MyProfile