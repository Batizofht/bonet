import { toast, ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Modern toast configuration
export const toastConfig = {
  position: 'top-right' as ToastPosition,
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  closeButton: false,
};

// Custom toast styles
const toastStyles = {
  success: {
    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
  },
  error: {
    background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(239, 68, 68, 0.4)',
  },
  warning: {
    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.4)',
  },
  info: {
    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
    borderRadius: '12px',
    boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)',
  },
};

// Icon components for each toast type
const icons = {
  success: <CheckCircle className="w-5 h-5 text-white flex-shrink-0" />,
  error: <XCircle className="w-5 h-5 text-white flex-shrink-0" />,
  warning: <AlertCircle className="w-5 h-5 text-white flex-shrink-0" />,
  info: <Info className="w-5 h-5 text-white flex-shrink-0" />,
};

// Modern toast functions
export const modernToast = {
  success: (message: string) => {
    return toast(
      <div className="flex items-center gap-3">
        {icons.success}
        <span className="text-white text-sm font-medium">{message}</span>
      </div>,
      {
        ...toastConfig,
        style: toastStyles.success,
        containerId: 'modern-toast-container',
      }
    );
  },
  error: (message: string) => {
    return toast(
      <div className="flex items-center gap-3">
        {icons.error}
        <span className="text-white text-sm font-medium">{message}</span>
      </div>,
      {
        ...toastConfig,
        style: toastStyles.error,
        containerId: 'modern-toast-container',
      }
    );
  },
  warning: (message: string) => {
    return toast(
      <div className="flex items-center gap-3">
        {icons.warning}
        <span className="text-white text-sm font-medium">{message}</span>
      </div>,
      {
        ...toastConfig,
        style: toastStyles.warning,
        containerId: 'modern-toast-container',
      }
    );
  },
  info: (message: string) => {
    return toast(
      <div className="flex items-center gap-3">
        {icons.info}
        <span className="text-white text-sm font-medium">{message}</span>
      </div>,
      {
        ...toastConfig,
        style: toastStyles.info,
        containerId: 'modern-toast-container',
      }
    );
  },
};

// Modern ToastContainer component
export const ModernToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      closeButton={false}
      containerId="modern-toast-container"
      style={{
        zIndex: 99999,
        position: 'fixed',
        top: 0,
        right: 0,
      }}
      toastStyle={{
        padding: '16px',
        marginTop: '80px',
        minHeight: 'auto',
      }}
    />
  );
};

export default modernToast;
