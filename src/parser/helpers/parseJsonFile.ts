import type { DepositDataFile } from '../types'


const parseJsonFile =  async (file: File): Promise<DepositDataFile | null> => (
  new Promise((resolve) => {
    const fileReader = new FileReader()

    fileReader.onload = (event) => {
      try {
        if (typeof event?.target?.result === 'string') {
          resolve(JSON.parse(event.target.result))
        }
        else {
          resolve(null)
        }
      }
      catch (error) {
        console.error(error)

        resolve(null)
      }
    }

    fileReader.onerror = () => resolve(null)
    fileReader.readAsText(file)
  })
)


export default parseJsonFile
