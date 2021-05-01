const node = document.querySelector("#output")

if (node) {
  fetch("/bff/service/version/hello").then(response => {
    response.json().then(data => {
      node.textContent = JSON.stringify(data)
    })
  })
}
