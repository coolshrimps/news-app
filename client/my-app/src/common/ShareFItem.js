import React from "react";
import '../styles/ShareItem.css'
import { withStyles } from '@material-ui/core/styles';
import 'x-dialog/lib/index.css';
import { MdShare } from 'react-icons/md';
import {
    EmailShareButton,
    FacebookShareButton,
    TwitterShareButton,
} from "react-share";
import {
    EmailIcon,
    FacebookIcon,
    TwitterIcon
} from "react-share";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
    root: {
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[700],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default class ShareItem extends React.Component{
    constructor() {
        super();
        this.state={
            open:false
        }
        this.tag=['Kun_Shi_NewsApp'];
    }

    handleClickOpen = (e) => {
        this.setState({
            open:true
        })
        e.preventDefault();
        if(this.props.type ==='guardian'){
            this.url="https://www.theguardian.com/" + this.props.id;
        }
        else {
            this.url= this.props.id;
        }

    };

    handleClose = (e) => {
        this.setState({
            open:false
        })
        e.preventDefault();
    };

    render(){
        return (
            <div style={{display:"inline"}}>
                <MdShare onClick={this.handleClickOpen}></MdShare>
                <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
                    <DialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                        {this.props.info.title}
                    </DialogTitle>
                    <DialogContent dividers>
                        <Typography gutterBottom>
                            <div style={{width:'100%', textAlign:'center',fontSize:'larger'}}>Share via</div>
                        </Typography>
                        <Typography gutterBottom>
                            <div className='iconBar'>
                                <FacebookShareButton hashtag="#Kun_Shi_NewsApp" url={this.props.info.url}  className='shareIcon' ><FacebookIcon round={true}></FacebookIcon></FacebookShareButton>
                                <TwitterShareButton hashtags={this.tag} url={this.props.info.url} className='shareIcon'><TwitterIcon round={true}></TwitterIcon></TwitterShareButton>
                                <EmailShareButton subject="#Kun_Shi_NewsApp"  url={this.props.info.url} className='shareIcon'><EmailIcon round={true}></EmailIcon></EmailShareButton>
                            </div>
                        </Typography>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}