const mineflayer = require('mineflayer')
function sleep(ms){return new Promise(r=>setTimeout(r,ms))}
async function start(){
  while(true){
    const username='Fake_'+Math.floor(Math.random()*99999)
    const bot=mineflayer.createBot({
      host:'teknopat.aternos.me', // sunucu IP'si buraya
      port:25565,
      username:username
    })
    bot.once('spawn',async()=>{
      console.log(username+' girdi')
      for(let i=0;i<10;i++){
        bot.setControlState('forward',true)
        await sleep(400)
      }
      bot.setControlState('forward',false)
      await sleep(1500)
      bot.quit()
      console.log(username+' çıktı')
    })
    await sleep(60000) // 1dk
  }
}
start()
