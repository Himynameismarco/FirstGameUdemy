let canvas = document.querySelector('canvas') // wählt nur das erste Element des Dokuments aus, das dem Wert 'canvas' entspricht. Wird dann in der Variable gespeichert. 
// jetzt greifen wir über die Variable canvas immer darauf zu. 
// genauso gut könnten wir es über den Namen der ID setzen. mit .getElementById('canvas')

canvas.style.backgroundColor = "#47494d"

/*
// NEUE VARIABLE

let ctx = canvas.getContext('2d')

// VIERECKE

ctx.fillStyle = "red"
ctx.fillRect(50,60,70,200)

//ctx.clearRect(0,0, canvas.width, canvas.height)

ctx.beginPath()
ctx.strokeStyle = "blue"
ctx.strokeRect(50,60,100,500)
ctx.closePath()

// LINIEN

ctx.beginPath() // .stroke()  wirkt rückwirkend auf alle Linien - 
ctx.strokeStyle = "yellow"
// ctx.moveTo(300,300)
// ctx.lineTo(200,450)
// ctx.stroke() // zieht sich die letzte Farbe
ctx.closePath()

ctx.clearRect(0,0, canvas.width, canvas.height)

ctx.beginPath()
ctx.arc(200, 200, 100, 0, Math.PI)
ctx.stroke()
ctx.closePath()


// BILDER

let img = document.createElement('img')
img.src = "IMG_0161.jpg"

*/

//Browser wartet bis die genannten Ressourcen zur Verfügung stehen und dann wird es erst auf das Canvas gezeichnet 
/*
img.addEventListener('load', () => {

    ctx.drawImage(img, 0,0)


})
*/

/*
// TEXT
ctx.beginPath()
ctx.font = "30px Verdana"
ctx.fillText('Hello World!', 100, 100)
ctx.closePath()


// SMILEY

ctx.beginPath()
ctx.arc(200, 200, 100, 0, Math.PI)
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.arc(200, 200, 130, 0, 2*Math.PI)
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.arc(140, 135,15, 0, 2*Math.PI)
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.arc(230, 135,15, 0, 2*Math.PI)
ctx.stroke()
ctx.closePath()

ctx.beginPath()
ctx.strokeStyle = "red"
ctx.arc(170, 185,5, 0, 2*Math.PI)
ctx.stroke()
ctx.closePath()
*/
