import { createStore } from "solid-js/store";
const initialState = {
  title: "",
  message: "",
  type: "info", // 'success', 'error', 'warning', 'info'
  show: false,
};

const [state, setState] = createStore(structuredClone(initialState));

const toastActions = {
  showToast({ title, message, type = "info", duration = 3000 }) {
    setState({
      title,
      message,
      type,
      show: true,
    });
    setTimeout(() => {
      this.hideToast();
    }, duration);
  },
  hideToast() {
    setState("show", false);
  },
  resetToast() {
    setState(structuredClone(initialState));
  },
};
const toastTitle = () => state.title;
const toastMessage = () => state.message;
const toastType = () => state.type;
const toastShow = () => state.show;

const notify = toastActions.showToast.bind(toastActions);
const hideNotify = toastActions.hideToast.bind(toastActions);

export { toastTitle, toastMessage, toastType, toastShow, notify, hideNotify };
