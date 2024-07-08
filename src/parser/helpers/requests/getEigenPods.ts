import { urls } from './urls'
import { SupportedNetworks } from '../../types'


type EigenPods = { address: string }[]

const getEigenPods = async (vaultId: string, network: SupportedNetworks)=> {
  try {
    const response = await fetch(urls[network], {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: `query EigenPods($vaultId: ID!) { eigenPods(where: { vault: $vaultId }) { address }}`,
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

    return result?.data?.eigenPods as EigenPods
  }
  catch (error) {
    console.error('Error fetching EigenPods:', error)
  }
}


export default getEigenPods
