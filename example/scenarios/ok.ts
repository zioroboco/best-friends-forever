import { sandbox } from "fetch-mock"

export default () =>
  sandbox().post("https://httpbin.org/anything", {
    status: 200,
    json: { name: "scenario" },
  })
