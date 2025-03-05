/**
 * Updated by samdev's author on August 17 2023
 * YouTube: https://youtube.com/@samdev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (samdev)',
      'string.empty': 'Title is not allowed to be empty (samdev)',
      'string.min': 'Title min 3 chars (samdev)',
      'string.max': 'Title max 50 chars (samdev)',
      'string.trim': 'Title must not have leading or trailing whitespace',
    }),
    description: Joi.string().required().min(3).max(50).trim().strict(),
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    res.status(StatusCodes.CREATED).json({
      message: 'Create a new board',
    })
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message,
    })
  }
}

export const boardValidation = { createNew }
