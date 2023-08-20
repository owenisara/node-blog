//ติดต่อฐานข้อมูล / ดำเนินการกับฐานข้อมูล
const slugify = require('slugify')
const Blogs = require('../models/blogs')
const { v4: uuidv4 } = require('uuid');
//บันทึกข้อมูล
exports.create=(req,res)=>{
   const {title,content,author} = req.body
    let slug = slugify(title) 
    // validation  / ตรวจสอบความถูกต้อง
    if(!slug)slug=uuidv4();
    
    switch(true){
        case !title:
            return res.status(400).json({error:"กรุณาป้อนชื่อบทความ"})
            break;
        case !content: 
            return res.status(400).json({error:"กรุณาป้อนเนื้อหาบทความ"})    
            break;   }
    
        //บันทึกข้อมูล
        Blogs.create({title,content,author,slug},(err,blog)=>{
            if(err){
                res.status(400).json({error:"มีชื่อบทความซ้ำกัน"})
            }
            res.json(blog)
        })
}
//ดึงข้อมูลทบความทั้งหมด
exports.getAllblogs=(req,res)=>{
    Blogs.find({}).exec((err,blogs)=>{
        res.json(blogs)
    })
}
//ดึงบทความที่สนใจ Slug
exports.singleBlog=(req,res)=>{
    const{slug} = req.params
    Blogs.findOne({slug}).exec((err,blog)=>{
        res.json(blog)
    })
}
exports.remove=(req,res)=>{
    const {slug} = req.params
    Blogs.findOneAndDelete({slug}).exec((err,blog)=>{
        if(err) console.log(err)
        res.json({
            message:"ลบบทความเรียบร้อย"
        })
    })
}
exports.update=(req,res)=>{
   const {slug} = req.params
 
    const {title,content,author} = req.body
     Blogs.findOneAndUpdate({slug},{title,content,author},{new:true}).exec((err,blog)=>{
         if(err) console.log(err)
        res.json(blog)
     })
}