let canvas = document.querySelector('canvas'); // wählt nur das erste Element des Dokuments aus, das dem Wert 'canvas' entspricht. Wird dann in der Variable gespeichert. 
// jetzt greifen wir über die Variable canvas immer darauf zu. 
// genauso gut könnten wir es über den Namen der ID setzen. mit .getElementById('canvas')

canvas.style.backgroundColor = "#302c2c";

// NEUE VARIABLE
let ctx = canvas.getContext('2d');

// Wir selektieren den Start- und Restart-Button
let startBtn = document.querySelector('#start');
let restartBtn = document.querySelector('#restart');
let gameOver = false; 
let intervallId = null; // ???? 
let score = 0; 
let level = 1; 
// Ball-Variablen:
let ballX = 100, ballY = 50, ballRadius = 20, speedX = 8, speedY = 6; 
// Brett-Variablen
let brettPositionX = 100, brettHeight = 15, brettWidth = 200, brettSpeed = 10;
// Keydown-Variablen
let isLeft = false, isRight = false; 

// Ball zeichnen: 
function createBall() {
    ctx.beginPath();
    ctx.fillStyle = 'yellow';
    ctx.arc(ballX, ballY, ballRadius, 0, 2*Math.PI);
    ctx.fill();
    ctx.closePath();
}

function drawBrett() {
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(brettPositionX, canvas.height - brettHeight, brettWidth, brettHeight);
    ctx.closePath();
}


// Neue Funktion - wir zeichnen den Ball immer wieder mit neuen x und y Koordinaten 
function animate() {

    
    // Bevor der Ball gezeichnet wird, löschen wir unser Canvas, damit es keine Linie wird
    ctx.clearRect(0,0,canvas.width, canvas.height); 

    // Score
    ctx.font = "24px Courier New";
    ctx.fillText("Score: " + score + ", Level: " + level, 30, 30);
    

    drawBrett();
    // Jetzt zeichnen wir Ball und unser Brett --> in eigener Funktion
    createBall(); 
    if (!gameOver) {
        ballX = ballX + speedX;
        ballY = ballY + speedY;
    }

    // Ende zeichnen 

    if (isRight && brettPositionX + brettWidth < canvas.width) {
        brettPositionX = brettPositionX + brettSpeed;
    }
    if (isLeft && brettPositionX > 0) {
        brettPositionX = brettPositionX - brettSpeed;         
    }

    /* 
    if (score % 10 == 0 && score > 0 ) {
        level++; 
        if (speedX > 0) {
            speedX = speedX + 2; 
        }
        if (speedX < 0) {
            speedX = speedX - 2; 
        }
        if (speedY > 0) {
            speedY = speedY + 2; 
        }
        if (speedY < 0) {
            speedY = speedY - 2; 
        }
    }
    */

    // Bitte geh nicht aus dem Canvas raus - außer unten: 
    // rechter Rand
    if (ballX + ballRadius > canvas.width) {
        speedX = -speedX;
    }
    // linker Rand
    if (ballX - ballRadius < 0) {
        speedX = -speedX;
    }
    // oberer Rand
    if (ballY - ballRadius < 0) {
        speedY = -speedY;
    }
    // unten Brett
    if (ballY + ballRadius > canvas.height) {
        // Test unten Ball Mittelpunkt
        if (ballX >= brettPositionX && ballX <= brettPositionX + brettWidth) {
            score = score + 5; 
            speedY = -speedY;
        }
        else {
            gameOver = true; 
        }
        
    }

    // GameOver
    if(gameOver){
        cancelAnimationFrame(intervallId); 
        canvas.style.display = "none";
        restartBtn.style.display = "block";
    }
    else {
        intervallId = requestAnimationFrame(animate); // wir rufen diese Funktion auf, bis gameOver == true; & Daten die Variable immer wieder up 
    }

}

// Funktion, die mit dem Klick auf den Start-Button aufgerufen wird
function start() {
    console.log("test")
    canvas.style.display = 'block'; // wir zeigen das Canvas wieder an
    restartBtn.style.display = 'none'; // wir blenden den Restart wieder aus
    startBtn.style.display = 'none'; // ebenso den start button 
    animate();
}

// Jetzt kommt: Warte auf ein Event ('load') und dann mach etwas und zwar diese Funktion) 
// in unserem Fall werden das dann wiederum add Events zu den start und restart Buttons sein. 
// window-Object als Event-Target
// methode .addEventListener
// erster Parameter load  - das Objekt selbst
// zweiter Parameter () <-- anonyme Call-Back-Funktion mit Arrow-Schreibweise 
    // kein Funktionsname
    // window.addEventListener('load', function () {....}) <-- nur nicht als Arrow-Schreibweise 
window.addEventListener('load', () => {
    canvas.style.display = 'none'; // wir blenden unser Canvas aus
    restartBtn.style.display = 'none'; // wir blenden unseren Restart Button aus

    // wird später auskommentiert, damit wir nicht immer wieder auf den Button klicken müssen
    //start(); 

    /* Lösung mit Event-Listenern und Veränderung in diesen --> Allerdings sind die langsam und stockend. Daher über Variablen 
    // Key down --> Irgendeine Pfeiltaste wird gedrückt ; außerdem kann man dabei nicht gedrückt halten 
    document.addEventListener("keydown", (event) => {
        if (event.code == 'ArrowRight') {
            console.log(event);
            brettPositionX = brettPositionX + 30; 
        }
        if (event.code == 'ArrowLeft') {
            console.log(event);
            brettPositionX = brettPositionX - 30; 
        }

    })
    */ 

    // Lösung innerhalb der animate-Funktion 
    document.addEventListener("keydown", (event) => {
        if (event.code == "ArrowRight") {
            isRight = true; 
            isLeft = false; 
        }
        if (event.code == "ArrowLeft") {
            isLeft = true; 
            isRight = false; 
        }

    })
    document.addEventListener("keyup", () => {
        isRight = false;
        isLeft = false; 
    } )

    startBtn.addEventListener( 'click', () => {
        start(); // hier soll jetzt unser Spiel beginnen: Also wir blenden unser Canvas wieder ein --> springe hoch
    })

    if (gameOver) {
        alert("Looser!");
    }

    restartBtn.addEventListener('click', () => {
        gameOver = false;
        speedY = 5; 
        speedX = 5; 
        ballX = 50; 
        ballY = 40; 
        level = 0; 
        score = 0; 
        start();
        
    })
})


/*
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
