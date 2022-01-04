/** Connect to Moralis server */
const serverUrl = 'https://ysailnwnktmy.usemoralis.com:2053/server'
const appId = 'yRkqwTTNmsNJLBtnUBS04OluQCbp4N0Xu7jv81m4'
Moralis.start({ serverUrl, appId })

/** Add from here down */
async function login() {
  let user = Moralis.User.current()
  // set the value of user as this to check if user is defined
  if (!user) {
    try {
      user = await Moralis.authenticate({ signingMessage: 'Hello World!' })
      console.log(user)
      console.log(user.get('ethAddress'))
      alert("You're logged in")
      document.getElementById('btn-login').style.display = 'none'
      document.getElementById('game').style.display = 'block'
    } catch (error) {
      console.log(error)
    }
  }
}

async function logOut() {
  await Moralis.User.logOut()
  console.log('logged out')
}

async function flip(side) {
  let amount = document.getElementById('amount').value
  alert(side + ' ' + amount)
  window.web3 = await Moralis.enableWeb3()
  let contractInstance = new web3.eth.Contract(
    window.abi,
    '0xE841CA621e8f244A02C7833Bce440bd5Dc186662'
  )
  contractInstance.methods
    .flip(side === 'heads' ? 0 : 1)
    .send({
      value: amount,
      from: ethereum.selectedAddress,
    })
    .on('receipt', function (receipt) {
      console.log(receipt)
      if (receipt.events.bet.returnValues.win) {
        alert('you win')
      } else {
        alert('your lost')
      }
    })
}

document.getElementById('btn-login').onclick = login
document.getElementById('btn-logout').onclick = logOut
document.getElementById('heads_button').onclick = function () {
  flip('heads')
}
document.getElementById('tails_button').onclick = function () {
  flip('tails')
}

/** Useful Resources  */

// https://docs.moralis.io/moralis-server/users/crypto-login
// https://docs.moralis.io/moralis-server/getting-started/quick-start#user
// https://docs.moralis.io/moralis-server/users/crypto-login#metamask

/** Moralis Forum */

// https://forum.moralis.io/
