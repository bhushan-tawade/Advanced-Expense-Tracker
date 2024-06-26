export function LatestTransaction({ where, amount }) {
  return (
    <div className="latestTransaction flex justify-around rounded-md bg-red-500 h-10 items-center mt-5">
      <h1>{where}</h1>
      <h1>-</h1>
      <h1>{amount}Rs.</h1>
    </div>
  );
}
