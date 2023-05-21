import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { Avatar, Grid, InputLabel, Typography, AppBar, Tabs, Tab, Box, Button, Stack } from '@mui/material'
import FlatItem from '../FlatItem'
import BlogItem from '../BlogItem'
import axios from 'axios'
import logo from '../images/logo.png'
import { FormInput, MultilineFormInput } from '../common/Inputs'
import { Link } from "react-router-dom";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
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
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const MyProfile = (flatId) => {
    const [myAds, setMyAds] = useState([])
    const [myProject, setMyProject] = useState([])
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        axios.post(`http://localhost:3001/api/task/email`, { useremail: localStorage.getItem('email') }).then((res) => { setMyAds(res.data) })
    }, [])

    useEffect(() => {
        axios.post(`http://localhost:3001/api/project/email`, { useremail: localStorage.getItem('email') }).then((res) => { setMyProject(res.data) })
    }, [])

    const handleDeleteConfirmation = (adId) => {
        const confirmed = window.confirm('Silmek istediğinize emin misiniz?');
        if (confirmed) {
          // Silme işlemini gerçekleştir
          axios.delete(`http://localhost:3001/api/task/${adId}`).then((res) => {
            if (res.status === 200) {
              setMyAds((prevAds) => prevAds.filter((ad) => ad._id !== adId));
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
              setMyProject((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
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
    
    return (
        <>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={10} mt={3} p={5} sx={{ bgcolor: '#ffffff', borderRadius: '10px', border: '1px #f0f0f0 solid' }} >
                    <Grid container direction="row">
                        <Grid item xs={12} md={6} p={1} justifyContent="center">
                            <center>
                                <Avatar src={logo} sx={{ width: 170, height: 170, border: '1px solid #ededed' }} />
                                <Typography sx={{ fontSize: '20px' }}>{localStorage.getItem('name')}</Typography>
                            </center>
                        </Grid>
                        <Grid item xs={12} md={6} pl={1}>
                            <Grid container direction="row">
                                <Grid item xs={12} pt={1}>
                                    <div>
                                        <InputLabel>Telefon Numarası:</InputLabel>
                                        <FormInput placeholder={localStorage.getItem('gsmno')} disabled />
                                    </div>
                                </Grid>
                                <Grid item xs pt={1}>
                                    <InputLabel>Adres:</InputLabel>
                                    <MultilineFormInput placeholder={localStorage.getItem('address')} disabled />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
                        <AppBar position="static">
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                            >
                                <Tab sx={{ fontSize: '20px' }} label="İlanlar" {...a11yProps(0)} />
                                <Tab sx={{ fontSize: '20px' }} label="Projeler" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={value} onChangeIndex={handleChangeIndex}>
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                <section className="section-all-re">
                                    <div className="container">
                                        <div className="row">
                                            {myAds.map((ad) => (
                                                <>
                                                    <FlatItem
                                                        key={ad._id}
                                                        flatId={ad._id}
                                                        name={ad.name}
                                                        title={ad.title}
                                                        price={ad.price}
                                                        type={ad.type}
                                                        roomnumber={ad.roomnumber}
                                                        squaremeters={ad.squaremeters}
                                                        onClick={() => localStorage.setItem('flatId', ad._id)}
                                                        src={ad.images && ad.images.length > 0 ? ad.images[0] : ad.image}
                                                        buttons={      
                                                        <Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
                                                            <Button className="adminButtonPut" component={Link} to={`/flatupdate/${ad._id}`}>Düzenle</Button>
                                                            <Button className="adminButtonDelete" onClick={() => handleDeleteConfirmation(ad._id)}>Sil</Button>
                                                        </Stack>
                                                        }
                                                    />
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </section>
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                            <section className="section-all-re">
                                    <div className="container">
                                        <div className="row">
                                        {myProject.map((project) => (
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
                        </SwipeableViews>
                    </Box>
                </Grid>
            </Grid>
        </>
    )
}

export default MyProfile