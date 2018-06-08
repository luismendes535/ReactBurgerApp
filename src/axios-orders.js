import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-my-burguer-68df2.firebaseio.com"
});

export default instance;
