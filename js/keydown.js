let keyArr = []
document.addEventListener('keydown', function (e) {
  keyArr.push(e.keyCode)
  if (keyArr.includes(16) && keyArr.includes(93) && keyArr.includes(70)) {
    let dom = document.createElement('div')
    dom.id = 'search-chrome'
    dom.innerHTML = '123'
    dom.style.width = 'calc(100vw - 100px)'
    dom.style.height = '30px'
    dom.style.backgroundColor = 'antiquewhite'
    dom.style.position = 'fixed'
    dom.style.top = '0'
    dom.style.transform = 'translate(3%, 0px);'
    document.body.append(dom)
    console.log(dom)
  }
  if (e.keyCode == 27) {
    let parentDom = document.getElementsByTagName('body')
    let dom = document.getElementById('search-chrome')
    parentDom.removeChild(dom)
  }


  if (keyArr.length >= 3) {
    keyArr = []
  }
})
