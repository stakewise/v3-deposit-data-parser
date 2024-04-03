import bls from 'bls-eth-wasm'


const initBls = async () => {
  await bls.init(bls.BLS12_381)

  return bls
}


export default initBls
