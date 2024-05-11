import { Link } from "react-router-dom";

function Navigation() {
    return (
        <div className="bg-gray-700 fixed bottom-0 w-full">
            <div className="container mx-auto flex justify-around p-6">
                <ul className="flex gap-8">
                    <li>
                        <Link to={"/"} className="text-sm text-white flex flex-col items-center">
                            <span className="material-symbols-outlined text-white">gesture</span>
                            <span>Threads</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/leaderboards"} className="text-sm text-white flex flex-col items-center">
                            <span className="material-symbols-outlined text-white">leaderboard</span>
                            <span>Leaderboard</span>
                        </Link>
                    </li>
                    <li>
                        <Link to={"/login"} className="text-sm text-white flex flex-col items-center">
                            <span className="material-symbols-outlined text-white">login</span>
                            <span>Login</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navigation;