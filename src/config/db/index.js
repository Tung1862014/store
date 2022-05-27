const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/quan_ban_hang_dev');
        console.log('connect successfully !!');
    } catch (error) {
        console.log('connect failure !!');
    }
}

module.exports = { connect };

// const mysql = require('mysql');

// const con = mysql.createConnection({
//     host: "localhost",
//     user: "webdienthoai",
//     password: "",
//   });
//  function connect() {
//          con.connect((err) =>{
//         if (err) console.log('connect failure !!');
//         console.log("Connected!");
//         });

// };
// module.exports = { connect };
