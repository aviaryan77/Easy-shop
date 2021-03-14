import { Platform } from "react-native";

let baseURL = "";

{
  Platform.OS == "android"
    ? (baseURL = "http://103.88.56.189:3000/api/v1/")
    : (baseURL = "http://localhost:3000/api/v1/");
}

export default baseURL;
