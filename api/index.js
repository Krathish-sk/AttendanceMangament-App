import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import moment from "moment";

import connectDB from "./connectDB.js";
import Employee from "./model/employee.js";
import Attendance from "./model/attendance.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const url = process.env.MOONGODB_URL;
// Connect to MongoDB
await connectDB(url);

// Connecting server to port
const connectToPort = function () {
  app.listen(port, () => {
    console.log("Server running at port", port);
  });
};

connectToPort();

// endpoint to register an user
app.post("/addEmployee", async (req, res) => {
  try {
    const {
      employeeName,
      employeeId,
      designation,
      joiningDate,
      dateOfBirth,
      phoneNumber,
      address,
      activeEmployee,
      salary,
    } = req.body;

    // create a new employee
    const newEmployee = new Employee({
      employeeName,
      employeeId,
      designation,
      joiningDate,
      dateOfBirth,
      phoneNumber,
      address,
      activeEmployee,
      salary,
    });

    await newEmployee.save();
    res
      .status(200)
      .json({ message: "Employee added successfully", employee: newEmployee });
  } catch (error) {
    console.log("Error creating an employee", error);
    res.status(500).json({ message: "Failed to add an employee" });
  }
});

// endpoint to get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve the employees" });
  }
});

// endpoint to update attendance status
app.post("/attendance", async (req, res) => {
  const { employeeId, employeeName, status, date } = req.body.attendanceData;

  const exsitingAttendance = await Attendance.findOne({ employeeId, date });

  try {
    if (exsitingAttendance) {
      exsitingAttendance.status = status;
      await exsitingAttendance.save();
      res.status(200).json(exsitingAttendance);
    } else {
      const newAttendance = await Attendance({
        employeeId,
        employeeName,
        status,
        date,
      });

      await newAttendance.save();
      res.status(200).json({ newAttendance });
    }
  } catch (error) {
    res.status(500).json({ message: "Error submitting the attendance" });
  }
});

// endpoint for getting the attendance of an user
app.get("/attendance", async (req, res) => {
  try {
    const { date } = req.query;
    const attendanceData = await Attendance.find({ date });
    res.status(200).json({ attendanceData });
  } catch (error) {
    res.status(500).json({ mesage: "Failed to fetch the attendance" });
  }
});

// endpoint for getting the attendance reports of all employees
app.get("/attendance-report-all-employees", async (req, res) => {
  try {
    const { month, year } = req.query;

    // Calculate the start and end dates for the selected month and year
    const startDate = moment(`${year}-${month}-01`, "YYYY-MM-DD")
      .startOf("month")
      .toDate();
    const endDate = moment(startDate).endOf("month").toDate();

    // Aggregate attendance data for all employees and date range
    const report = await Attendance.aggregate([
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: [
                  { $month: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.month),
                ],
              },
              {
                $eq: [
                  { $year: { $dateFromString: { dateString: "$date" } } },
                  parseInt(req.query.year),
                ],
              },
            ],
          },
        },
      },

      {
        $group: {
          _id: "$employeeId",
          present: {
            $sum: {
              $cond: { if: { $eq: ["$status", "present"] }, then: 1, else: 0 },
            },
          },
          absent: {
            $sum: {
              $cond: { if: { $eq: ["$status", "absent"] }, then: 1, else: 0 },
            },
          },
          halfday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "halfday"] }, then: 1, else: 0 },
            },
          },
          holiday: {
            $sum: {
              $cond: { if: { $eq: ["$status", "holiday"] }, then: 1, else: 0 },
            },
          },
        },
      },
      {
        $lookup: {
          from: "employees", // Name of the employee collection
          localField: "_id",
          foreignField: "employeeId",
          as: "employeeDetails",
        },
      },
      {
        $unwind: "$employeeDetails", // Unwind the employeeDetails array
      },
      {
        $project: {
          _id: 1,
          present: 1,
          absent: 1,
          halfday: 1,
          name: "$employeeDetails.employeeName",
          designation: "$employeeDetails.designation",
          salary: "$employeeDetails.salary",
          employeeId: "$employeeDetails.employeeId",
        },
      },
    ]);

    res.status(200).json({ report });
  } catch (error) {
    console.error("Error generating attendance report:", error);
    res.status(500).json({ message: "Error generating the report" });
  }
});
