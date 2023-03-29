import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import { roomCreater } from "../../utils/roomCreater";
import { dataFormattor } from "../../utils/JSON-formattor";
import { ChiefWardenService } from "../../services/chiefWarden";

const chiefWarden = new ChiefWardenService();

export const newBlock: RequestHandler = asyncHandler(async (req, res) => {
  const { name, code, numberOfRooms } = req.body;
  const roomsArray = roomCreater(code, numberOfRooms);
  const blockData = {
    name,
    code,
    occupancy: 0,
    rooms: roomsArray,
  };
  await chiefWarden.addNewBlock(blockData as any);
  res.json(dataFormattor(`${name} block created with ${numberOfRooms} rooms.`));
});
