// Backwards-compatible shim — old imports keep working, now powered by the
// lightweight custom toast (no react-toastify).
export { modernToast, ModernToastContainer, ToastProvider, ToastBridge } from "./ui/toast";
export { modernToast as default } from "./ui/toast";
