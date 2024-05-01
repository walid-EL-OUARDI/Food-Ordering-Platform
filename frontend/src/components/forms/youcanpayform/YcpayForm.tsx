import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useAppDispatch } from "@/app/hooks/hooks";
import { setycPay } from "@/features/payment/paymentSlice";

type Props = {
  onPay: () => void;
};

const YcpayForm = ({ onPay }: Props) => {
  const dispatch = useAppDispatch();
  const insertYcpScript = async () => {
    return new Promise((resolve, reject) => {
      let youcanpayScript = document.createElement("script");
      youcanpayScript.src = "https://youcanpay.com/js/ycpay.js";
      document.head.appendChild(youcanpayScript);
      youcanpayScript.onload = resolve; // Resolve the promise when the script loads successfully
      youcanpayScript.onerror = reject;
    });
  };

  useEffect(() => {
    insertYcpScript()
      .then(() => {
        console.log("Script loaded successfully");
        dispatch(setycPay());
      })
      .catch((error) => {
        console.error("Error loading script:", error);
      });
  }, []);
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex justify-center w-full">
          <img
            src="/ycpay-logo.png"
            className="rounded-md w-[15rem] h-[4rem]"
          />
        </div>

        <div id="payment-container"></div>
        <div id="error-container"></div>
        <Button
          onClick={onPay}
          type="submit"
          className="bg-orange-500 flex-1"
        >
          Pay now
        </Button>
      </div>
    </>
  );
};

export default YcpayForm;
