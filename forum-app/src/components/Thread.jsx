function Thread() {
    return (
        <>
            <div className="flex flex-col gap-4 border-b-1 border-b-gray-200 p-4 shadow-lg">
                <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                    <p>kategori</p>
                </div>
                <h1 className="font-bold text-xl">judul</h1>
                <p className="text-md">keterangan</p>
                <div className="flex flex-row gap-2 text-sm">
                    <button>Like</button>
                    <button>Dislike</button>
                    <p>Share 1x</p>
                    <p>331 Hari lalu</p>
                    <p>Dibuat oleh</p>
                </div>
            </div>
        </>
    )
}

export default Thread;