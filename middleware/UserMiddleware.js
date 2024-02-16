const jwt = require('jsonwebtoken')
const { User } = require("../models")

exports.authMiddleware = async(req,res,next) => {
 // 1) Fungsi Jika diheader kita masukan token atau tidak
   let token
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1]
   }
   if(!token) {
      return next(res.status(401).json({
         status : 401,
         message : "Anda Belum Login/Register Token Tidak Ditemukan"
      }))
   }

   console.log(token)
   // 2) Decode Verifikasi Tokennya
   let decode
   try {
       decode = await jwt.verify(token, process.env.JWT_SECRET)
   }catch(error)
   {
      return next( res.status(401).json({
         error: error,
         message : "Token yang dimasukan Tidak Ditemukan/Tidak Valid"
      }))
   }

   // 3) Ambil Data User Berdasarkan Kondisi Decodenya
   const currentUser = await User.findByPk(decode.id)
   console.log(currentUser)

   req.user
   next()
}