let step1 = document.getElementById("step1");
let step2 = document.getElementById("step2");
let step3 = document.getElementById("step3");
let step4 = document.getElementById("step4");

let textProgress = document.getElementById("textProgress");
let imgIlustration = document.getElementById('ilustration');

// fungsi jika step selesai
function stepDone1 () {
    step1.classList.add('done')
    step1.classList.remove('active')
    step2.classList.add('active')

    textProgress.textContent = "Driver lagi tancap gas, kayak kamu ngejar cinta yang gak pasti.";
    imgIlustration.src = "../assets/anims/chill-guy-walk.gif"
}
function stepDone2 () {
    step2.classList.add('done')
    step2.classList.remove('active')
    step3.classList.add('active')
    
    textProgress.textContent = "Makanan udah nyampe, tinggal buktiin cinta lewat suapan pertama.";
    imgIlustration.src = "../assets/anims/gps.gif"
}
function stepDone3 () {
    step3.classList.add('done')
    step3.classList.remove('active')
    step4.classList.add('active')
    
    textProgress.textContent = "Perut kenyang, hati senang—bisa move on dari mie instan!";
    imgIlustration.src = "../assets/anims/heart.gif"
}
function stepDone4 () {
    step4.classList.add('done')
    step4.classList.remove('active')
}

// delay 5 detik per step
setTimeout(stepDone1, 5000);
setTimeout(stepDone2, 10000);
setTimeout(stepDone3, 15000);
setTimeout(stepDone4, 20000);