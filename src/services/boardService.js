/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { slugify } from '~/utils/formatters.js'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async reqBody => {
  const newBoard = {
    ...reqBody,
    slug: slugify(reqBody.title),
  }

  const createdBoard = await boardModel.createNew(newBoard)
  const boardResult = await boardModel.findOneById(createdBoard.insertedId)
  return boardResult
}

const getDetails = async id => {
  if (!id) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Invalid board id')
  }
  const boardResult = await boardModel.getDetails(id)
  const resBoard = cloneDeep(boardResult)
  resBoard.columns?.forEach(column => {
    column.cards = resBoard.cards?.filter(
      card => card.columnId.toString() === column._id.toString()
    )
  })

  delete resBoard.cards
  return resBoard
}

export const boardService = {
  createNew,
  getDetails,
}
