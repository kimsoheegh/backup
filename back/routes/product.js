const express = require('express')
const Product = require('../models/product')
const User = require('../models/user')
const ProductImg = require('../models/productImg')
const CustomCategory = require('../models/customCategory')
const Comment = require('../models/comment')
const AWS = require('aws-sdk');
const fs = require('fs');
const {sequelize, Op} = require('sequelize')
const authJWT = require('../utils/authJWT')
const axios = require('axios')

const router = express.Router()

function checkParams (bigCategory, price) {
    if (!bigCategory) {

    }
}

require('dotenv')
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region : 'ap-northeast-2'
});

router.get('/productList', async (req, res, next) => {
    try {
        const startIndx = Number(req.query.page)*100
        console.log(req.query.dsadas)
        const productData = await Product.findAll({
            
            where: {
                [Op.and]: [
                    {
                       productPrice: {
                            [Op.between]: 
                                [req.query.priceMin ? Number(req.query.priceMin) : 
                                    req.query.price ? 
                                    req.query.price==1 ? 0:
                                    req.query.price==2 ? 50000:
                                    req.query.price==3 ? 100000:
                                    req.query.price==4 ? 200000:
                                    300000 
                                    : 0 
                                    , 
                                req.query.priceMax ? Number(req.query.priceMax) : 
                                    req.query.price ? 
                                    req.query.price==1 ? 50000: 
                                    req.query.price==2 ? 100000:
                                    req.query.price==3 ? 200000:
                                    req.query.price==4 ? 300000:
                                    700000
                                    :700000]
                       }
                    },
                    {
                        bigCategoryId: {
                            [Op.gt]: [req.query.bigCategoryId ? Number(req.query.bigCategoryId)-1 : 0 ]
                        }
                    },
                    {
                        smallCategoryId: {
                            [Op.gt]: [req.query.smallCategoryId ? Number(req.query.smallCategoryId)-1 : 0 ]
                        }
                    }
                ]
            },
            include: [
                {
                    model: ProductImg,
                    attributes: ["src"]
                }
            ],
            limit: 100,
            offset: startIndx,
            attributes: ['id', 'productTitle', 'productPrice', 'likes', 'comments']
        })
        //a
        if (!productData) {
            return res.status(400).json({ message: "?????? ?????? ????????? ???????????? ???????????? ?????? ??????????????????" })
        }

        res.status(200).json({ productData })
    } catch(e) {
        console.error(e)
        next(e)
    }
})

router.get('/productDetail', async (req, res) => {
    console.log(req.query.productId)
    let product = await Product.findOne({
        include: [
            {
                model: CustomCategory,
                attributes: ["id"],
                through: {attributes: []}
            }
        ],
        where: {
            id: req.query.productId
        },
        attributes: {exclude: ['productInfo', "createdAt", "updatedAt", "deletedAt", ]},
    })

    if (!product) {
        return res.status(400).json({ message: '?????? ?????? ????????? ????????????'})
    }
    const comment = await Comment.findAndCountAll({
        raw: true,
        where: {
            ProductId: product.id
        },
    })
    sum = 0
    for (let i = 0; i < comment.count; i++) {
        sum += comment.rows[i].ValueBrightness
        sum += comment.rows[i].ValueColorSense
        sum += comment.rows[i].ValueStorageSpace
    }
    rated = (sum / (comment.count * 3)).toFixed(1)
    product.setDataValue('commentCount', comment.count)
    product.setDataValue('rated', rated)
    
    res.status(200).json({ product })
})

router.post('/addCart', authJWT, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                id: req.myId
            } 
        })
        console.log(req.body.productId)
        const checkProduct = await exUser.getProduct({
            where: {
                id: req.body.productId
            }
        })
        if (checkProduct.length > 0) {
            return res.status(400).send({ message: "?????? ??????????????? ?????? ???????????????" })
        }
        await exUser.addProduct(
            req.body.productId
        )
        
        res.status(200).send({ success: true })
    } catch (e) {
        console.error(e)
        next(e)
    }
})

router.post('/likeProduct', authJWT, async (req, res, next) => {
    try {
        const exUser = await User.findOne({
            where: {
                id: req.myId
            }
        })

        const checkLike = await exUser.getLikeIt({
            where: {
                id: req.body.productId
            }
        })
        if (checkLike.length > 0) {
            return res.status(400).send({ message: "?????? ???????????? ???????????????" })
        }

        await exUser.addLikeIt(req.body.productId)

        res.status(200).send({ success: true })

    } catch (e) {
        console.error(e)
        next(e)
    }
})

router.post('/purchase', authJWT, async (req, res) => {
    try {
        const { imp_uid, merchant_uid } = req.body; // req??? query?????? imp_uid, merchant_uid ??????
          // ????????? ??????(access token) ?????? ??????
        const getToken = await axios({
        url: "https://api.iamport.kr/users/getToken",
        method: "post", // POST method
        headers: { "Content-Type": "application/json" }, // "Content-Type": "application/json"
        data: {
            imp_key: "7886282210238108", // REST API ???
            imp_secret: "lNItGvMSCUT2kTs0QiIha0fzoOgE3VgRFC2ykVwmEuCnoOpd2VTkLy4LHohY2ZZpyxhxP5uEhs9QyFPC" // REST API Secret
        }
        });
        const { access_token } = getToken.data.response; // ?????? ??????
        // imp_uid??? ???????????? ???????????? ?????? ?????? ??????
        const getPaymentData = await axios({
            url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid ??????
            method: "get", // GET method
            headers: { "Authorization": access_token } // ?????? ?????? Authorization header??? ??????
        });
        const paymentData = getPaymentData.data.response; // ????????? ?????? ??????
        // ?????? ????????????
        const { amount, status } = paymentData;
        if (req.body.length < 7) {
            return res.status(401).send({ message: "?????? ????????? ???????????? ??????????????? ???????????? ?????? ??????????????????" })
        }        
        if (amount != req.body.productPrice) {
            return res.status(402).send({ message: "????????? ?????? ???????????????" })
        }
        const exUser = await User.findOne({
            where: {
                id: req.myId
            }
        })
        
        exUser.addmyOrder({
            id: req.ProductId,
            orderPrice: req.body.price,
            state: 1
        })
        res.status(200).send({message: "?????? ?????? ??????" });
    } catch(e) {
        console.error(e)
        next(e)
    }
})

module.exports = router