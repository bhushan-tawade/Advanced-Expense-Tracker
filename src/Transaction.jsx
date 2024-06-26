export default function Transaction({ ele, onDelete }) {
  return (
    <>
      <h2>{ele.date}</h2>
      <div className="Transaction p-5 flex justify-around my-2 rounded items-center mr-5">
        <p>{ele.where}</p>
        <p>Via: {ele.paymentMethod}</p>
        <p>{ele.amount} Rs.</p>
        <img
          className="w-5 h-5 hover:cursor-pointer"
          src="./delete.png"
          alt="delete"
          onClick={onDelete}
        />
      </div>
    </>
  );
}
