import { useEffect, useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import UserLeaderboard from "../components/UserLeaderboard";
import { getLeaderboards } from "../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { actionLeaderboard } from "../utils/redux/leaderboard/action";
import { Skeleton } from "../components/ui/skeleton";

function Leaderboard() {
    const [loading, setLoading] = useState(true);
    const leaderboards = useSelector((state) => state.leaderboard);
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchLeaderboard() {
            setLoading(true);
            try {
                const {data} = await getLeaderboards();
                dispatch(actionLeaderboard(data.leaderboards));                
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchLeaderboard();
    }, [dispatch])
    return (
        <>
            <Header/>
            <div className="container mx-auto">
                <div className="bg-gray-100 p-8 flex flex-col gap-4 rounded shadow-lg mt-8 mb-32">
                    <h1 className="font-bold">Klasmen Pengguna Aktif</h1>
                    <div className="flex justify-between">
                        <p>Pengguna</p>
                        <p>Skor</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        {loading?             
                            Array.from({ length: 10 }).map((_, index) => (                            
                                <Skeleton key={index} className="h-[24px] w-full rounded-xl bg-gray-300"/>
                            ))
                            :
                            leaderboards?.leaderboard?.map((data, i) => {
                                return(
                                    <UserLeaderboard key={i} name={data.user.name} score={data.score} avatar={data.user.avatar}/>
                                )
                            })                            
                        }
                    </div>
                </div>
            </div>
            <Navigation/>
        </>
    )
}

export default Leaderboard;