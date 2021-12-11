import { Container, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container:{
        paddingTop: theme.spacing(10),
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