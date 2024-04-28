import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import UserLeaderboard from "../components/UserLeaderboard";
import { getLeaderboards } from "../utils/data";

function Leaderboard() {
    const [leaderboard, setLeaderboard] = useState([]);
    
    useEffect(() => {
        async function fetchLeaderboard() {
            const leaderboardFetch = await getLeaderboards();
            setLeaderboard(leaderboardFetch);
        }
        fetchLeaderboard();
    }, [leaderboard])
    console.log(leaderboard);
    return (
        <>
            <Header/>
            <div className="container">
                <div className="bg-gray-100 p-8 flex flex-col gap-4 rounded shadow-lg pt-24">
                    <h1 className="font-bold">Klasmen Pengguna Aktif</h1>
                    <div className="flex justify-between">
                        <p>Pengguna</p>
                        <p>Skor</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {leaderboard?.map((data, i) => {
                            return(
                                <UserLeaderboard key={i} name={data.user.name} score={data.score} avatar={data.user.avatar}/>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Navigation/>
        </>
    )
}

export default Leaderboard;