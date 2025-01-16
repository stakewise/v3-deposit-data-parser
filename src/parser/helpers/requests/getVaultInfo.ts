import gqlRequest from './gqlRequest'
import { SupportedNetworks } from '../../types'


const getVaultInfo = async (vaultId: string, network: SupportedNetworks) => {
  const query = `query Vault($vaultId: ID!) { vault(id: $vaultId) { depositDataRoot }}`

  const variables = { vaultId: vaultId.toLowerCase() }

  try {
    const data = await gqlRequest({ query, variables }, network)

    return data?.vault
  }
  catch (error) {
    console.error('Error fetching Vault info:', error)
  }
}


export default getVaultInfo
