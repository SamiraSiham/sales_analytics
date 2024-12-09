export async function totalSales(req: any, res: any) {
  try {
    const { db } = req.app;
    let startDate = new Date("2024-01-01").toISOString();
    let endDate = new Date("2024-12-31").toISOString();
    const result = await db.collection("sales").aggregate([
        {
            $match: {
                Date : {
                    $gte: new Date(startDate),
                    $lte: new Date(endDate),
                }
            }
        },
        {
            $group :{
                _id : null,
                totalSales : {$sum : "$TotalAmount"}
            }
        }
    ]).toArray();
    res.status(200).json({ 
      result : result, 
      // startDate : startDate, 
      // endDate :endDate
    });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
}
