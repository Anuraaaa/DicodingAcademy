import React from "react";
import { showToast } from "../utils/NoteToast";
import { register } from "../utils/network-data";
import { Link, useNavigate } from "react-router-dom";
import useInput from "../components/UseInput";
import { useLocaleProvider } from "../components/LocaleProvider";

function Registerpage() {

    const [name, onNameChange] = useInput('');
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');
    const [confpassword, onConfPasswordChange] = useInput('');
    const { language } = useLocaleProvider();

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        if (name.length == 0)
            return showToast("Gagal register! nama tidak ada", "white", "red");            
        
        if (name.length > 16)
            return showToast("Gagal register! nama maksimal 16 karakter", "white", "red");            
    
        if (email.length == 0)
            return showToast("Gagal register! email tidak ada", "white", "red");            

        if (email.length > 64)
            return showToast("Gagal register! email maksimal 64 karakter", "white", "red");            

        if (password.length == 0)
            return showToast("Gagal register! password tidak ada", "white", "red");            

        if (password.length < 6)
            return showToast("Gagal register! password minimal 6 karakter", "white", "red");            

        if (password.length > 255)
            return showToast("Gagal register! password maksimal 255 karakter", "white", "red");            

        if (password != confpassword)
            return showToast("Gagal register! konfirmasi password tidak sama", "white", "red");            

        const { error } = await register({
            name,
            email,
            password
        });
        if (error) {
            showToast("Gagal register", "white", "red");            
        } else {            
            showToast("Berhasil register", "black", "rgb(0, 204, 255)"); 
            navigate("/login");           
        }
    };

    return (
        <form className="note-container" id="form" onSubmit={handleSubmit}>
            <h1>Register</h1>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={onNameChange} />
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={onEmailChange} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={onPasswordChange} />
            </div>
            <div className="form-group">
                <label htmlFor="confpassword">Confirm Password</label>
                <input type="password" id="confpassword" value={confpassword} onChange={onConfPasswordChange} />
            </div>
            <div className="form-group-row">
                <Link to={"/login"}>{language == 'en' ? 'Already have an account? Login here' : 'Sudah punya akun? Login disini'}</Link>
                <button type="submit">Register</button>
            </div>
        </form>
    )
}

export default Registerpage;