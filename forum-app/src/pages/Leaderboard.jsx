import Header from "../components/Header";
import Navigation from "../components/Navigation";
import UserLeaderboard from "../components/UserLeaderboard";

function Leaderboard() {
    return (
        <>
            <Header/>
            <div className="container">
                <div className="bg-gray-100 p-8 flex flex-col gap-4 rounded shadow-lg">
                    <h1 className="font-bold">Klasmen Pengguna Aktif</h1>
                    <div className="flex justify-between">
                        <p>Pengguna</p>
                        <p>Skor</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <UserLeaderboard/>
                        <UserLeaderboard/>
                        <UserLeaderboard/>
                    </div>
                </div>
            </div>
            <Navigation/>
        </>
    )
}

export default Leaderboard;