import { App } from 'antd';

export const useToast = () => {
  const { message } = App.useApp();
  const displayMessage = (content, state = 'info') => {
    message[state](content)
  }

  return { displayMessage }
}
