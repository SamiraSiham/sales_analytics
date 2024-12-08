// import express from 'express';
export async function createProduct(req: any, res: any) {
  try {
    const { db } = req.app;
    const { ProductID, ProductName, Category, Price } = req.body;
    if (!ProductID) {
      res.status(400).json({ message: "The Product ID is required" });
    }
    if (!ProductName) {
      res.status(400).json({ message: "The Product Name is required" });
    }
    if (!Category) {
      res.status(400).json({ message: "The Category is required" });
    }
    if (!Price) {
      res.status(400).json({ message: "The Price is required" });
    }
    const existingProduct = await db.collection("products").findOne({
      ProductID: ProductID,
    });
    if (existingProduct) {
      console.log(existingProduct);
      res.status(400).json({ message: "This product already exists!" });
    }
    const result = await db.collection("products").insertOne({
      ProductID,
      ProductName,
      Category,
      Price,
    });
    // console.log(result);
    if (result.acknowledged) {
      res.status(200).json({ message: "Product added successfully" });
    }else{
      throw new Error("Product not created!");
    }
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
