import gqlRequest from './gqlRequest'
import { SupportedNetworks } from '../../types'


const checkIsRestakeVault = async (vaultId: string, network: SupportedNetworks) => {
  const query = `query Vault($vaultId: ID!) { vault(id: $vaultId) { isRestake }}`
  const variables = { vaultId: vaultId.toLowerCase() }

  try {
    const data = await gqlRequest({ query, variables }, network)

    return data?.vault?.isRestake
  }
  catch (error) {
    console.error('Error fetching isRestake:', error)
  }
}


export default checkIsRestakeVault
