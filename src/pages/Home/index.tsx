import { useEffect, useState } from "react";
import api from "../../services/api";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container, ProductList } from "./styles";
import { useCart } from "../../providers/Cart";

interface IItem {
  name: string;
  image_url: string;
  price: number;
  description: string;
  id: number;
}

const Home = () => {
  const { addCart } = useCart();

  const [products, setProducts] = useState<IItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    api
      .get("/products/")
      .then((response) => setProducts(response.data))
      .then(() => setLoading(false));
  }, []);

  return (
    <Container>
      {loading ? (
        <CircularProgress size={50} />
      ) : (
        <ProductList>
          {products.map((product: IItem) => (
            <li key={product.id}>
              <figure>
                <img src={product.image_url} alt={product.name} />
              </figure>
              <strong>{product.name}</strong>
              <div>
                <span>{product.price}</span>

                <button type="button" onClick={() => addCart(product)}>
                  <span>Adicionar ao carrinho</span>
                </button>
              </div>
            </li>
          ))}
        </ProductList>
      )}
    </Container>
  );
};

export default Home;
