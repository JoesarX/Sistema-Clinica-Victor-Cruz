import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../Modules/AuthContext.js';
import { AppBar, Avatar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography } from '@mui/material';
import { Menu, Logout, People, Home, Medication, Contacts, CalendarMonth, Biotech, Savings } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const { isLoggedIn, handleSignOut } = useContext(AuthContext);
    const [open, setOpen] = useState(false);
    const [userFullName, setUserFullName] = useState("");
    const [userShortName, setUserShortName] = useState("NA");
    const navigate = useNavigate();
    const loggedUser = localStorage.getItem("loggedInUserName");
    const Master = localStorage.getItem("400");
    const Admin = localStorage.getItem("300");
    const User = localStorage.getItem("100");

    const handleSignOutClick = () => {
        localStorage.clear();
        navigate('/');
        handleSignOut();
    };
    useEffect(() => {
        if (loggedUser) {
            setUserFullName(loggedUser);
            setUserShortName(loggedUser.charAt(0).toUpperCase());
        }

    }, [loggedUser]);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (

        <>
            <Box sx={{ flexGrow: 1, backgroundColor: 'rgb(255,0,0)' }} >
                <AppBar position="static" sx={{ bgcolor: "#002366" }}>
                    <Toolbar>
                        <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }} onClick={toggleDrawer}>
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Clinica Victor Cruz
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>

            <Drawer anchor="left" open={open} onClose={toggleDrawer}>
                <Box sx={{ width: 250, bgcolor: "#002366", color: "white", height: "100vh" }} onClick={toggleDrawer} onKeyDown={toggleDrawer}>
                    <Box width="100%" sx={{ display: "flex", flexDirection: "column", alignItems: "center", pt: 3, pb: 1 }}>
                        <Avatar sx={{ bgcolor: "white", color: "#002366", mb: 1, textTransform: 'capitalize' }}>{userShortName}</Avatar>
                        <Typography variant="body1" sx={{ textTransform: "capitalize", wordBreak: 'break-word', textAlign: 'center', maxWidth: '100%', padding: '0 10px' }}>
                            {userFullName}
                        </Typography>
                    </Box>
                    <List>
                        <Link to="/" style={{ textDecoration: 'none', color: "white" }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: "white" }}><Home /></ListItemIcon>
                                    <ListItemText primary={"Home"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/expedientes" style={{ textDecoration: 'none', color: "white" }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: "white" }}><Contacts /></ListItemIcon>
                                    <ListItemText primary={"Expedientes"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/Medicamentos" style={{ textDecoration: 'none', color: "white" }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: "white" }}><Medication /></ListItemIcon>
                                    <ListItemText primary={"Medicamentos"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/administrador" style={{ textDecoration: 'none', color: "white" }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: "white" }}><People /></ListItemIcon>
                                    <ListItemText primary={"Colaboradores"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/citas_tabla" style={{ textDecoration: 'none', color: "white" }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: "white" }}><CalendarMonth /></ListItemIcon>
                                    <ListItemText primary={"Citas"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/examenes" style={{ textDecoration: 'none', color: "white" }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: "white" }}><Biotech /></ListItemIcon>
                                    <ListItemText primary={"Examenes"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <Link to="/finanzas" style={{ textDecoration: 'none', color: "white" }}>
                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: "white" }}><Savings /></ListItemIcon>
                                    <ListItemText primary={"Finanzas"} />
                                </ListItemButton>
                            </ListItem>
                        </Link>
                        <ListItem disablePadding>
                            <ListItemButton onClick={handleSignOutClick}>
                                <ListItemIcon sx={{ color: "white" }}><Logout /></ListItemIcon>
                                <ListItemText primary={"Cerrar Sesión"} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default NavBar;