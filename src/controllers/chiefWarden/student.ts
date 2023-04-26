import asyncHandler from "express-async-handler";
import { dataFormattor } from "../../utils/JSON-formattor";
import { StudentService } from "../../services/student";
import { BlockService } from "../../services/block";
import { StudentStatus } from "../../interfaces/student";
import ErrorResponses from "../../error/ErrorResponses";
import { presetMailTemplates, sendMail } from "../../utils/sendMail";

// Services
const studentService = new StudentService();
const roomService = new BlockService();

// Get all students data
export const allStudentsData = asyncHandler(async (req, res) => {
  const allStudentsData = await studentService.allStudentsData();
  res.json(dataFormattor(allStudentsData));
});

// Update single student room and status
export const updateSingleStudent = asyncHandler(async (req, res) => {
  switch (req.body.status as StudentStatus) {
    case "resident":
      if (req.body.oldStatus === "pending" || req.body.oldStatus === "resident") {
        if (req.body.oldStatus === "pending") {
          await roomService.allotRoom(req.body.room, req.params._id);
          sendMail(presetMailTemplates.newAdmission(req.body.student, req.body.room));
        }
        if (req.body.oldStatus === "resident") {
          await roomService.reassignStudent(req.body.oldRoom, req.body.room);
          sendMail(presetMailTemplates.roomUpdated(req.body.student, req.body.room));
        }
        await studentService.updateSingleStudent(req.params._id, req.body);
      } else {
        throw ErrorResponses.customError("Student must be pending or a resident");
      }
      break;
    case "rejected":
      if (req.body.oldStatus === "pending") {
        await studentService.updateSingleStudent(req.params._id, req.body);
        sendMail(presetMailTemplates.rejectedAdmission(req.body.student));
      } else {
        throw ErrorResponses.customError("Only pending students can be rejected");
      }
      break;
    case "departed":
      if (req.body.oldStatus === "resident") {
        {
          await roomService.vacateRoom(req.body.oldRoom);
          delete req.body.room;
          await studentService.updateSingleStudent(req.params._id, req.body);
          sendMail(presetMailTemplates.departedStudent(req.body.student));
        }
      } else {
        throw ErrorResponses.customError("Only resident students can depart");
      }
      break;
    case "pending" || "default":
      throw ErrorResponses.customError("Change status from default");
  }
  res.json(dataFormattor("Student updated"));
});
