const jwt = require('jsonwebtoken')
const { User,Role } = require("../models")

exports.authMiddleware = async(req,res,next) => {
 // 1) Fungsi Jika diheader kita masukan token atau tidak
   let token
   // if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
   //    token = req.headers.authorization.split(' ')[1]
   // }

   token = req.cookies.jwt
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
   if(!currentUser) {
      return next(res.status(401).json({
         message : "User Not Found and Token cant be Used Again!",
         status : 401,
      }))
   }
   console.log(currentUser)

   req.user = currentUser
   next()
}

exports.permissionMiddleware = (...roles) => {
   return async(req,res,next) => {
      const rolesData = await Role.findByPk(req.user.role_id)

      const roleName = rolesData.name
      if(!roles.includes(roleName)) {
         return next(res.status(403).json({
            status :403,
            error : "Anda Tidak Dapat Mengakses URL Ini!"
         }))
      }

      next()
   }
}