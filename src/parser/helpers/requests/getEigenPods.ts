import gqlRequest from './gqlRequest'
import { SupportedNetworks } from '../../types'


type EigenPods = { address: string }[]

const getEigenPods = async (vaultId: string, network: SupportedNetworks) => {
  const query = `query EigenPods($vaultId: ID!) { eigenPods(where: { vault: $vaultId }) { address }}`
  const variables = { vaultId: vaultId.toLowerCase() }

  try {
    const data = await gqlRequest({ query, variables }, network)

    return data?.eigenPods as EigenPods
  }
  catch (error) {
    console.error('Error fetching EigenPods:', error)
  }
}


export default getEigenPods
