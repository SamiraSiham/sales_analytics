// import express from 'express';
export async function getProductById(req: any, res: any) {
  try {
    // res.status(200).json({
    //   message : "connected"
    // });
    const { db } = req.app;
    const { ProductID } = req.params;
    if (!ProductID) {
      res.status(400).json({ error: "Product ID is required" });
    }
    const result = await db.collection("products").find({ ProductID: parseInt(ProductID) }).toArray();
    if (!result) {
      console.log("Product not found");
      res.status(400).json({ error: "Product not found" });
    } 
    else {
      console.log("Product : " + result.toString());
      res.status(200).json({ message: "Product found", product : result });
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
