let clickCount = 0

document.querySelector("#button")?.addEventListener('click', () => {
    clickCount += 1
    document.querySelector("#klikk")!.innerHTML = clickCount.toString()
    fetch(`${host}/count`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count: clickCount })
    })
})
const host = import.meta.env.VITE_SERVER_HOST

fetch(`${host}/count`).then(async res => {
    const json = await res.json()
    clickCount = json.count
    document.querySelector("#klikk")!.innerHTML = json.count.toString()
})
