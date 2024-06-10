export default function Card({
  title, value, progress
}: {
  title: string,
  value: string,
  progress?: number
}){
  return (
    <>
      <div>
        <p>{title}</p>
        <h1>{value}</h1>
        {progress && <p>{progress.toFixed(2)}</p>}
      </div>
    </>
  )
}