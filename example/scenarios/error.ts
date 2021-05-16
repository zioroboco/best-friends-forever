import { sandbox } from "fetch-mock"

export default () =>
  sandbox().post("https://httpbin.org/anything", {
    status: 500,
    json: { error: "Noise! Mess! Chaos!" },
  })
