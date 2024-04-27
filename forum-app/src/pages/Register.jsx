import FormAuth from "../components/FormAuth";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

function Register() {
    return(
        <>
            <Header/>
            <FormAuth state={"register"}/>
            <Navigation/>
        </>
    )
}

export default Register;