import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { formatDate, parseHTML } from "../utils/formatter";
import { useEffect, useState } from "react";
import { getAllUser } from "../utils/data";

function Thread({title, body, category, createdAt, totalComments, totalLike, totalDislike, ownerId, id}) {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        async function getUsers() {
            const {data} = await getAllUser();
            setUsers(data.users);
        }
        getUsers();
    }, [users])
    const filterUser = users?.filter((data) => data.id == ownerId);
    return (
        <>
            <div className="flex flex-col gap-4 border-b-1 border-b-gray-200 p-4 shadow-lg">
                <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                    <p>{category}</p>
                </div>
                <h1 className="font-bold text-xl"><Link to={`/single-thread/${id}`}>{title}</Link></h1>
                <p className="text-md"><Link to={`/single-thread/${id}`}>{parseHTML(body)}</Link></p>
                <div className="flex flex-row gap-4 items-center text-sm">
                    <button className="flex gap-2 items-center">
                        <span className="material-symbols-outlined">thumb_up</span>
                        <span>{totalLike}</span>
                    </button>                        
                    <button className="flex gap-2 items-center">
                        <span className="material-symbols-outlined">thumb_down</span>
                        <span>{totalDislike}</span>
                    </button>                        
                    <button className="flex gap-2 items-center">
                        <span className="material-symbols-outlined">comment</span>
                        <span>{totalComments}x</span>
                    </button>                        
                    <p>{formatDate(createdAt)}</p>
                    <p>Dibuat oleh {filterUser[0]?.name}</p>
                </div>
            </div>
        </>
    )
}

Thread.propTypes = {
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    totalComments: PropTypes.number.isRequired,
    totalLike: PropTypes.number.isRequired,
    totalDislike: PropTypes.number.isRequired,
    ownerId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default Thread;