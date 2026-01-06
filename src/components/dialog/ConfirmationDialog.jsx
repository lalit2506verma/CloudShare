import { AlertTriangle, X } from "lucide-react";

const ConfirmationDialog = ({
  isOpen,
  onClose,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  confirmButtonClass = "bg-red-600 hover:bg-red-700 focus:ring-red-500",
  varient = "danger",
  showIcon = true,
  loading = false,
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      defaultButtonClass: "bg-red-600 hover:bg-red-700 focus:ring-red-500"
    },
    warning: {
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      defaultButtonClass: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500"
    },
    info: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      defaultButtonClass: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
    },
    success: {
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      defaultButtonClass: "bg-green-600 hover:bg-green-700 focus:ring-green-500"
    }
  };

  const currentVariant = variantStyles[varient] || variantStyles.danger;
  const buttonClass = confirmButtonClass || currentVariant.confirmButtonClass;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
  }

  const handleBackdropClick = (e) => {
    console.log("Backdrop Clicked");
    console.log(e.target);
    console.log(e.currentTarget);
    
    if (e.target === e.currentTarget && !loading) {
      onClose();
    }
  }

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm animate-fadeIn"
    >
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 animate-slideUp">
        {/* HEADER */}
        <div className="flex items-start justify-between p-6 pb-4">
          <div className="flex items-start gap-4">
            {showIcon && (
              <div
                className={`${currentVariant.iconBg} rounded-full p-3 shrink-0`}
              >
                <AlertTriangle size={24} className={currentVariant.iconColor} />
              </div>
            )}

            <div>
              <h3 className="text-lg font-semiBold text-gray-900 mb-2">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">{message}</p>
            </div>
          </div>

          {!loading && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors shrink-0">
              <X size={20} />
            </button>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 px-6 pb-6 pt-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className={`flex-1 px-4 py-2.5 text-white rounded-lg transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${buttonClass}`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing...
              </span>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog