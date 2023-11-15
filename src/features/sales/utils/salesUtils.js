import { getSales } from "../api/getSales";
import { getProductById } from "../../products/api/getProducts";
import { getUserById } from "../../users/api/getUsers";

export const getTopBuyers = async () => {
  const allSales = await getSales();

  const processSales = await Promise.all(
    allSales.map(async (sale) => {
      const updatedProducts = await Promise.all(
        sale.products.map(async (product) => {
          try {
            const selectedProduct = await getProductById(product.productId);

            if (selectedProduct) {
              const totalSpent = selectedProduct.price * product.quantity;

              return {
                ...product,
                price: selectedProduct.price,
                totalSpent,
              };
            } else {
              console.error(
                `Produto com ID ${product.productId} não encontrado.`
              );
              return product;
            }
          } catch (error) {
            console.error(
              `Erro ao obter informações do produto com ID ${product.productId}: ${error.message}`
            );
            return product;
          }
        })
      );

      return {
        ...sale,
        products: updatedProducts,
      };
    })
  );

  const totalSpended = processSales.map((sale) => {
    let total = 0;
    sale.products.forEach((product) => {
      total += product.totalSpent;
    });

    return {
      ...sale,
      totalSpent: total,
    };
  });

  const final = await Promise.all(
    totalSpended.map(async (item) => {
      try {
        const user = await getUserById(item.userId);

        if (user) {
          return {
            userId: user.id,
            name: user.name,
            email: user.email,
            totalSpent: item.totalSpent,
          };
        }
      } catch (error) {
        return item;
      }
    })
  );

  const groupedTotals = final.reduce((acc, product) => {
    const { userId, totalSpent, name, email } = product;

    if (!acc[userId]) {
      acc[userId] = {
        name,
        email,
        totalSpent: 0,
        userId,
      };
    }

    acc[userId].totalSpent += totalSpent;

    return acc;
  }, {});

  const resultArray = Object.values(groupedTotals);

  return resultArray;
};
