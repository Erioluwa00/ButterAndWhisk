import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { CheckCircle, AlertTriangle, Info, XCircle, X } from 'lucide-react';
import '../styles/components/toast.css';

export const Toast = () => {
  const { toast } = useContext(AppContext);

  if (!toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle className="toast-icon" color="var(--color-olive)" size={20} />;
      case 'error':
        return <XCircle className="toast-icon" color="var(--color-terracotta)" size={20} />;
      case 'warning':
        return <AlertTriangle className="toast-icon" color="var(--color-butter)" size={20} />;
      case 'info':
      default:
        return <Info className="toast-icon" color="var(--color-cocoa)" size={20} />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast-item toast-show toast-${toast.type}`}>
        <div className="toast-icon-wrapper">
          {getIcon()}
        </div>
        <div className="toast-content">
          {toast.message}
        </div>
      </div>
    </div>
  );
};
