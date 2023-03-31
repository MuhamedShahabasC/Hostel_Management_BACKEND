import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { roomCreater } from "../../utils/roomCreater";
import { dataFormattor } from "../../utils/JSON-formattor";
import { ChiefWardenService } from "../../services/chiefWarden";
import { IRoom } from "../../interfaces/block";

const service = new ChiefWardenService();

export const newBlock: RequestHandler = asyncHandler(async (req, res) => {
  const { name, code, numberOfRooms } = req.body;
  const roomsArray = roomCreater(code, numberOfRooms);
  const blockData = {
    name,
    code,
    occupancy: 0,
    rooms: roomsArray as IRoom[],
  };
  await service.addNewBlock(blockData);
  res.json(dataFormattor(`${name} block created with ${numberOfRooms} rooms.`));
});

export const allBlocks: RequestHandler = asyncHandler(async (req, res) => {

  res.json(dataFormattor("all blocks"));
});
