import { getSales } from "../api/getSales";
import { getProducts } from "../../products/api/getProducts";
import { getUsers } from "../../users/api/getUsers";

export const getTopBuyers = async () => {
  const allSales = await getSales();
  const allProducts = await getProducts();
  const allUsers = await getUsers();

  const processSales = allSales.map((sale) => {
    const updatedProducts = sale.products.map((product) => {
      const selectedProduct = allProducts.find(
        (p) => p.id === product.productId
      );

      if (selectedProduct) {
        const totalSpent = selectedProduct.price * product.quantity;

        return {
          ...product,
          price: selectedProduct.price,
          totalSpent,
        };
      } else {
        console.error(`Produto com ID ${product.productId} não encontrado.`);
        return product;
      }
    });

    return {
      ...sale,
      products: updatedProducts,
    };
  });

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

  const final = totalSpended.map((item) => {
    const user = allUsers.find((u) => u.id === item.userId);

    if (user) {
      return {
        userId: user.id,
        name: user.name,
        email: user.email,
        totalSpent: item.totalSpent,
      };
    }
  });

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
