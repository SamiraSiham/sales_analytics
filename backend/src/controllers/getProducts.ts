// import express from 'express';
export async function getProducts(req: any, res: any) {
  try {
    const { db } = req.app;

    const result = await db.collection("products").find().toArray();
    console.log(result);
    res
      .status(200)
      .json({ message: "Products Retrieved Successfully", products: result });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
