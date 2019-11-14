const total = 10000
let arr = []
for (let i = 0; i < total; i++) {
	arr.push(~~(i) + ' The furthest distance in the world \
	Is not between life and death \
	But when I stand in front of you \
	Yet you don"t know that I love you \
	世界上最遥远的距离 \
	不是  生与死 \
	而是  我就站在你面前  你却不知道我爱你 \
	The furthest distance in the world \
	Is not when I stand in front of you \
	Yet you can"t see my love \
	But when undoubtedly knowing the love from both \
	Yet cannot be together'.slice(0, 200 * Math.random()))
}

let start = 0
let end = 19
let ul = document.getElementById('container')
let ulWrap = document.getElementById('div')
let scrollTop = ulWrap.scrollTop
let io = new IntersectionObserver((entires) => {
	if (entires.length !== (end-start+1)) {
		// console.log(entires, entires[0].target.dataset.index)
		// console.log(scrollTop, ulWrap.scrollTop, end)
		// console.log(entires[0].target.dataset.index)
		entires.forEach((entire) => {
			if ((Number(entire.target.dataset.index) >= (start+end) / 2 + 1) && (entire.isIntersecting) && scrollTop < ulWrap.scrollTop) {
				if (end < 10000) {
					start += 1
					end += 1
					let li = document.createElement('li')
					li.innerHTML = arr[end]
					li.setAttribute("data-index", end)
					li.setAttribute("style", "height: 150px; overflow: hidden;")
					io.observe(li)
					let top = ul.style.paddingTop ? Number(ul.style.paddingTop.split('px')[0]) : 0
					ul.setAttribute("style", `padding-top: ${top + 150}px`)
					ul.appendChild(li)
					ul.removeChild(ul.firstChild)
					scrollTop = ulWrap.scrollTop
				} else {
					console.log("到底了")
				}
			} else if ((Number(entire.target.dataset.index) < (start+end) / 2 - 1) && (entire.isIntersecting) && scrollTop > ulWrap.scrollTop) {
				if (start > 0) {
					start -= 1
					end -= 1
					let li = document.createElement('li')
					li.innerHTML = arr[start]
					li.setAttribute("data-index", start)
					li.setAttribute("style", "height: 150px; overflow: hidden;")
					io.observe(li)
					let top = ul.style.paddingTop ? Number(ul.style.paddingTop.split('px')[0]) : 0
					ul.setAttribute("style", `padding-top: ${top - 150}px`)
					ul.removeChild(ul.lastChild)
					ul.insertBefore(li, ul.firstChild)
					scrollTop = ulWrap.scrollTop
				} else {
					console.log("到顶了")
				}
			}
		})
	}
}, [1])

document.getElementById("button").addEventListener('click', () => {
	for (let i = 0; i <= 19; i++) {
		let li = document.createElement("li")
		li.innerHTML = arr[i]
		li.setAttribute("data-index", i)
		li.setAttribute("style", "height: 150px; overflow: hidden;")
		io.observe(li)
		ul.appendChild(li)
	}
})