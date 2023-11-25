import React from "react";

import "./Products.css";
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from "@mui/material";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarIcon from '@mui/icons-material/Star';

import { getProducts } from "../../api/getProducts";

const Products = () => {

  const [products, setProducts] = React.useState([]);

  async function fetchData() {
    const productsResponse = await getProducts();

    setProducts(
      productsResponse.map((product) => {
        return product
      })
    );
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  console.log(getProducts())
  return (
    <section className="products">
      <h1>Produtos</h1>
      {
      products.length > 0 ? 
      products.map((product) => {
        return (
          <Box sx={{ maxWidth: "98%", marginTop: 2 }}>
            <Card sx={{ display: 'flex', minHeight: 300 }} key={product.id}>
              <CardMedia
                sx={{ 
                  width: 200, 
                  height: 300
                 }}
                component="img"
                alt="green iguana"
                image={product.image}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {product.title} [$ {product.price}]
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Categoria: {product.category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Estoque: {product.rating.count}
                </Typography>
                <Typography variant="body2">
                  Descrição: {product.description}
                </Typography>
              </CardContent>
              <CardActions sx={{marginRight: 5, textAlign: 'center',}}>
                <Typography gutterBottom variant="h5" component="div" sx={{width: 100}}>
                  <StarIcon /> {product.rating.rate}
                <Button variant="outlined">Comprar</Button>
                </Typography>
              </CardActions>
            </Card>
          </Box>
          )
      })
      : 
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
      }
    </section>
  );
};

export default Products;
