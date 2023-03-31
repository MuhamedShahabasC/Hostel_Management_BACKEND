import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { BlockService } from "../../services/block";

// todo
// 1. update room : ? Student data referece required

// Block service
const service = new BlockService();

// Add a new block
export const newBlock: RequestHandler = asyncHandler(async (req, res) => {
  const { name, code, numberOfRooms } = req.body;
  await service.createBlock(name, code, numberOfRooms);
  res.json(dataFormattor(`${name} block created with ${numberOfRooms} rooms.`));
});

// Get all blocks' data
export const allBlocks: RequestHandler = asyncHandler(async (req, res) => {
  const blocksData = await service.allBlocks();
  res.json(dataFormattor(blocksData));
});

// Delete a block
export const deleteBlock: RequestHandler = asyncHandler(async (req, res) => {
  await service.deleteBlock(req.params._id);
  res.json(dataFormattor('Block deleted successfully'));
});

// Update room
export const updateRoom: RequestHandler = asyncHandler(async(req, res) => {
  // const {status, student} // requires student data 
  res.json(dataFormattor(req.body))
})