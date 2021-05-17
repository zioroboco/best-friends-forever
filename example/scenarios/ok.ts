import fm from "fetch-mock"

export default (sandbox = fm.sandbox()) =>
  sandbox.post("https://httpbin.org/anything", {
    status: 200,
    json: { name: "scenario" },
  })
