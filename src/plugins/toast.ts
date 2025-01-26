import type { App } from 'vue'
import VSnacks from 'vue-snacks'

let snackInstance: any = null

export const initializeToast = (app: App) => {
  snackInstance = app.config.globalProperties.$snack
}

export const useToast = () => {
  const showError = (message: string) => {
    if (snackInstance) {
      snackInstance.notify({
        position: 'top-center',
        type: 'error',
        duration: 3000,
        title: 'Error',
        message,
      })
    }
  }

  return {
    showError,
  }
}
