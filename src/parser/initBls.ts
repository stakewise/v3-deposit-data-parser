const initBls = async () => {
  const bls = await import('bls-eth-wasm')

  await bls.init(bls.BLS12_381)

  return bls
}


export default initBls
