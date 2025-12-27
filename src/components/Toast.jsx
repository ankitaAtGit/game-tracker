import {
  hideNotify,
  toastMessage,
  toastShow,
  toastTitle,
  toastType,
} from "../stores/toast.store";

const toastIconsByType = {
  success: "✓",
  error: "✕",
  warning: "!",
  info: "i",
};

const Toast = () => {
  return (
    <div class={`toast ${toastShow() ? "" : "hiding"} toast-${toastType()}`}>
      <div class="toast-icon">{toastIconsByType[toastType()]}</div>
      <div class="toast-content">
        <div class="toast-title">{toastTitle()}</div>
        <div class="toast-message">{toastMessage()}</div>
      </div>
      <button onClick={hideNotify} class="toast-close">
        ×
      </button>
    </div>
  );
};

export default Toast;

//common functionality for toast notifications that can be used across the app
