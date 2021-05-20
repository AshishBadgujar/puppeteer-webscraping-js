const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage();
    await page.goto('https://finshots.in/markets/why-is-tata-elxsi-most-expensive-it-stocks/')
    const title = await page.title();
    const url = await page.url();
    console.log(title, url);
    await page.waitForSelector('.post-content')
    const text=await page.$eval('.post-content',div=>div.textContent)
    const synth=await window.speechSynthesis;
    let voices=[];
    const speak=(text)=>{
        const toSpeak=new SpeechSynthesisUtterance(text)
        voices=synth.getVoices();
        toSpeak.voice=voices[1];
        toSpeak.onend=e=>{
            console.log("doen...")
        }
        toSpeak.onerror=e=>{
            console.log("Error")
        }
        synth.speak(toSpeak);
    }
    
    speak(text);
    await browser.close();
})();