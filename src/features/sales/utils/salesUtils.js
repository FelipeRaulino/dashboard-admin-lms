import { getSales } from "../api/getSales";
import { getProductById, getProducts } from "../../products/api/getProducts";
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

const getSalesPerMonth = (sales) => {
  const formattedData = {};

  sales.forEach((sale) => {
    const month = new Date(sale.date).toLocaleString("default", {
      month: "long",
    });

    const totalQuantity = sale.products.reduce(
      (total, product) => total + product.quantity,
      0
    );

    if (!formattedData[month]) {
      formattedData[month] = 0;
    }

    formattedData[month] += totalQuantity;
  });

  return formattedData;
};

export const getSalesPerMonthForChart = async () => {
  const sales = await getSales();

  const data = getSalesPerMonth(sales);

  const dataForChart = Object.keys(data).map((month) => ({
    name: month,
    totalSales: data[month],
  }));

  return dataForChart;
};

const salesPerCategoryForChart = (sales) => {
  const salesPerCategory = sales.reduce((acc, saleItem) => {
    const { productCategory } = saleItem;

    if (!acc[productCategory]) {
      acc[productCategory] = 1;
    } else {
      acc[productCategory]++;
    }

    return acc;
  }, {});

  const salesForChart = Object.entries(salesPerCategory).map(
    ([categoria, quantidadeVendas]) => ({
      categoria,
      quantidadeVendas,
    })
  );

  return salesForChart;
};

export const getTotalSalesFormatted = async () => {
  const allSales = await getSales();

  const test = [];

  await Promise.all(
    allSales.map(async (sale) => {
      await Promise.all(
        sale.products.map(async (product) => {
          for (let index = 0; index < product.quantity; index++) {
            try {
              const productRequest = await getProductById(product.productId);
              test.push({
                userId: sale.userId,
                productName: productRequest.title,
                productCategory: productRequest.category,
                productPrice: productRequest.price,
                saleDate: sale.date,
              });
            } catch (error) {
              console.error(error);
            }
          }
        })
      );
    })
  );

  const salesForChart = salesPerCategoryForChart(test);

  return salesForChart;
};

export const getAllSales = async () => {
  const allSales = await getSales();
  const allProducts = await getProducts();

  const test = [];

  allSales.map((sale) => {
    sale.products.map((product) => {
      for (let index = 0; index < product.quantity; index++) {
        const productRequest = allProducts.find(
          (p) => p.id === product.productId
        );
        test.push({
          userId: sale.userId,
          productName: productRequest.title,
          productCategory: productRequest.category,
          productPrice: productRequest.price,
          saleDate: sale.date,
        });
      }
    });
  });

  return test;
};
