import { Avatar, Container, makeStyles, Typography } from "@material-ui/core";
import { AvatarGroup } from '@material-ui/lab'
import MySavedPosts from "../pages/MySavedPosts";

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
        <Typography className={classes.title} gutterBottom>Friends</Typography>
        <AvatarGroup max={4}>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
        </AvatarGroup>
        <h1>My Saved Posts</h1>
        <MySavedPosts />
    </Container>
    );
};

export default Rightbar;