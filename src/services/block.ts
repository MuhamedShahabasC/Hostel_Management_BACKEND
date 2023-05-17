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
    if (!/[A-Z]\d{2}/g.test(code)) throw ErrorResponses.customError("Invalid room");
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
    const blockDetails = await this.findOneAndPopulate(
      { _id },
      { path: "rooms.student", select: "name email" }
    );
    if (!blockDetails) throw ErrorResponses.noDataFound("block");
    return blockDetails;
  }

  // Block details by Name
  async blockDetailsByName(BlockName: string): Promise<IBlock> {
    const blockDetails = await this.findOneAndPopulate(
      { code: BlockName[0] },
      { path: "rooms.student", select: "name email" }
    );
    if (!blockDetails) throw ErrorResponses.noDataFound("block");
    return blockDetails;
  }

  // Block details by Room Code
  async blockDetailsByRoomCode(roomCode: string): Promise<IBlock> {
    if (!/[A-Z]\d{2}/g.test(roomCode)) throw ErrorResponses.customError("Invalid room");
    const blockDetails = await this.findOneAndPopulate(
      { code: roomCode[0] },
      { path: "rooms.student", select: "name email" }
    );
    if (!blockDetails) throw ErrorResponses.noDataFound("block");
    return blockDetails;
  }

  // Fetch a room details
  async roomDetails(roomCode: string) {
    if (!/[A-Z]\d{2}/g.test(roomCode)) throw ErrorResponses.customError("Invalid room");
    const blockDetails = await this.blockDetailsByRoomCode(roomCode);
    const roomDetails = blockDetails?.rooms?.find((room: IRoom) => room.code === roomCode);
    if (!roomDetails) throw ErrorResponses.noDataFound("room");
    return roomDetails;
  }

  // Get room availability
  async getRoomAvailability(roomCode: string): Promise<boolean> {
    if (!/[A-Z]\d{2}/g.test(roomCode)) throw ErrorResponses.customError("Invalid room");
    const roomDetails = await this.roomDetails(roomCode);
    return roomDetails.availability;
  }

  // Available rooms
  async availableRooms(blockId: string): Promise<IRoom[]> {
    const blockDetails = await this.blockDetailsById(blockId);
    return blockDetails.rooms.filter(({ availability }) => availability);
  }

  // Allot / Change room
  async allotRoom(roomCode: string, student: string, resident: boolean = false) {
    if (!/[A-Z]\d{2}/g.test(roomCode)) throw ErrorResponses.customError("Invalid room");
    const blockDetails = await this.blockDetailsByRoomCode(roomCode);
    if (!blockDetails._id) throw ErrorResponses.noDataFound("block");
    const availability = await this.getRoomAvailability(roomCode);
    if (!availability) throw ErrorResponses.customError("unavailable room");
    return await this.updateRoomByBlockId(blockDetails._id, roomCode, {
      $set: { "rooms.$.student": new Types.ObjectId(student), "rooms.$.availability": false },
      $inc: { occupancy: resident ? 0 : 1 },
    });
  }

  // Vacate room by room code
  async vacateRoom(roomCode: string, resident: boolean = false) {
    if (!/[A-Z]\d{2}/g.test(roomCode)) throw ErrorResponses.customError("Invalid room");
    const blockDetails = await this.blockDetailsByRoomCode(roomCode);
    if (!blockDetails._id) throw ErrorResponses.noDataFound("block");
    return await this.vacateRoomByCode(blockDetails._id, roomCode, resident);
  }

  // Change room of student
  async reassignStudent(oldRoomCode: string, newRoomCode: string) {
    if (!/[A-Z]\d{2}/g.test(oldRoomCode) || !/[A-Z]\d{2}/g.test(newRoomCode))
      throw ErrorResponses.customError("Invalid room");
    if (oldRoomCode === newRoomCode)
      return ErrorResponses.customError("Invalid ressignment of student");
    const availability = await this.getRoomAvailability(newRoomCode);
    if (!availability) throw ErrorResponses.customError("unavailable room");
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

  // Change availability of room
  async changeRoomAvailability(roomCode: string) {
    if (!/[A-Z]\d{2}/g.test(roomCode)) throw ErrorResponses.customError("Invalid room");
    const availability = await this.getRoomAvailability(roomCode);
    return await this.updateRoomByCode(roomCode, { "rooms.$.availability": !availability });
  }

  // // Hostel occupancy statistics
  // async hostelOccupancyStatistics(){
    
  // }
}
