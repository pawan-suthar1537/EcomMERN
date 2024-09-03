import http from "k6/http";
import { sleep } from "k6";

export const options = {
  vus: 100,
  duration: "30s",

  cloud: {
    // Project: Default project
    projectID: 3712278,
    // Test runs with the same name groups test runs together.
    name: "Testrtert",
  },
};

export default function () {
  http.get("http://localhost:3000/api/shop/get");
  sleep(1);
}
