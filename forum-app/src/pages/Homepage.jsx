import HeaderThread from "../components/HeaderThread";
import Navigation from "../components/Navigation";
import Thread from "../components/Thread";

function Homepage() {
    return (
        <>
            <Navigation/>
            <div className="container">
                <HeaderThread/>
                <Thread/>
                <Thread/>
                <Thread/>
            </div>
        </>
    )
}

export default Homepage;