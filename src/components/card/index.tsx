export default function Card({
  title, value, progress
}: {
  title: string,
  value: string,
  progress?: number
}){
  return (
    <>
      <div className="flex flex-col mt-6 text-gray-700 justify-between bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] bg-clip-border rounded-xl w-64 min-h-32 p-4 m-4 transition-all duration-300">
        <p className="text-sm text-gray-500">{title}</p>
        <h1 className="text-2xl text-center font-bold text-gray-800">{value}</h1>
        {progress && <p className="text-sm text-right text-gray-500">{(progress * 100).toFixed(0)}%</p>}
        {!progress && <p className="text-sm text-right text-white">empty</p>}
      </div>
    </>
  )
}