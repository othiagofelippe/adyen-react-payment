import AdyenCheckout from "@adyen/adyen-web";
import "@adyen/adyen-web/dist/adyen.css";
import { useEffect } from "react";

export function Checkout({ data }) {
  const configuration = {
    environment: "test",
    clientKey: "test_M5S4DWGGXVAZHGY3AZ745QJ7SY7K6JDE",
    analytics: {
      enabled: true,
    },
    session: {
      id: data.id,
      sessionData: data.sessionData,
    },
    onPaymentCompleted: (result, component) => {
      console.info(result, component);
    },
    onError: (error, component) => {
      console.error(error.name, error.message, error.stack, component);
    },

    paymentMethodsConfiguration: {
      card: {
        hasHolderName: true,
        holderNameRequired: true,
        billingAddressRequired: true,
      },
    },
  };

  async function createCheckout() {
    const checkout = await AdyenCheckout({
      ...configuration,
      onPaymentCompleted: (response, _component) =>
        console.log(response.resultCode),
      onError: (error, _component) => {
        console.error(error);
      },
    });
    checkout.create("card").mount("#card-container");
  }

  useEffect(() => {
    createCheckout();
  }, []);

  return <div id="card-container"></div>;
}

const data = JSON.stringify({
  merchantAccount: "Freelancer022ECOM",
  amount: {
    value: 1000,
    currency: "EUR",
  },
  returnUrl: "https://your-company.com/checkout?shopperOrder=12xy..",
  reference: "Freelancer022ECOMTEST",
  countryCode: "NL",
});

export const config = {
  method: "post",
  url: "https://checkout-test.adyen.com/v69/sessions",
  headers: {
    "x-API-key":
      "AQEvhmfxL4nPbRNKw0m/n3Q5qf3VbplICJ9LVmZT1Cj5zHVfDDSX3Db2HM0tFpqUcYcQwV1bDb7kfNy1WIxIIkxgBw==-azSt0YTffLJyDJQQ/bTlE4Bt7c4Dc196FOqb6SABiPE=-3tKzp?]X}KdZteQ]",
    "content-type": "application/json",
  },
  data: data,
};
