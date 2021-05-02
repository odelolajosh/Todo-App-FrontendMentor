
let current; // The current drag item

function dragSortableList (targetSelector, itemsSelector, callback) {
  let target = document.querySelector(targetSelector)
  target.classList.add('drag-sort-list-target')

  // make items draggable
  var items = target.querySelectorAll(itemsSelector)
  for (let item of items) {
    item.draggable = true
    item.addEventListener('dragstart', function () {
      current = this
      for (let i of items)
        if (i != current) i.classList.add('drag-hint')
    })

    item.addEventListener('dragenter', function () {
      if (this != current)
        this.classList.add('drag-active')
    })

    item.addEventListener('dragleave', function () {
      if (this != current)
        this.classList.remove('drag-active')
    })

    item.addEventListener('dragenter', function () {
      for (let i of items) {
        i.classList.remove('drag-active')
        i.classList.remove('drag-hint')
      }
    })

    // Prevnt the broswer default "drop"
    item.addEventListener('dragover', function (event) {
      event.preventDefault()
    })

    item.addEventListener('drop', function (event) {
      event.preventDefault()
      if (this !== current) {
        let currentPos = 0
        let droppedPos = 0

        for (let i = 0; i < item.length; i++) {
          if (current === items[i]) {
            currentPos = i
          }
          if (this === items[i]) {
            droppedPos = i
          }
        }
        if (currentPos < droppedPos) {
          this.parentNode.insertBefore(current, this.nextSibling)
        } else {
          this.parentNode.insertBefore(current, this);
        }
      }
    })
  }
}
