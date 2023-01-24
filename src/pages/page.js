import axios from "axios";
import { useEffect } from "react";

import { Checkout, config } from "@/components/checkout";

export default function Home({ data }) {

  console.log('======> FRONT',data)

  return (
    <div style={{backgroundColor:'#FFF'}}>
      <Checkout data={data}/>;

    </div>
  )
}

export async function getServerSideProps() {

  const data = await axios(config)
    .then(function (response) {
    return (response.data)
    })
    .catch(function (error) {
      console.log(' ========> ERROR', error);
    });

  console.log('=========> BACK', data)
  return {
    props: {
      data,
    },
  };
}



