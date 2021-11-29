import { Container, makeStyles, Typography } from "@material-ui/core";
import { Home, People, Settings, ExitToApp } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    container:{
        height: "100vh",
        color: "white",
        paddingTop: theme.spacing(10),
        backgroundColor: theme.palette.primary.main,
        position: "sticky",
        top: 0,
    },
    item:{
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(5),
        [theme.breakpoints.up("sm")]:{
            marginBottom: theme.spacing(4),
            cursor: "pointer"
        },
    },
    text: {
        fontWeight: 500,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
}));

const DrawerLeft = () => {
    const classes = useStyles();
    return (
    <Container className={classes.container}>
        <div className={classes.item}>
            <Home className={classes.icon}/>
            <Typography className={classes.text}>Home</Typography>
        </div>
        <div className={classes.item}>
            <People className={classes.icon}/>
            <Typography className={classes.text}>Friends</Typography>
        </div>
        <div className={classes.item}>
            <People className={classes.icon}/>
            <Typography className={classes.text}>Groups</Typography>
        </div>
        <div className={classes.item}>
            <Settings className={classes.icon}/>
            <Typography className={classes.text}>Settings</Typography>
        </div>
        <div className={classes.item}>
            <ExitToApp className={classes.icon}/>
            <Typography className={classes.text}>Logout</Typography>
        </div>
    </Container>
    );
};

export default DrawerLeft;