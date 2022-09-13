import { Handler } from "express";
import Task from "../models/Task";

export const newtask: Handler = (__, res) => {
    res.render('tasks/task')
}

export const create: Handler = async (req, res) => {
    const { title, description } = req.body

    const newTask = new Task({ title, description })

    await newTask.save()

    res.redirect('/tasks/list')
}

export const edit: Handler = async (req, res) => {
    const { id } = req.params

    const task = await Task.findById(id).lean();

    res.render('tasks/task', { task })
}

export const update: Handler = async (req, res) => {
    const { id } = req.params
    const { title, description } = req.body

    await Task.findByIdAndUpdate(id, { title, description })

    res.redirect('/tasks/list')
}

export const show: Handler = async (req, res) => {
    const { title } = req.body

    const task = await Task.findOne({ title: { $regex: new RegExp(title) } }).lean();

    res.render('tasks/show', { task })
}

export const tasks: Handler = async (__, res) => {
    const tasks = await Task.find().lean();

    res.render("tasks/list", { tasks });
}

export const remove: Handler = async (req, res) => {
    const { id } = req.params

    await Task.findByIdAndDelete(id)

    res.redirect('/tasks/list')
}




