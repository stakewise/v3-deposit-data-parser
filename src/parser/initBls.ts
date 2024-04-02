const initBls = async () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const bls = require('bls-eth-wasm/browser')

  console.log('bls ----', bls)

  await bls.init(bls.BLS12_381)

  return bls
}


export default initBls
