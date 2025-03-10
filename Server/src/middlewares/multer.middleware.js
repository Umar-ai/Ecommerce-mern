import multer from 'multer'


const storage=multer.diskStorage({
    
    destination:function(req,file,cb){
        cb(null,'./public/temp')
    },
    filename:function(req,file,cb){
     cb(null,file.originalname)
    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
});
// export const upload=multer({storage})