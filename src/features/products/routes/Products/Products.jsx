import React from "react";

import "./Products.css";
import { Box, Backdrop, CircularProgress, Grid, Modal, Alert, Snackbar  } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";

import { getProducts } from "../../api/getProducts";
import './Products.css'
import { Height } from "@mui/icons-material";

const Products = () => {
  const [open, setOpen] = React.useState(false);
  const [openCompra, setOpenCompra] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenkCompra = () => {
    setOpenCompra(true);
  };

  const handleCloseCompra = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenCompra(false);
  };


  async function fetchData() {
    try{
      setProducts(await getProducts());
    }
    finally{
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="products">
      <h1>Produtos</h1>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box className="modal">
          <h2 id="modal-title">Descrição de {selectedProduct ? selectedProduct.title : ""}</h2>
          <br/>
          <img src={selectedProduct ? selectedProduct.image : ""}></img>
          <p id="modal-description" className="descricao">
            {selectedProduct ? selectedProduct.description: ""}
          </p>
          <Button onClick={handleClose}>Fechar  </Button>
        </Box>
      </Modal>
      <Snackbar open={openCompra} autoHideDuration={4000} onClose={handleCloseCompra}>
        <Alert onClose={handleCloseCompra} severity="success" sx={{ width: '100%' }}>
          Compra Realizada com Sucesso!
        </Alert>
      </Snackbar>
      {(
        <Box className="box">
          <Grid container spacing={0}>
          {products.map((product, key) => {
            return (
              <Card className="card" key={key}>
                <CardMedia
                  className="imagem"
                  image={product.image}
                  title="produto"
                />
                <CardContent>
                  <Typography gutterBottom component="div" className="titulo">
                    {product.title}
                  </Typography>
                  <Typography className="preco">
                    Preço: ${product.price}
                  </Typography>
                  <Typography className="categoria">
                    Categoria: {product.category}
                  </Typography> 
                  <Typography className="estoque">
                    Estoque: {product.rating.count}
                  </Typography>
                  <Typography onClick={ () => {
                    handleOpen()
                    setSelectedProduct(product)
                    }} className="btnDescricao">
                    Ver Descrição
                  </Typography>
                </CardContent>
                <CardActions className="areaCompra">
                    <Typography
                      gutterBottom
                      component="div"
                    >
                      <StarIcon /> {product.rating.rate}
                      <Button variant="outlined" className="btnCompra" onClick={handleOpenkCompra}>Comprar</Button>
                    </Typography>
                </CardActions>
              </Card>
            );
          })}
          </Grid>
        </Box>
      )}
    </section>
  );
};

export default Products;
