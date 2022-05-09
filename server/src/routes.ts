import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';
import express from 'express'
export const routes = express.Router()

import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repositories';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';




routes.post('/feedbacks', async (req, res) =>{
    try{
        const {type, comment,screenshot} = req.body

        const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
        const nodemailerMailAdapter = new NodemailerMailAdapter()
        const submitFeedbackUseCase = new SubmitFeedbackUseCase(
            prismaFeedbacksRepository,
            nodemailerMailAdapter
        )

        await submitFeedbackUseCase.execute({
            type,
            comment,
            screenshot
        })




        res.status(201).send()
    }catch(err){
        console.log(err)
        return res.status(500).send()
    }
        
})
