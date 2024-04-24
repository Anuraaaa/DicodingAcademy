import FormAuth from "../components/FormAuth";
import Navigation from "../components/Navigation";

function Register() {
    return(
        <>
            <Navigation/>
            <FormAuth state={"register"}/>
        </>
    )
}

export default Register;