import { Avatar, Container, makeStyles, Typography } from "@material-ui/core";
import { AvatarGroup } from '@material-ui/lab'

const useStyles = makeStyles((theme) => ({
    container:{
        paddingTop: theme.spacing(10),
    },
    title:{
        fontSize: 16,
        fontWeight: 500,
        color: "#555",
    }
}));

const Rightbar = () => {
    const classes = useStyles();
    return(
    <Container className={classes.container}>
        <Typography className={classes.title} gutterBottom>Online Friends</Typography>
        <AvatarGroup max={4}>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
        </AvatarGroup>
    </Container>
    );
};

export default Rightbar;