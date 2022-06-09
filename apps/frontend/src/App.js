import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Button from "common/src/components/Button";
import { axiosReq, getById } from "common/src/utils";

export default function App() {
  // const getData = () => {
  //   axios
  //     .get("https://jsonplaceholder.typicode.com/todos/1")
  //     .then(function (response) {
  //       console.log(response);
  //     });
  // };
  return (
    <Router>
      <Button />
      <p className="my-12" id="x">
        tailwind
      </p>
      <p
        onClick={() => {
          let x = getById("x");
          console.log(`--- x ----> `, x);
          axiosReq.post("testApi");
          let api = localStorage.getItem("api");
          console.log(`--- api ----> `, api);
        }}
      >
        get element
      </p>
      {/*<Button onClick={getData} />*/}
      frontend app
    </Router>
  );
}
