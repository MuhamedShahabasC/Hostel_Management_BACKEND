import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { BlockService } from "../../services/block";

// Block service
const service = new BlockService();

// Add a new block
export const newBlock = asyncHandler(async (req, res) => {
  const { name, code, numberOfRooms } = req.body;
  await service.createBlock(name, code, numberOfRooms);
  res.json(dataFormattor(`${name} block created with ${numberOfRooms} rooms.`));
});

// Get all blocks' data
export const allBlocks = asyncHandler(async (req, res) => {
  const blocksData = await service.allBlocks();
  res.json(dataFormattor(blocksData));
});

// Delete a block
export const deleteBlock = asyncHandler(async (req, res) => {
  await service.deleteBlock(req.params._id);
  res.json(dataFormattor("Block deleted successfully"));
});

// Check room availability
export const checkRoomAvailability = asyncHandler(async (req, res) => {
  const roomStatus = await service.getRoomAvailability(req.params.roomCode);
  res.json(dataFormattor(roomStatus));
});

// Update room
export const updateRoom = asyncHandler(async (req, res) => {
  // const {status, student} // requires student data
  res.json(dataFormattor(req.body));
});

// All available rooms
export const availableRooms = asyncHandler(async (req, res) => {
  const availableRooms = await service.availableRooms(req.params._id);
  res.json(dataFormattor(availableRooms));
});

// Block data with filtering
export const blockData = asyncHandler(async (req, res) => {
  const blockData = await service.blockDetailsByName(req.params.name[0]);
  res.json(dataFormattor(blockData));
});

// Change room availability
export const changeRoomAvailability = asyncHandler(async (req, res) => {
  await service.changeRoomAvailability(req.params.code);
  res.json(dataFormattor(`${req.params.code} updated`));
});

// Hostel occupancy statistics
export const hostelOccupancy = asyncHandler(async (req, res) => {
  const hostelOccupancy = await service.hostelOccupancy();
  res.json(dataFormattor(hostelOccupancy));
});
