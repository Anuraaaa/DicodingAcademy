import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useInput from "../components/UseInput"
import { showToast } from "../utils/toast.js"
import { loginUser, putAccessToken, registerUser } from "../utils/data.js";
import { useDispatch } from "react-redux";
import { actionLogin } from "../utils/redux/auth/action.js";

function FormAuth({ state }) {
    const [email, onEmailChange] = useInput('');
    const [password, onPasswordChange] = useInput('');  
    const [confpassword, onConfPasswordChange] = useInput('');  
    const [username, onUsernameChange] = useInput('');  

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loginSuccess = ({ token }) => {
        putAccessToken(token);
        showToast('Berhasil login', "white", "green");
        navigate('/');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (state == "login") {
            if (email.length === 0)
                return showToast('Gagal login! email tidak ada', "white", "red");            
    
            if (email.length > 64)
                return showToast('Gagal login! email maksimal 64 karakter', "white", "red");            
    
            if (password.length === 0)
                return showToast('Gagal login! password tidak ada', "white", "red");            
    
            if (password.length < 6)
                return showToast('Gagal login! password minimal 6 karakter', "white", "red");            
    
            if (password.length > 255)
                return showToast('Gagal login! password maksimal 255 karakter', "white", "red"); 
            
            const {error, message, data} = await loginUser({email, password});

            if (error)
                return showToast(`Gagal login! ${message}`, "white", "red");
            
            loginSuccess(data);
            dispatch(actionLogin(data));
        }
        else if (state == "register") {
            if (username.length === 0)
                return showToast('Gagal register! username tidak ada', "white", "red");            

            if (username.length > 24)
                return showToast('Gagal register! username maksimal 24 karakter', "white", "red");            

            if (email.length === 0)
                return showToast('Gagal register! email tidak ada', "white", "red");            
    
            if (email.length > 64)
                return showToast('Gagal register! email maksimal 64 karakter', "white", "red");            
    
            if (password.length === 0)
                return showToast('Gagal register! password tidak ada', "white", "red");            
    
            if (password.length < 6)
                return showToast('Gagal register! password minimal 6 karakter', "white", "red");            
    
            if (password.length > 255)
                return showToast('Gagal register! password maksimal 255 karakter', "white", "red");                            
            
            if (password != confpassword)
                return showToast('Gagal register! password tidak sama dengan konfirmasi password', "white", "red");                            

            const {error, message} = await registerUser({name: username, email: email, password: password});

            if (error)
                return showToast(`Gagal register! ${message}`, "white", "red");

            showToast('Berhasil register, silahkan login', "white", "green");
            navigate('/login');
        }
    }

    return (
        <>
            <div className="container px-8 py-16 mx-auto">
                <form className="flex flex-col border border-gray-300 p-8 gap-4 rounded mt-4 mb-32" onSubmit={handleSubmit}>
                    <h1 className="text-center font-bold">{state == "register"? "Form Register" : "Form Login"}</h1>
                    {state == "register" && <>     
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" className="border border-gray-500 rounded p-2" value={username} onChange={onUsernameChange}/>
                        </div>           
                    </>}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="border border-gray-500 rounded p-2" value={email} onChange={onEmailChange}/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="border border-gray-500 rounded p-2" value={password} onChange={onPasswordChange}/>
                    </div>

                    {state == "register" && <>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="confpassword">Password Confirmation</label>
                            <input type="password" id="confpassword" className="border border-gray-500 rounded p-2" value={confpassword} onChange={onConfPasswordChange}/>
                        </div>
                    </>}

                    <div className="flex flex-row justify-between items-center">
                        <Link className="text-sm" to={state == "register"? "/login": "/register"}>{state == "register"? "Have an account? Login here" : "Don't have account? Register here"}</Link>
                        <button className="bg-gray-700 rounded p-2 w-[10%] self-end text-white">{state == "register"? "Register" : "Login"}</button>
                    </div>
                </form>            
            </div>
        </>
    )
}

FormAuth.propTypes = {
    state: PropTypes.string.isRequired
}

export default FormAuth;