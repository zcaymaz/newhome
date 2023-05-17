import React, { useEffect, useState} from 'react'
import { Box, Tabs, Tab, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import FlatItem from "../FlatItem";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const DashBoard = () => {
    const [value, setValue] = React.useState(0);
    const [flat, setFlat] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/task/`)
            .then((res) => {
                setFlat(res.data);
            })
            .catch((error) => { console.error(error); });
    }, []);
    return (
        <>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100vh', border: 2, borderColor: 'divider', fontSize: '35px' }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="Kullanıcı İşlemleri" {...a11yProps(0)} />
                    <Tab label="İlan İşlemleri" {...a11yProps(1)} />
                    <Tab label="Yetki İşlemleri" {...a11yProps(2)} />
                    <Tab label="Proje İşlemleri" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    Kullanıcı İşlemleri
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <section className="section-all-re">
                        <div className="container">
                            <div className="row">
                                {flat.map((flat) => (
                                    <FlatItem
                                        src={flat.images && flat.images.length > 0 ? flat.images[0] : flat.image}
                                        onClick={() => localStorage.setItem('flatId', flat._id)}
                                        name={flat.name}
                                        title={flat.title}
                                        price={flat.price}
                                        type={flat.type}
                                        roomnumber={flat.roomnumber}
                                        squaremeters={flat.squaremeters}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Yetki İşlemleri
                </TabPanel>
                <TabPanel value={value} index={3}>
                    Proje İşlemleri
                </TabPanel>
            </Box>
        </>
    )
}

export default DashBoard