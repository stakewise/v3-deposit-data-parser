import { urls } from './urls'
import { SupportedNetworks } from '../../types'


const checkIsRestakeVault = async (vaultId: string, network: SupportedNetworks) => {
  try {
    const response = await fetch(urls[network], {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `query Vault($vaultId: ID!) { vault(id: $vaultId) { isRestake }}`,
        variables: {
          vaultId: vaultId.toLowerCase(),
        },
      }),
    })

    if (response?.status !== 200) {
      throw new Error(`API request failed: ${response?.url}`)
    }

    const result = await response.json()

    if (result?.errors) {
      throw new Error(result.errors[0].message)
    }

    return result?.data?.vault?.isRestake
  }
  catch (error) {
    console.error('Error fetching isRestake:', error)
  }
}


export default checkIsRestakeVault
