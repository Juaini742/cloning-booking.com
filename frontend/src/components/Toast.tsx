import {useEffect} from "react";

type ToastProps = {
  message: string;
  type: "SUCESS" | "ERROR";
  onClose: () => void;
};

export const Toast = ({message, type, onClose}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const styles =
    type === "SUCESS"
      ? "fixed top-4 right-4 z-5 p-4 rounded-md bg-green-600 text-white mx-w-md"
      : "fixed top-4 right-4 z-5 p-4 rounded-md bg-red-600 text-white mx-w-md";

  return (
    <div className={styles}>
      <div className="flex justify-center items-center">
        <span className="text-lg font-semibold">{message}</span>
      </div>
    </div>
  );
};
