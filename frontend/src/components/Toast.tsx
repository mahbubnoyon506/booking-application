import { useEffect } from "react";

export type ToastProps = {
  message: string;
  type: "SUCCESS" | "ERROR";
  onClose?: () => void;
};

const Toast = ({ message, type, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  const styles =
    type === "SUCCESS"
      ? "fixed top-4 right-4 z-50 p-5 rounded-md bg-green-600 text-white mx-w-md"
      : "fixed top-4 right-4 z-50 p-5 rounded-md bg-red-500 text-white mx-w-md";
  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold"> {message}</span>
      </div>
    </div>
  );
};
export default Toast;
