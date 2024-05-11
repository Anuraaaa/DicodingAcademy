import { useEffect } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import UserLeaderboard from "../components/UserLeaderboard";
import { getLeaderboards } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { actionLeaderboard } from "../utils/redux/leaderboard/action";

function Leaderboard() {
    const leaderboards = useSelector((state) => state.leaderboard);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchLeaderboard() {
            const {data} = await getLeaderboards();
            dispatch(actionLeaderboard(data.leaderboards));
        }
        fetchLeaderboard();
    }, [dispatch])
    return (
        <>
            <Header/>
            <div className="container mx-auto">
                <div className="bg-gray-100 p-8 flex flex-col gap-4 rounded shadow-lg pt-24">
                    <h1 className="font-bold">Klasmen Pengguna Aktif</h1>
                    <div className="flex justify-between">
                        <p>Pengguna</p>
                        <p>Skor</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {leaderboards?.leaderboard?.map((data, i) => {
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