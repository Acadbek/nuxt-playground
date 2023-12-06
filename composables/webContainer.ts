import { WebContainer } from '@webcontainer/api'

let _webcontainerInstance: WebContainer = await WebContainer.boot()

export async function useWebContainer() {
  if (!_webcontainerInstance)
    _webcontainerInstance = await WebContainer.boot()
  return _webcontainerInstance
}
