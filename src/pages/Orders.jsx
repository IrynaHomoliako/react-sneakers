import React from "react";
import axios from "axios";
import Card from "../components/Card";
import AppContext from "../context";

function Orders() {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          "https://620c1b2bb57363259386f930.mockapi.io/orders"
        );
        // console.log(data.map((obj) => obj.items).flat());
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false);
      } catch (error) {
        alert("Error");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-40">
      <div className="mb-40 d-flex align-center justify-between">
        <h1>Мои заказы</h1>
      </div>
      <div className="sneakers d-flex">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card key={index} loading={isLoading} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Orders;
