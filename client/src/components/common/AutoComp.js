import React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function AutoComp(props) {
    return (
        <Autocomplete
            sx={{width:'100%'}}
            multiple
            name={props.name}
            id={props.id}
            size="medium"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            value={props.value}
            onChange={props.onChange}
            renderTags={() =>
                props.value.map((option, index) => (
                    <Chip
                        sx={{ bgcolor: 'white' }}
                        variant="outlined"
                        label={option.title}
                        value={option.title}
                        size="small"
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    sx={{ bgcolor: 'white' }}
                    {...params}
                    label="Özellikler"
                    placeholder="Seçiniz"
                />
            )}
        />
    );
}

const top100Films = [
    { title: 'Amerikan Mutfak'},
    { title: 'Beyaz Eşya'},
    { title: 'Duşakabin'},
    { title: 'Fiber İnternet'},
    { title: 'Laminant Zemin'},
    { title: "Vestiyer"},
    { title: 'Ankastre Set'},
    { title: 'Duvar Kağıdı'},
    { title: 'Kiler'},
    { title: 'Mutfak Doğalgazı'},
    { title: 'Seramik Zemin'},
    { title: 'Asansör'},
    { title: 'Ebeveyn Banyosu'},
    { title: 'Gömme Dolap'},
    { title: 'Klima'},
    { title: 'Teras'},
    { title: 'Görüntülü Diyafon'},
    { title: 'Parke Zemin'},
    { title: 'Spot Aydınlatma'},
    { title: '24 Saat Güvenlik'},
    { title: 'Müstakil Havuzlu'},
    { title: 'Ses Yalıtımı'},
    { title: 'Isı Yalıtımı'},
    { title: 'Yüzme Havuzu (Açık)'},
    { title: 'Yüzme Havuzu (Kapalı)'},
    { title: 'Kamera Sistemi'},
    { title: 'Otopark'},
    { title: 'Kapıcı'},
    { title: 'Jeneratör'},
    { title: 'Su Deposu'},
    { title: 'Yangın Merdiveni'},
    { title: 'Jakuzi'},
    { title: 'Çelik Kapı'},
    { title: 'Çamaşır Odası'},
    { title: 'Isıcam'},
    { title: 'Set Üstü Ocak'},
    { title: 'Mutfak Doğalgazı'},
    { title: 'Şofben'},
    { title: 'Teras'},
    { title: 'Termosifon'},
    { title: 'Küvet'},
    { title: 'Aliminyum Doğrama'},
];