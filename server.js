axios
  .post("/api/sessions")
  .then(async function (response) {
    console.log(response);

    const response = await checkout.sessions({
      countryCode: "NL",
      amount: { currency: "EUR", value: 10000 }, // value is 100€ in minor units
      reference: orderRef, // required
      merchantAccount: process.env.REACT_APP_ADYEN_MERCHANT_ACCOUNT, // required
      returnUrl: `${determineHostUrl(req)}/redirect?orderRef=${orderRef}`, // required for 3ds2 redirect flow
      // set lineItems required for some payment methods (ie Klarna)
      lineItems: [
        { quantity: 1, amountIncludingTax: 5000, description: "Sunglasses" },
        { quantity: 1, amountIncludingTax: 5000, description: "Headphones" },
      ],
    });
  })
  .catch(function (error) {
    console.error(error);
  });







try {
  // unique ref for the transaction
  const orderRef = uuid();

  console.log("Received payment request for orderRef: " + orderRef);

  // Ideally the data passed here should be computed based on business logic
  const response = await checkout.sessions({
    countryCode: "NL",
    amount: { currency: "EUR", value: 10000 }, // value is 100€ in minor units
    reference: orderRef, // required
    merchantAccount: process.env.REACT_APP_ADYEN_MERCHANT_ACCOUNT, // required
    returnUrl: `${determineHostUrl(req)}/redirect?orderRef=${orderRef}`, // required for 3ds2 redirect flow
    // set lineItems required for some payment methods (ie Klarna)
    lineItems: [
      { quantity: 1, amountIncludingTax: 5000, description: "Sunglasses" },
      { quantity: 1, amountIncludingTax: 5000, description: "Headphones" },
    ],
  });

  // save transaction in memory
  paymentStore[orderRef] = {
    amount: { currency: "EUR", value: 1000 },
    reference: orderRef,
  };

  res.json([response, orderRef]); // sending a tuple with orderRef as well to inform about the unique order reference
} catch (err) {
  console.error(`Error: ${err.message}, error code: ${err.errorCode}`);
  res.status(err.statusCode).json(err.message);
}
