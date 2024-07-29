const express = require("express");
const router = express.Router();
const JobDetail = require("../Models/jobDetail/JobDetail.Model");
//add initial Data
// router.post("/all", async (req, res) => {
// 	let successCount = 0;
// 	let errorCount = 0;
// 	let dublicateCount = 0;
// 	for (const jobDetail of initialJobDetailList) {
// 		try {
// 			const alreadyExist = await JobDetail.findOne({
// 				"Job.LinkedInPostUrl": jobDetail.Job.LinkedInPostUrl,
// 			});
// 			if (!alreadyExist) {
// 				const newJobDetail = new JobDetail(jobDetail);
// 				await newJobDetail.save();
// 				successCount++;
// 			} else {
// 				dublicateCount++;
// 			}
// 		} catch (error) {
// 			console.log("error:", error);
// 			errorCount++;
// 		}
// 	}
// 	res.status(200).json({
// 		successCount: successCount,
// 		errorCount: errorCount,
// 		dublicateCount: dublicateCount,
// 	});
// });

// //delete all data
// router.delete("/all", async (req, res) => {
// 	try {
// 		const deletedJobDetail = await JobDetail.deleteMany();
// 		res.json({ message: "Company data deleted successfully" });
// 	} catch (error) {
// 		res.status(500).json({ error: error.message });
// 	}
// });

// Read all data
router.get("/", async (req, res) => {
	try {
		const jobDetail = await JobDetail.find();
		res.json(jobDetail);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Fetch all IDs
router.get("/ids", async (req, res) => {
	try {
		const visited =
			req.query.visited === "true"
				? true
				: req.query.visited === "false"
				? false
				: null;
		let query = {};
		if (visited !== null) {
			query.isVisited = visited;
		}
		const ids = await JobDetail.find(query).select("_id");
		res.json(ids);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/interested", async (req, res) => {
	try {
		let query = {};
		query.isIntrested = true;

		const count = await JobDetail.countDocuments(query);
		res.json(count);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/notinterested", async (req, res) => {
	try {
		let query = {};
		query.isIntrested = false;
		query.isVisited = true;

		const count = await JobDetail.countDocuments(query);
		res.json(count);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

router.get("/notvisited", async (req, res) => {
	try {
		let query = {};
		query.isVisited = false;

		const count = await JobDetail.countDocuments(query);
		res.json(count);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// Read a single item by ID
router.get("/:id", async (req, res) => {
	try {
		const jobDetail = await JobDetail.findById(req.params.id);
		if (!jobDetail) {
			return res.status(404).json({ message: "Company data not found" });
		}
		res.json(jobDetail);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Create new data
router.post("/", async (req, res) => {
	try {
		const newJobDetail = new JobDetail(req.body);
		const savedJobDetail = await newJobDetail.save();
		res.status(201).json(savedJobDetail);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Update existing data
router.put("/:id", async (req, res) => {
	try {
		const updatedJobDetail = await JobDetail.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedJobDetail) {
			return res.status(404).json({ message: "Company data not found" });
		}
		res.json(updatedJobDetail);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});

// Delete data
router.delete("/:id", async (req, res) => {
	try {
		const deletedJobDetail = await JobDetail.findByIdAndDelete(req.params.id);
		if (!deletedJobDetail) {
			return res.status(404).json({ message: "Company data not found" });
		}
		res.json({ message: "Company data deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

router.get("/getcount", async (req, res) => {
	try {
		console.log("came");
		let count = await JobDetail.countDocuments();
		res.status(200).json(count.toString());
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
});
module.exports = router;
