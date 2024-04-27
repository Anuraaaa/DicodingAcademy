import { Link } from "react-router-dom";

function Thread() {
    return (
        <>
            <div className="flex flex-col gap-4 border-b-1 border-b-gray-200 p-4 shadow-lg">
                <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                    <p>kategori</p>
                </div>
                <h1 className="font-bold text-xl"><Link to={"/single-thread"}>judul</Link></h1>
                <p className="text-md"><Link to={"/single-thread"}>keterangan</Link></p>
                <div className="flex flex-row gap-4 items-center text-sm">
                    <button className="flex gap-2 items-center">
                        <span className="material-symbols-outlined">thumb_up</span>
                        <span>100</span>
                    </button>                        
                    <button className="flex gap-2 items-center">
                        <span className="material-symbols-outlined">thumb_down</span>
                        <span>56</span>
                    </button>                        
                    <button className="flex gap-2 items-center">
                        <span className="material-symbols-outlined">reply</span>
                        <span>8x</span>
                    </button>                        
                    <p>331 Hari lalu</p>
                    <p>Dibuat oleh</p>
                </div>
            </div>
        </>
    )
}

export default Thread;