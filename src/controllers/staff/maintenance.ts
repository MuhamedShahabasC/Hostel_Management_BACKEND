import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { BlockService } from "../../services/block";
import ErrorResponses from "../../error/ErrorResponses";

const blockService = new BlockService();

// All Blocks data
export const allBlocksData = asyncHandler(async (req, res) => {
  const allBlocksData = await blockService.allBlocks();
  res.json(dataFormattor(allBlocksData));
});

// Block data with filtering
export const blockData = asyncHandler(async (req, res) => {
  const blockData = await blockService.blockDetailsByName(req.params.name[0]);
  res.json(dataFormattor(blockData));
});

// Change room availability
export const changeRoomAvailability = asyncHandler(async (req, res) => {
  await blockService.changeRoomAvailability(req.params.code);
  res.json(dataFormattor(`${req.params.code} updated`));
});
