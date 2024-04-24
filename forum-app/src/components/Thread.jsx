function Thread() {
    return (
        <>
            <div className="flex flex-col gap-4">
                <p>kategori</p>
                <h1>judul</h1>
                <p>keterangan</p>
                <div className="flex flex-row gap-2">
                    <button>Like</button>
                    <button>Dislike</button>
                    <p>Dislike</p>
                    <p>331 Hari lalu</p>
                    <p>Dibuat oleh</p>
                </div>
            </div>
        </>
    )
}

export default Thread;