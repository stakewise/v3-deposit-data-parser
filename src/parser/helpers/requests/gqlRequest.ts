import { urls } from './urls'
import { SupportedNetworks } from '../../types'


type GqlRequestOptions = {
  query: string
  variables?: Record<string, any>
}

const gqlRequest = async (options: GqlRequestOptions, network: SupportedNetworks) => {
  try {
    const response = await fetch(urls[network], {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        query: options.query,
        variables: options.variables,
      }),
    })

    if (response?.status !== 200) {
      throw new Error(`API request failed: ${response?.url}`)
    }

    const result = await response.json()

    if (result?.errors) {
      throw new Error(result.errors[0].message)
    }

    return result?.data
  }
  catch (error) {
    console.error('Error in gqlRequest:', error)
    throw error
  }
}


export default gqlRequest
