import Header from "../components/Header";
import Navigation from "../components/Navigation";

function Notfound() {
    return (
        <>
            <Header/>
            <div className="container">
                <div className="border border-gray-300 p-8 gap-4 rounded m-8">
                    <h1 className="font-bold text-xl text-center">404 Not Found</h1>
                    <p className="text-sm text-center">The request URL is not found</p>
                </div>
            </div>
            <Navigation/>
        </>
    )
}

export default Notfound;