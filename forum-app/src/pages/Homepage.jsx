import Header from "../components/Header";
import HeaderThread from "../components/HeaderThread";
import Navigation from "../components/Navigation";
import Thread from "../components/Thread";

function Homepage() {
    return (
        <>
            <Header/>
            <div className="container">
                <HeaderThread/>
                <Thread/>
                <Thread/>
                <Thread/>
            </div>
            <Navigation/>
        </>
    )
}

export default Homepage;