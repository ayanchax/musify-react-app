import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from "react";
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import ShareIcon from '@material-ui/icons/Share';
import "./ShareDialog.css";


import { ShareSocial } from 'react-share-social'

const style = {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
};


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ShareDialog = ({ url, title, isOpen, updateModalState }) => {
    if (isOpen) {
        return (
            <div>

                <Dialog
                    open={isOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={updateModalState}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle id="alert-dialog-slide-title"><div className="dialog__title"><ShareIcon /><span >{title}</span></div></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <ShareSocial
                                style={style}
                                title={document.title}
                                url={url}
                                socialTypes={['facebook', 'twitter', 'reddit', 'linkedin', 'whatsapp']}
                                onSocialButtonClicked={data => updateModalState}
                            />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={updateModalState} color="primary">
                            Close
                        </Button>

                    </DialogActions>
                </Dialog>
            </div>
        )

    }

    return null;
};




export default ShareDialog
