const draggable = document.querySelector('.draggable');
const droppables = document.querySelectorAll('.droppable');

draggable.addEventListener('dragstart', dragStart);
draggable.addEventListener('dragend', dragEnd);

// 移动端

let arr = [];
let oldIndex = 0;
let newIndex = 0;
for(const droppable of droppables) {
    let x = droppable.offsetLeft + 80;
    let y = droppable.offsetTop + 80;
    arr.push({x,y});
    console.log(droppable.offsetTop)
}


draggable.ontouchstart = function (e) {
    let mainFg = e.changedTouches[0];
    let y = e.target.offsetTop;
    let x = e.target.offsetLeft;
    let x_fg = mainFg.clientX;
    let y_fg = mainFg.clientY;
    draggable.ontouchmove = function (e) {
        let tempMainFg = e.changedTouches[0];
        let x_tempFg = tempMainFg.clientX;
        let y_tempFg = tempMainFg.clientY;
        let disx = x_tempFg - x_fg;
        let disy = y_tempFg - y_fg;
        e.target.style.position = 'fixed';
        e.target.style.left = x + disx + 'px';
        e.target.style.top = y + disy + 'px';
        e.preventDefault();
        e.stopPropagation();
    }
    draggable.ontouchend = function () {
        let x1 = e.target.offsetLeft + 80;
        let y1 = e.target.offsetTop + 80;
        let flag = false;
        arr.forEach((value, index, arr) => {
            try {
                let num = Math.sqrt(Math.pow(x1 - value.x, 2) + Math.pow(y1 - value.y, 2));
                if (num <= 85) {
                    newIndex = index;
                    draggable.style.left = 8 + droppables[newIndex].offsetLeft + 'px';
                    draggable.style.top = 8 + droppables[newIndex].offsetTop + 'px';
                    throw new Error('exit');
                }
            } catch (e) {
                console.log('done');
                flag = true;
                oldIndex = newIndex;
            }
        });

        if (!flag) {
            draggable.style.left = 8 + droppables[oldIndex].offsetLeft + 'px';
            draggable.style.top = 8 + droppables[oldIndex].offsetTop + 'px';
        }

    }
}



// pc端
function dragStart () {
    this.className += ' dragging';
    setTimeout(() => {
        this.className = 'invisible';
    }, 0);
}

function dragEnd () {
    this.className = 'draggable';
}

for (const droppable of droppables) {
    droppable.addEventListener('dragover', dragOver);
    droppable.addEventListener('dragleave', dragLeave);
    droppable.addEventListener('dragenter', dragEnter);
    droppable.addEventListener('drop', dragDrop);
}

function dragOver (e) {
    e.preventDefault();
}

function dragLeave (e) {
    this.className = 'droppable';
}

function dragEnter (e) {
    e.preventDefault();
    this.className += ' drag-over';
}

function dragDrop (e) {
    this.className = 'droppable';
    this.append(draggable);
    e.preventDefault();
}
