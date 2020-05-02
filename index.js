const lightBlue = document.getElementById('lightBlue')
const purple = document.getElementById('purple')
const orange = document.getElementById('orange')
const green = document.getElementById('green')
const btnStart = document.getElementById('btnStart')
const lastLevel = 20

class Game {
  constructor() {
    this.starting = this.starting.bind(this)
    this.starting()
    this.sequenceGenerator()
    setTimeout(() => this.nextLevel(), 700)
  }

  starting() {
    this.chooseColor = this.chooseColor.bind(this)
    this.nextLevel = this.nextLevel.bind(this)
    this.toggleBtnStart()
    this.level = 1
    this.colors = {
      lightBlue,
      purple,
      orange,
      green
    }
  }

  sequenceGenerator() {
    this.sequence = new Array(lastLevel).fill(0).map(n => Math.floor(Math.random()*4))
  }

  nextLevel() {
    this.subLevel = 0
    this.illuminateSequence()
    this.addEventClick()
  }

  transformNumberToColor(number) {
    switch (number) {
      case 0:
        return 'lightBlue'
      case 1:
        return 'purple'
      case 2:
        return 'orange'
      case 3:
        return 'green'
    }
  }

  transformColorToNumber(color) {
    switch (color) {
      case 'lightBlue':
        return 0
      case 'purple':
        return 1
      case 'orange':
        return 2
      case 'green':
        return 3
    }
  }

  illuminateSequence() {
    for (let i = 0; i < this.level; i++) {
      const color = this.transformNumberToColor(this.sequence[i])
      setTimeout(() => this.illuminateColor(color), 1000 * i)
    }
  }

  illuminateColor(color) {
    this.colors[color].classList.add('light')
    setTimeout(() => this.turnOffColor(color), 350)
  }

  turnOffColor(color) {
    this.colors[color].classList.remove('light')
  }

  addEventClick() {
    this.colors.lightBlue.addEventListener('click', this.chooseColor)
    this.colors.purple.addEventListener('click', this.chooseColor)
    this.colors.orange.addEventListener('click', this.chooseColor)
    this.colors.green.addEventListener('click', this.chooseColor)
  }

  deleteEventClick(){
    this.colors.lightBlue.removeEventListener('click', this.chooseColor)
    this.colors.purple.removeEventListener('click', this.chooseColor)
    this.colors.orange.removeEventListener('click', this.chooseColor)
    this.colors.green.removeEventListener('click', this.chooseColor)
  }


  chooseColor(ev) {
    const nameColor = ev.target.dataset.color
    const numberColor = this.transformColorToNumber(nameColor)
    this.illuminateColor(nameColor)
    if (numberColor === this.sequence[this.subLevel]) {
      this.subLevel++
      if (this.subLevel === this.level) {
        this.level++
        this.deleteEventClick()
        if(this.level === (lastLevel + 1)) {
        this.wins()
        } else {
        setTimeout(this.nextLevel, 1500)
        }
      }
      } else {
        this.looser()
      }
  }

  wins() {
    swal('YOU WIN!', 'Your memory it´s amazing bro!', 'success')
    .then(this.starting)
  }

  looser() {
    swal('YOU LOOSE :(', 'Try again!', 'error')
      .then(() => {
        this.deleteEventClick()
        this.starting()
      } )
  }

  toggleBtnStart() {
    if (btnStart.classList.contains('hide')) {
      btnStart.classList.remove('hide')
    } else {
      btnStart.classList.add('hide')
    }
  }
}


function gameStart() {
  window.game = new Game()
}