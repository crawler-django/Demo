window.onload = () => {
	let dragingNode = null
	let dragNodes = document.getElementsByClassName('draglist')

	let startX = null
	let enterX = null

	for(let i = 0; i < dragNodes.length; i++) {
		dragNodes[i].ondragstart = (e) => {
			dragingNode = e.target
			startX = e.x
			// console.log(e)
		}
		dragNodes[i].ondragenter = (e) => {
			// console.log(e)
			enterX = e.x
			if (dragingNode != e.target) {
				if (enterX >= startX) {
					e.target.parentNode.insertBefore(dragingNode, e.target.nextSibling)
				} else {
					e.target.parentNode.insertBefore(dragingNode, e.target)
				}
			}
			
		}
		dragNodes[i].ondragleave = (e) => {
			startX = e.x
			// if (dragingNode != e.target) {
			// 	if (e.target == e.target.parentNode.lastElementChild || e.target == e.target.parentNode.lastChild) {
			// 		e.target.parentNode.appendChild(dragingNode)
			// 	}
			// }
		}
	}

	document.ondragover = (e) => {
		e.preventDefault()
		return false
	}
	document.ondrop = (e) => {
		e.preventDefault()
		return false
	}
}