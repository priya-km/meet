import React from "react";
import './WelcomeScreen.css';
import logo from './meet-300.png';


function WelcomeScreen(props) {
    return props.showWelcomeScreen ?
        (
            <div className="WelcomeScreen">
             <img src={logo} alt="meet-app-logo" width="300" />

            <h1>Welcome</h1>
            <h4>
            For web developers around the world <br></br>Log in to view events near you
</h4>
<div className="button_cont" align="center">
<div class="google-btn">
<div class="google-icon-wrapper">
<img
class="google-icon"
src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Log
o.svg"
alt="Google sign-in"
/>
</div>
<button onClick={() => { props.getAccessToken() }}
rel="nofollow noopener"
class="btn-text"
>
<b>Sign in with Google</b>
</button>
</div>
</div>
<a href="https://priya-km.github.io/meet/privacy.html">Privacy policy</a>
</div>
)
: null
}
export default WelcomeScreen;