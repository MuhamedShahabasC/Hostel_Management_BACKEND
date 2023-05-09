import { BlockRepo } from "../repositories/block";
import { IBlock, IRoom } from "../interfaces/block";
import { roomCreater } from "../utils/roomCreater";
import ErrorResponses from "../error/ErrorResponses";
import { Types } from "mongoose";

export class BlockService extends BlockRepo {
  // Get all blocks
  async allBlocks(): Promise<IBlock[] | null> {
    return await this.getAll();
  }

  // Create a new block
  async createBlock(name: string, code: string, numberOfRooms: number) {
    const roomsArray = roomCreater(code, numberOfRooms);
    const blockData = {
      name,
      code,
      occupancy: 0,
      rooms: roomsArray as IRoom[],
    };
    return await this.createNew(blockData);
  }

  // Delete a block
  async deleteBlock(_id: string): Promise<IBlock | null> {
    return await this.deleteBlockById(_id);
  }

  // Block details by _id
  async blockDetailsById(_id: string): Promise<IBlock> {
    const blockDetails = await this.findOne<IBlock>({ _id });
    if (!blockDetails) throw ErrorResponses.noDataFound("block");
    return blockDetails;
  }

  // Block details by Room Code
  async blockDetailsByRoomCode(roomCode: string): Promise<IBlock> {
    const blockDetails = await this.findOne<IBlock>({ code: roomCode[0] });
    if (!blockDetails) throw ErrorResponses.noDataFound("block");
    return blockDetails;
  }

  // Fetch a room details
  async roomDetails(roomCode: string) {
    const blockDetails = await this.blockDetailsByRoomCode(roomCode);
    const roomDetails = blockDetails?.rooms?.find((room: IRoom) => room.code === roomCode);
    if (!roomDetails) throw ErrorResponses.noDataFound("room");
    return roomDetails;
  }

  // Get room availability
  async getRoomAvailability(roomCode: string): Promise<string> {
    const roomDetails = await this.roomDetails(roomCode);
    if (!roomDetails.availability) throw ErrorResponses.customError("unavailable");
    return `available`;
  }

  // Available rooms
  async availableRooms(blockId: string): Promise<IRoom[]> {
    const blockDetails = await this.blockDetailsById(blockId);
    return blockDetails.rooms.filter(({ availability }) => availability);
  }

  // Allot / Change room
  async allotRoom(roomCode: string, student: string, resident: boolean = false) {
    const blockDetails = await this.blockDetailsByRoomCode(roomCode);
    if (!blockDetails._id) throw ErrorResponses.noDataFound("block");
    await this.getRoomAvailability(roomCode);
    return await this.updateRoomByCode(blockDetails._id, roomCode, {
      $set: { "rooms.$.student": new Types.ObjectId(student), "rooms.$.availability": false },
      $inc: { occupancy: resident ? 0 : 1 },
    });
  }

  // Vacate room by room code
  async vacateRoom(roomCode: string, resident: boolean = false) {
    const blockDetails = await this.blockDetailsByRoomCode(roomCode);
    if (!blockDetails._id) throw ErrorResponses.noDataFound("block");
    return await this.vacateRoomByCode(blockDetails._id, roomCode, resident);
  }

  // Change room of student
  async reassignStudent(oldRoomCode: string, newRoomCode: string) {
    if (oldRoomCode === newRoomCode)
      return ErrorResponses.customError("Invalid ressignment of student");
    await this.getRoomAvailability(newRoomCode);
    const { student } = await this.roomDetails(oldRoomCode);
    await this.vacateRoom(oldRoomCode, true);
    return await this.allotRoom(newRoomCode, student, true);
  }

  // Total occupancy
  async hostelOccupancy(): Promise<{
    _id: null;
    occupancy: number;
    totalRooms: number;
    availableRooms: number;
  } | null> {
    try {
      return await this.totalOccupancy();
    } catch (error) {
      throw ErrorResponses.customError("Error fetching statistics");
    }
  }
}
