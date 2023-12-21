import { Router, Request, Response } from "express";
import multer from 'multer';

import { CreateUserController } from './controlles/user/CreateUserController'
import { AuthUserController } from "./controlles/user/AuthUserController";
import { DetailUserController } from "./controlles/user/DetailUserController";

import { CreateCategoryController } from "./controlles/category/CreateCategoryController";
import { ListCategoryController } from "./controlles/category/ListCategoryController";

import { CreateProductController } from "./controlles/product/CreateProductController";
import { ListByCategoryController } from "./controlles/product/ListByCategotyController";

import { CreateOrderControlle } from "./controlles/order/CreateOrderController";
import { RemoveOrderController } from "./controlles/order/RemoveOrderController";

import { AddItemController } from "./controlles/order/AddItemController";
import { RemoveItemConstroller } from "./controlles/order/RemoveItemConstroller";
import { SendOrderController } from "./controlles/order/SendOrderController";
import { ListOrdersController } from "./controlles/order/ListOrdersController";
import { DetailOrdersController } from "./controlles/order/DetailOrdersController";
import { FinishOrderController } from "./controlles/order/FinishOrderController";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import uploadConfig from "./config/multer";

const router = Router();

//-- LOCAL DA PASTA DE ARMAZENAR AS FOTOS DOS PRODUTOS
const upload = multer(uploadConfig.upload("./tmp"))

//--ROTAS USER --
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)

//-- ROTAS CATEGORY
router.post('/category',isAuthenticated, new CreateCategoryController().handle)
router.get('/category', isAuthenticated, new ListCategoryController().handle)

//--ROTAS PRODUCTS
router.post('/product', isAuthenticated, upload.single('file'), new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

//--ROTAS DE ORDEM - PEDIDOS
router.post('/order', isAuthenticated, new CreateOrderControlle().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemConstroller().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)
router.get('/order/detail', isAuthenticated, new DetailOrdersController().handle)
router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)

export {router};