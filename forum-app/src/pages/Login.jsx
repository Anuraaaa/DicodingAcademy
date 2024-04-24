import FormAuth from "../components/FormAuth";
import Navigation from "../components/Navigation";

function Login() {
    return (
        <>
            <Navigation/>
            <FormAuth state={"login"}/>
        </>
    )
}

export default Login;