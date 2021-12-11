import { Avatar, Container, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container:{
        paddingTop: theme.spacing(10),
    },
    title:{
        fontSize: 16,
        fontWeight: 500,
        color: "#555",
    },
}));

const Rightbar = (props) => {
    const classes = useStyles();
    return(
    <Container className={classes.container}>
        {props.children}
    </Container>
    );
};

export default Rightbar;