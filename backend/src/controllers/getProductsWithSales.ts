export async function getProductsWithSales(req: any, res: any) {
  try {
    const { db } = req.app;
    const result = await db
      .collection("products")
      .aggregate([
        {
          $lookup: {
            from: "sales",
            localField: "ProductID",
            foreignField: "ProductID",
            as: "sales",
          },
        },
        {
          $project: {
            _id: 1,
            ProductID: 1,
            ProductName: 1,
            Category: 1,
            Price: 1,
            salesCount: { $size: "$sales" },
          },
        },
      ])
      .toArray();
    res.status(200).json({ products: result });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
