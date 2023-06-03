import React, { useEffect, useState } from 'react'
import { Box, Tabs, Tab, Typography, Stack, Button } from '@mui/material';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import axios from 'axios';
import FlatItem from "../FlatItem";
import BlogItem from '../BlogItem';

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
    const [project, setProject] = useState([]);

    const handleDeleteConfirmation = (flatId) => {
        const confirmed = window.confirm('Silmek istediğinize emin misiniz?');
        if (confirmed) {
            // Silme işlemini gerçekleştir
            axios.delete(`http://localhost:3001/api/task/${flatId}`).then((res) => {
                if (res.status === 200) {
                    setFlat((prevAds) => prevAds.filter((flat) => flat._id !== flatId));
                }
            });
        }
    };

    const handleDeleteConfirmationProject = (projectId) => {
        const confirmed = window.confirm('Silmek istediğinize emin misiniz?');
        if (confirmed) {
            // Silme işlemini gerçekleştir
            axios.delete(`http://localhost:3001/api/project/${projectId}`).then((res) => {
                if (res.status === 200) {
                    setProject((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
                }
            });
        }
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/api/task/`)
            .then((res) => {
                setFlat(res.data);
            })
            .catch((error) => { console.error(error); });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/api/project/`)
            .then((res) => {
                setProject(res.data);
            })
            .catch((error) => { console.error(error); });
    }, []);
    return (
        <>
            <Box
                sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: '100%', border: 2, borderColor: 'divider', fontSize: '35px' }}
            >
                <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider' }}
                >
                    <Tab label="İlan İşlemleri" {...a11yProps(0)} />
                    <Tab label="Proje İşlemleri" {...a11yProps(1)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <section className="section-all-re">
                        <div className="container">
                            <div className="row">
                                {flat.map((flat) => (
                                    <FlatItem
                                        key={flat._id}
                                        flatId={flat._id}
                                        src={flat.images && flat.images.length > 0 ? flat.images[0] : flat.image}
                                        onClick={() => localStorage.setItem('flatId', flat._id)}
                                        name={flat.name}
                                        title={flat.title}
                                        price={flat.price}
                                        type={flat.type}
                                        roomnumber={flat.roomnumber}
                                        squaremeters={flat.squaremeters}
                                        buttons={
                                            <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                                                <Button className="adminButtonPut" component={Link} to={`/flatupdate/${flat._id}`}>Düzenle</Button>
                                                <Button className="adminButtonDelete" onClick={() => handleDeleteConfirmation(flat._id)}>Sil</Button>
                                            </Stack>
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <section className="section-all-re">
                        <div className="container">
                            <div className="row">
                                {project.map((project) => (
                                    <BlogItem
                                        key={project._id}
                                        ProjectId={project._id}
                                        src={project.images && project.images.length > 0 ? project.images[0] : project.image}
                                        title={project.title}
                                        description={project.description}
                                        finishDate={project.finishDate}
                                        housingnumber={project.housingnumber}
                                        name={project.name}
                                        buttons={
                                            <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                                                <Button className="adminButtonPut" component={Link} to={`/projectupdate/${project._id}`}>Düzenle</Button>
                                                <Button className="adminButtonDelete" onClick={() => handleDeleteConfirmationProject(project._id)}>Sil</Button>
                                            </Stack>
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                </TabPanel>
            </Box>
        </>
    )
}

export default DashBoard