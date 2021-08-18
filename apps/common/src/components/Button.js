import axios from "axios";

export default function Button(props) {
  const getData = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos/1")
      .then(function (response) {
        console.log("data from share: ", response);
      });
  };

  return (
    <button
      onClick={getData}
      {...props}
      className="my-2 bg-info text-white border-0 p-2 rounded shadow-sm"
    >
      click me
    </button>
  );
}
