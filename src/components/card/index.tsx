export default function Card({
  title, value, progress
}: {
  title: string,
  value: string,
  progress?: number
}){
  return (
    <>
      <div className="bg-white shadow-md rounded-lg p-4 w-64">
        <p className="text-sm text-gray-500">{title}</p>
        <h1 className="text-2xl font-bold text-gray-800">{value}</h1>
        {progress && <p className="text-sm text-gray-500">{progress.toFixed(2)}</p>}
      </div>
    </>
  )
}