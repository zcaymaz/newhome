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
    { title: 'The Shawshank Redemption'},
    { title: 'The Godfather'},
    { title: 'The Godfather: Part II'},
    { title: 'The Dark Knight'},
    { title: '12 Angry Men'},
    { title: "Schindler's List"},
    { title: 'Pulp Fiction'},
    { title: 'City of God'},
    { title: 'Se7en'},
    { title: 'The Silence of the Lambs'},
    { title: 'The Green Mile'},
    { title: 'The Intouchables'},
    { title: 'Modern Times'},
    { title: 'Raiders of the Lost Ark'},
    { title: 'Rear Window'},
    { title: 'The Pianist'},
    { title: 'The Departed'},
    { title: 'Terminator 2: Judgment Day'},
    { title: 'Back to the Future'},
    { title: 'Whiplash'},
    { title: 'Gladiator'},
    { title: 'Memento'},
    { title: 'The Prestige'},
    { title: 'The Lion King'},
    { title: 'Apocalypse Now'},
    { title: 'Alien'},
    { title: 'Sunset Boulevard'},
];