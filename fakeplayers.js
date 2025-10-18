const mineflayer = require('mineflayer')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function start() {
  while (true) {
    const username = 'Fake_' + Math.floor(Math.random() * 99999)
    let bot

    try {
      bot = mineflayer.createBot({
        host: 'teknopat.aternos.me', // kendi sunucu IP
        port: 25565,
        username: username,
        version: '1.21.8' // sunucu sürümü
      })
    } catch (err) {
      console.log('Bot başlatılamadı, 10sn sonra tekrar denenecek...')
      await sleep(10000)
      continue
    }

    bot.once('spawn', async () => {
      console.log(username + ' oyuna girdi.')
      for (let i = 0; i < 10; i++) {
        bot.setControlState('forward', true)
        await sleep(400)
      }
      bot.setControlState('forward', false)
      await sleep(1500)
      bot.quit()
      console.log(username + ' oyundan çıktı.')
    })

    bot.on('end', async () => {
      console.log(username + ' bağlantı kesildi, 10sn sonra tekrar denenecek...')
      await sleep(10000)
    })

    bot.on('error', async (err) => {
      console.log(username + ' hata verdi:', err.message)
      bot.quit()
      await sleep(10000)
    })

    // 1dk bekle, sonra yeni bot oluşturulsun
    await sleep(60000)
  }
}

start()
