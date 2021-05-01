import "@zioroboco/bff/types"

const node = document.querySelector("#output")

if (node) {
  fetch(`${BFF_PREFIX}/hello`).then(response => {
    response.json().then(data => {
      node.textContent = JSON.stringify(data)
    })
  })
}
