import { endpoint } from "@zioroboco/bff"

const node = document.querySelector("#output")

if (node) {
  fetch(endpoint("/hello")).then(response => {
    response.json().then(data => {
      node.textContent = JSON.stringify(data)
    })
  })
}
