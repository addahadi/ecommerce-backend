const db = require("../db");



const EditProfile = (req , res) => {
    const {title , descr , price , region,productId} = req.body
    const values = []
    const queries = []
    
    if(title){
        queries.push("title = ?")
        values.push(title)
    }
    if (descr) {
      queries.push("title = ?");
      values.push(title);
    }
    if (price) {
      queries.push("title = ?");
      values.push(title);
    }
    if (region) {
      queries.push("title = ?");
      values.push(title);
    }

    const query = `UPDATE products set (${queries.join(",")}) WHERE productId = ? `
    values.push(productId)
    db.query(
      query,
      values,
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({
            status : true ,
            message : 'successful update'
        })
      }
    );
}
module.exports = {
    EditProfile
}