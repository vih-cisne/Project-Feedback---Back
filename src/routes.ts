import express from 'express';
import nodemailer from 'nodemailer';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';
import { prisma } from './prisma'
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackUseCase } from './use-cases/submit-feedback-use-case';

export const routes = express.Router()

routes.post('/feedbacks', async (req,res) => {

    const {type,comment,screenshot} = req.body;

    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()

    const nodemailerMailAdapter = new NodemailerMailAdapter()

    const submitFeedbackUseCase = new SubmitFeedbackUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter
    )

    await submitFeedbackUseCase.execute({
        type,
        comment,
        screenshot,
    })
    

    /*
    await transport.sendMail({
        from: 'Equipe Feedget <oi@widget.com>',
        to: 'Ana <ana@gmail.com>',
        subject: 'Novo feedback',
        html: [
            `<div style="font-family: sans-serif; font-size: 16px; color:#111;"> `,
            `<p> Tipo de feedback: ${type} </p>`,
            `<p>Comentário: ${comment} <p>`,
            `<div/>`
        ].join('\n')
    })*/
    return res.status(201).send()
    //.json({ data: feedback })
})