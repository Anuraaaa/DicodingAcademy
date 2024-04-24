import { Link } from "react-router-dom";

function Navigation() {
    return (
        <div className="container bg-red-100">
            <div className="flex justify-around p-6">
                <h1 className="font-bold text-lg">Forum App</h1>
                <ul className="flex gap-8">
                    <li>
                        <Link to={"/"} className="text-sm">Home</Link>
                    </li>
                    <li>
                        <Link to={"/login"} className="text-sm">Login</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navigation;