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
import {
    FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon, LinkedinIcon, LinkedinShareButton,
    WhatsappShareButton, WhatsappIcon, FacebookMessengerIcon, FacebookMessengerShareButton
} from "react-share";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const ShareDialog = ({ url, networks, title, contentTitle, isOpen, updateModalState }) => {
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
                            <div className="dialog__share__container">
                                {networks.map((network) => (

                                    <div key={network}>
                                        {network === "facebook" && <FacebookShareButton
                                            url={url}
                                            quote={contentTitle}
                                            hashtag="#musify"
                                            className="dialog__some-network__share-button"
                                        >
                                            <FacebookIcon size={32} round />
                                        </FacebookShareButton>
                                        }
                                        {network === "messenger" && <FacebookMessengerShareButton
                                            url={url}
                                            hashtag="#musify"
                                            quote={contentTitle}
                                            className="dialog__some-network__share-button"
                                        >
                                            <FacebookMessengerIcon size={32} round />
                                        </FacebookMessengerShareButton>
                                        }

                                        {network === "whatsapp" && <WhatsappShareButton
                                            url={url}
                                            hashtag="#musify"
                                            quote={contentTitle}
                                            className="dialog__some-network__share-button"
                                        >
                                            <WhatsappIcon size={32} round />
                                        </WhatsappShareButton>
                                        }
                                        {network === "twitter" && <TwitterShareButton
                                            url={url}
                                            hashtag="#musify"
                                            quote={contentTitle}
                                            className="dialog__some-network__share-button"
                                        >
                                            <TwitterIcon size={32} round />
                                        </TwitterShareButton>
                                        }

                                        {network === "linkedin" && <LinkedinShareButton
                                            url={url}
                                            hashtag="#musify"
                                            quote={contentTitle}
                                            className="dialog__some-network__share-button"
                                        >
                                            <LinkedinIcon size={32} round />
                                        </LinkedinShareButton>
                                        }

                                    </div>
                                ))}
                            </div>

                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className="dialog__button" onClick={updateModalState} color="primary">
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
