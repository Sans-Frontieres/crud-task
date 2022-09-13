import { Router } from 'express'
import * as controller from '../controllers/tasks.controllers'


const router = Router()

router.get("/new", controller.newtask);

router.post('/create', controller.create)

router.get("/list", controller.tasks);

router.get("/delete/:id", controller.remove)

router.get("/edit/:id", controller.edit)

router.post("/update/:id", controller.update)

router.post("/search", controller.show)


export default router