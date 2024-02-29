const initBls = async () => {
  const bls = require('bls-eth-wasm/browser')

  await bls.init(bls.BLS12_381)

  return bls
}


export default initBls
