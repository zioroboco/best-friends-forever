import fm from "fetch-mock"

export default (sandbox = fm.sandbox()) =>
  sandbox.post("https://httpbin.org/anything", {
    status: 500,
    json: { error: "Noise! Mess! Chaos!" },
  })
