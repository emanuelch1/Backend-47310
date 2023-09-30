import { Router } from "express";

const router = Router()

router.get("/home", (req, res)=>{
    res.render('home');
});

router.get('/realtime', (req,res)=>{
    res.render('realTimeProducts')
})

export default router;