import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { Avatar, Grid, InputLabel, Typography, AppBar, Tabs, Tab, Box } from '@mui/material'
import FlatItem from '../FlatItem'
import BlogItem from '../BlogItem'
import axios from 'axios'
import logo from '../images/logo.png'
import { FormInput, MultilineFormInput } from '../common/Inputs'

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

const Profile = (flatId) => {
    const [myAds, setMyAds] = useState([])
    const [myProject, setMyProject] = useState([])
    const [user, setUser] = useState([])
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    useEffect(() => {
        axios.post(`http://localhost:3001/api/task/email`, { useremail: localStorage.getItem('useremail') }).then((res) => { setMyAds(res.data) })
    }, [])

    useEffect(() => {
        axios.post(`http://localhost:3001/api/project/email`, { useremail: localStorage.getItem('useremail') }).then((res) => { setMyProject(res.data) })
    }, [])

    useEffect(() => {
        axios.post(`http://localhost:3001/user/useremail`, { email: localStorage.getItem('useremail') })
          .then((res) => {
            setUser(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);
      

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
                                <Typography sx={{ fontSize: '20px' }}>{user.name}</Typography>
                            </center>
                        </Grid>
                        <Grid item xs={12} md={6} pl={1}>
                            <Grid container direction="row">
                                <Grid item xs={12} pt={1}>
                                    <div>
                                        <InputLabel>Telefon Numarası:</InputLabel>
                                        <FormInput placeholder={user.gsmno} disabled />
                                    </div>
                                </Grid>
                                <Grid item xs pt={1}>
                                    <InputLabel>Adres:</InputLabel>
                                    <MultilineFormInput placeholder={user.address} disabled />
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

export default Profile