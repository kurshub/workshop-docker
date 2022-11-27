let clickCount = 0

document.querySelector("#button")?.addEventListener('click', () => {
    clickCount += 1
    document.querySelector("#klikk")!.innerHTML = clickCount.toString()
})
