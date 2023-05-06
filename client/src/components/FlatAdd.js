import { Grid, Stack, Typography } from '@mui/material'
import React from 'react'
import { FormInput, MultilineFormInput } from './common/Inputs'
import { SelectResidence, SelectRoomCount } from './common/SelectComp'
import AutoComp from './common/AutoComp'
import FileUpload from './FileUpload'

const onFilesUpload = (files) => {
    window.console.log(files)
}
const FlatAdd = () => {
    return (
        <Grid container padding={2} direction='row' sx={{ bgcolor: '#Eef1f3', height: '100vh' }}>
            <Grid item xs='12'>
                <Typography padding={2}>
                    <center><h4>İlan Ekle</h4></center>
                    <hr />
                </Typography>
                <Stack direction="row" spacing={3} padding={1}>
                    <FormInput label="Başlık" />
                    <FormInput label="Adres" />
                    <FormInput label="Fiyat" />
                </Stack>
                <Stack direction="row" spacing={3} padding={1}>
                    <MultilineFormInput label="Açıklama" />
                </Stack>
                <Stack direction="row" spacing={3} padding={1}>
                    <SelectResidence label="Mesken" />
                    <SelectRoomCount label="Oda Sayısı" />
                    <FormInput label="Metrekare" />
                </Stack>
                <Stack direction="row" spacing={3} padding={1}>
                    <AutoComp />
                </Stack>

            </Grid>
            <Grid item xs={12}>
                <FileUpload onFilesUpload={onFilesUpload} />
            </Grid>
        </Grid>
    )
}

export default FlatAdd