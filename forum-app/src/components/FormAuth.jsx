import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function FormAuth({ state }) {
    return (
        <>
            <div className="container px-8 py-16">
                <form action="#" className="flex flex-col border border-gray-300 p-8 gap-4 rounded">
                    <h1 className="text-center font-bold">{state == "register"? "Form Register" : "Form Login"}</h1>
                    {state == "register" && <>     
                        <div className="flex flex-col gap-2">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" className="border border-gray-500 rounded p-2"/>
                        </div>           
                    </>}
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="border border-gray-500 rounded p-2"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" className="border border-gray-500 rounded p-2"/>
                    </div>

                    {state == "register" && <>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="confpassword">Password Confirmation</label>
                            <input type="password" id="confpassword" className="border border-gray-500 rounded p-2"/>
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