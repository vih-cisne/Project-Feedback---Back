
/*test('sum 2+2', () => {
    expect(2+2).toBe(4)
})*/

import { SubmitFeedbackUseCase } from "./submit-feedback-use-case"

//spies
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
    { create :/* async () => {}*/  createFeedbackSpy},
    {sendMail: /*async () => {}*/ sendMailSpy}
)

describe("Submit feedback", () => {
    it('should be able to submit a feedback', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example',
            screenshot: 'data:image/png;base64'
        })).resolves.not.toThrow()

        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()

    })

    it('should not be able to submit a feedback without type', async () => {

        await expect(submitFeedback.execute({
            type: '',
            comment: 'example',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback without comment', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64'
        })).rejects.toThrow()
    })

    it('should not be able to submit a feedback with a invalid screenshot format', async () => {

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'htjtj',
            screenshot: 'test'
        })).rejects.toThrow()
    })

    
})