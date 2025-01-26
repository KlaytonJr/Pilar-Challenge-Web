import type { App } from 'vue'
import VSnacks from 'vue-snacks'

let snackInstance: any = null

export const initializeToast = (app: App) => {
  snackInstance = app.config.globalProperties.$snack
}

export const useToast = () => {
  const showSuccess = (message: string) => {
    if (snackInstance) {
      snackInstance.notify({
        position: 'top-center',
        type: 'success',
        duration: 3000,
        title: 'Success',
        message,
      })
    }
  }

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
    showSuccess,
    showError,
  }
}
