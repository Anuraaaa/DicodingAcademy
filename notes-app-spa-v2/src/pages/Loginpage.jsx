import React from "react";
import { showToast } from "../utils/NoteToast";
import { login } from "../utils/network-data";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../components/UseInput";
import PropTypes from "prop-types";

function Loginpage({ loginSuccess }) {

    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (email.length == 0)
            return showToast("Gagal login! email tidak ada", "white", "red");            

        if (email.length > 64)
            return showToast("Gagal login! email maksimal 64 karakter", "white", "red");            

        if (password.length == 0)
            return showToast("Gagal login! password tidak ada", "white", "red");            

        if (password.length < 6)
            return showToast("Gagal login! password minimal 6 karakter", "white", "red");            

        if (password.length > 255)
            return showToast("Gagal login! password maksimal 255 karakter", "white", "red");            

        const { error, data } = await login({
            email,
            password
        });
        if (error) {
            showToast("Gagal login", "white", "red");            
        } else {            
            loginSuccess(data);
            showToast("Berhasil login", "black", "rgb(0, 204, 255)"); 
            navigate("/");           
        }
    };

    return (
        <form className="note-container" id="form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={onEmailChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={onPasswordChange} />
            </div>
            <div className="form-group-row">
                <Link to={"/register"}>Don't have an account? Register here</Link>
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

Loginpage.propTypes = {
    loginSuccess: PropTypes.func.isRequired
}

export default Loginpage;