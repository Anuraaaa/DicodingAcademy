function HeaderThread() {
    return(
        <div className="flex flex-col p-4 gap-4">
            <h1>Kategori Populer</h1>
            <div className="flex gap-4">
                <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                    <p>kategori</p>
                </div>
                <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                    <p>kategori</p>
                </div>
                <div className="border border-dashed border-gray-500 rounded w-[10%] text-center text-sm">
                    <p>kategori</p>
                </div>
            </div>
            <h1 className="font-bold text-xl">Diskusi Tersedia</h1>
        </div>
    )
}

export default HeaderThread;