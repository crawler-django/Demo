window.onload = () => {
	let dustNode = document.getElementsByClassName('dustbin')[0]
	let dragListNodes = document.getElementsByClassName('draglist')
	let dragListLen = dragListNodes.length
	let rubbishBox = document.getElementsByClassName('dragremind')[0]
	let dragingNode = null

	for(let i = 0; i < dragListLen; i++) {
		dragListNodes[i].ondragstart = (e) => {
			console.log(e.dataTransfer)
			e.dataTransfer.effectAllowed = "move"
			e.dataTransfer.setData("text", e.target.innerHTML)
			// e.dataTransfer.setDragImage(e.target, 0, 0)
			dragingNode = e.target
			return true
		}
		dragListNodes[i].ondragend = (e) => {
			e.dataTransfer.clearData("text")
			dragingNode = null
			return false
		}
	}

	dustNode.ondragover = (e) => {
		e.preventDefault()
		return false
	}
	dustNode.ondragenter = (e) => {
		e.target.classList.add('touched')
		return true
	}
	dustNode.ondragleave = (e) => {
		e.target.classList.remove('touched')
		return false
	}
	dustNode.ondrop = (e) => {
		if (dragingNode) {
			rubbishBox.innerHTML += '<strong>"' + dragingNode.innerHTML + '"</strong>被扔进了垃圾箱</br>'
			dragingNode.parentNode.removeChild(dragingNode)
		}
		e.target.classList.remove('touched')
		return false
	}
	
}