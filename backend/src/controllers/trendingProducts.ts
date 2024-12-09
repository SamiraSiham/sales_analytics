export async function trendingProducts(req: any, res: any) {
  try {
    const { db } = req.app;
    const result = await db
      .collection("sales")
      .aggregate([
        {
          $group: {
            _id: "$ProductID",
            quantity: { $sum: "$Quantity" },
            sales: { $sum: "$TotalAmount" },
          },
        },
        {
          $sort: { quantity: -1 },
        },
        {
          $limit: 3,
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "ProductID",
            as: "product",
          },
        },
        {
          $project: {
            _id: 0,
            name: "$product.ProductName",
            quantity: 1,
            sales: "$sales",
          },
        },
      ])
      .toArray();
    res.status(200).json({
      result: result,
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
