export async function categorySales(req: any, res: any) {
  try {
    const { db } = req.app;
    const result = await db
      .collection("sales")
      .aggregate([
        {
          $lookup: {
            from: "products",
            localField: "ProductID",
            foreignField: "ProductID",
            as: "product",
          },
        },
        {
          $group: {
            _id: "$product.Category",
            salesCount: { $sum: 1 },
            Somme_Ventes: { $sum: "$TotalAmount" },
          },
        },
        {
          $project: {
            category: "$_id",
            salesCount: 1,
            totalSales: "$Somme_Ventes",
            _id: 0,
          },
        },
        {
          $sort: { salesCount: -1 },
        },
      ])
      .toArray();
    const totalSalesCount = result.reduce(
      (sum: any, category: any) => sum + category.salesCount,
      0
    );
    const categorySales = result.map((category : any) => ({
        ...category,
        percentage: parseFloat(((category.salesCount / totalSalesCount) * 100).toFixed(2))
      }));
    res.status(200).json({
    //   result: result,
      categorySales : categorySales
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
