import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";
import Button from "common/src/components/Button";
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
      {/*<Button onClick={getData} />*/}
      frontend app
    </Router>
  );
}
