import { Request, Response, Router } from 'express'
import Task from '../models/Task'
const router = Router()

router.get("/create", (req: Request, res: Response) => {
    res.render('tasks/create')
});

router.post('/create', async (req: Request, res: Response) => {
    const { title, description } = req.body

    const newTask = new Task({ title, description })

    await newTask.save()

    res.redirect('/tasks/list')
})

router.get("/list", async (req: Request, res: Response) => {
    const tasks = await Task.find().lean();

    res.render("tasks/list", { tasks });
});


router.get("/delete/:id", async (req: Request, res: Response) => {
    const { id } = req.params

    await Task.findByIdAndDelete(id)

    res.redirect('/tasks/list')

})


router.get("/edit/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const task = await Task.findById(id).lean();

    console.log('Taks ', task);


    res.render('tasks/edit', { task })
})

router.post("/update/:id", async (req: Request, res: Response) => {
    const { id } = req.params
    const { title, description } = req.body

    await Task.findByIdAndUpdate(id, { title, description })

    res.redirect('/tasks/list')
})

router.post("/search", async (req: Request, res: Response) => {
    const { title } = req.body

    const task = await Task.findOne({ title }).lean();

    console.log('Task ', task);


    res.render('tasks/show', { task })
})






export default router