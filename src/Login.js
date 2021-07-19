import React from 'react'
import "./Login.css";
import { auth, googleAuthProvider } from "./firebase";
import { useDataLayerContextValue } from "./DataLayer";
import { actionTypes } from "./reducer";
import logo from "./assets/logo/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();
function Login() {
    const [{ }, dispatch] = useDataLayerContextValue();

    const signIn = () => {

        auth
            .signInWithPopup(googleAuthProvider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                })
                toast.success("You are now signed in!!", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                });
            }
            )
            .catch((error) => {
                toast.error("Some error occured during signing in", {
                    position: toast.POSITION.BOTTOM_CENTER,
                    autoClose: 3000,
                });
            });
    };
    return (
        <div className="login">
            <div className="login__container">
                <div className=" justify-center flex">
                    <img className="lg:mb-10 md:mb-5 mb-0 object-contain"
                        src={logo}
                        alt=""
                    />
                </div>

                <div className=" justify-center flex space-x-4">
                    <img onClick={signIn} className="lg:mb-10 md:mb-5 -mb-4 w-48 object-contain cursor-pointer justify-center text-center place-content-center"
                        src="/images/buttons/g-sign.png"
                        alt=""
                    />


                </div>


            </div>
        </div>
    )
}

export default Login
