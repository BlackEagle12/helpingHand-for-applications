import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Dialog, Transition } from "@headlessui/react";
import "./App.css";

const App = () => {
	// State variables for counts and job details
	const [interestedCount, setInterestedCount] = useState(0);
	const [notInterestedCount, setNotInterestedCount] = useState(0);
	const [notVisitedCount, setNotVisitedCount] = useState(0);
	const [ids, setIds] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [jobDetail, setJobDetail] = useState(null);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [tempToggleValues, setTempToggleValues] = useState({
		isApplicationSubmitted: false,
		isRefralMessageSent: false,
		isIntrested: false,
	});

	// Fetch job IDs on component mount
	useEffect(() => {
		fetchIds();
	}, []);

	// Fetch all job IDs from the server
	const fetchIds = async () => {
		try {
			const response = await axios.get("http://localhost:3000/jobDetails/ids");
			setIds(response.data);
			if (response.data.length > 0) {
				fetchJobDetail(response.data[0]._id);
			}
		} catch (error) {
			console.error("Error fetching IDs:", error);
		}
	};

	// Fetch job details for a specific job ID
	const fetchJobDetail = async (id) => {
		try {
			const response = await axios.get(
				`http://localhost:3000/jobDetails/${id}`
			);
			setJobDetail(response.data);
			setTempToggleValues({
				isApplicationSubmitted: response.data.isApplicationSubmitted,
				isRefralMessageSent: response.data.isRefralMessageSent,
				isIntrested: response.data.isIntrested,
			});
			// Fetch counts
			const interestedCount = await axios.get(
				`http://localhost:3000/jobDetails/interested`
			);
			setInterestedCount(interestedCount.data);
			const notInterestedCount = await axios.get(
				`http://localhost:3000/jobDetails/notinterested`
			);
			setNotInterestedCount(notInterestedCount.data);
			const notVisitedCount = await axios.get(
				`http://localhost:3000/jobDetails/notvisited`
			);
			setNotVisitedCount(notVisitedCount.data);
		} catch (error) {
			console.error("Error fetching job detail:", error);
		}
	};

	// Handle navigation to the next job detail
	const handleNext = async () => {
		const nextIndex = currentIndex + 1;
		if (nextIndex < ids.length) {
			const nextId = ids[nextIndex]._id;
			try {
				await axios.put(`http://localhost:3000/jobDetails/${jobDetail._id}`, {
					...jobDetail,
					isVisited: true,
				});
				setCurrentIndex(nextIndex);
				fetchJobDetail(nextId);
			} catch (error) {
				console.error("Error updating isVisited:", error);
				toast.error("Failed to update isVisited.", {
					position: "bottom-right",
				});
			}
		}
	};

	// Handle navigation to the previous job detail
	const handlePrevious = () => {
		const prevIndex = currentIndex - 1;
		if (prevIndex >= 0) {
			setCurrentIndex(prevIndex);
			fetchJobDetail(ids[prevIndex]._id);
		}
	};

	// Handle toggle switch changes
	const handleToggleChange = (field) => {
		setTempToggleValues((prevValues) => ({
			...prevValues,
			[field]: !prevValues[field],
		}));
		setIsDialogOpen(true);
	};

	// Confirm toggle changes and save to the server
	const confirmToggleChange = async () => {
		try {
			const updatedDetail = { ...jobDetail, ...tempToggleValues };
			await axios.put(
				`http://localhost:3000/jobDetails/${jobDetail._id}`,
				updatedDetail
			);
			setJobDetail(updatedDetail);
			toast.success("Changes saved successfully!", {
				position: "bottom-right",
			});
		} catch (error) {
			console.error("Error saving changes:", error);
			toast.error("Failed to save changes.", { position: "bottom-right" });
		}
		setIsDialogOpen(false);
	};

	// Handle filter change to show different job statuses
	const handleFilterChange = async (event) => {
		const filterValue = event.target.value;
		try {
			const response = await axios.get(
				`http://localhost:3000/jobDetails/ids?visited=${filterValue}`
			);
			setIds(response.data);
			if (response.data.length > 0) {
				setCurrentIndex(0);
				fetchJobDetail(response.data[0]._id);
			} else {
				setJobDetail(null);
			}
		} catch (error) {
			console.error("Error applying filter:", error);
		}
	};

	return (
		<div className="min-h-screen bg-purple-900 bg-gradient-to-b from-gray-900 via-gray-900 to-purple-800 p-4 text-white">
			{/* Filter dropdown */}
			<div className="flex justify-center mb-4">
				<select
					className="p-2 rounded bg-purple-600 text-white"
					onChange={handleFilterChange}
				>
					<option value="">Show All</option>
					<option value="true">Show Visited Only</option>
					<option value="false">Show Not Visited Only</option>
				</select>
			</div>

			{/* Job counts */}
			<div className="flex justify-around mb-4">
				<p className="my-2">
					<span className="font-bold">Interested: </span>
					{interestedCount}
				</p>
				<p className="my-2">
					<span className="font-bold">Not Interested: </span>
					{notInterestedCount}
				</p>
				<p className="my-2">
					<span className="font-bold">Not Visited: </span>
					{notVisitedCount}
				</p>
			</div>

			{/* Job details card */}
			{jobDetail ? (
				<div className="card max-w-lg mx-auto p-10 rounded shadow-lg bg-opacity-20 bg-gray-800">
					<div className="flex items-center mb-4">
						<img
							src={jobDetail.Company.CompanyLogoUrl}
							alt="Company Logo"
							className="h-24 w-24 rounded-full mr-4"
						/>
						<div>
							<h3 className="text-2xl font-bold underline">
								<a
									href={jobDetail.Job.LinkedInPostUrl}
									target="_blank"
									rel="noopener noreferrer"
								>
									{jobDetail.Job.JobTitle}
								</a>
							</h3>
							<h2 className="font-bold">{jobDetail.Company.CompanyName}</h2>
							<p>{jobDetail.Job.Location}</p>
						</div>
					</div>

					{/* Job details */}
					<div className="my-4">
						<p className="my-2">
							<span className="font-bold">PostTime: </span>
							{jobDetail.Job.PostTime}
						</p>
						<p className="my-2">
							<span className="font-bold">TotalApplicant: </span>
							{jobDetail.Job.TotalApplicant}
						</p>
						<p className="my-2">
							<span className="font-bold">JobRemotType: </span>
							{jobDetail.Job.JobRemotType}
						</p>
						<p className="my-2">
							<span className="font-bold">JobType: </span>
							{jobDetail.Job.JobType}
						</p>
					</div>

					{/* Toggle switches */}
					<div className="mb-4 flex flex-col">
						{[
							{ label: "Easy Apply", field: "Job.IsEasyApply", readOnly: true },
							{
								label: "Application Submitted",
								field: "isApplicationSubmitted",
							},
							{ label: "Referral Message Sent", field: "isRefralMessageSent" },
							{ label: "Interested", field: "isIntrested" },
							{
								label: "Member Fetched",
								field: "isMenberFerched",
								readOnly: true,
							},
							{ label: "Visited", field: "isVisited", readOnly: true },
						].map((toggle) => (
							<label key={toggle.field}>
								{toggle.label}
								<label className="switch">
									<input
										className="my-2"
										type="checkbox"
										checked={jobDetail[toggle.field]}
										onChange={
											!toggle.readOnly
												? () => handleToggleChange(toggle.field)
												: undefined
										}
										readOnly={toggle.readOnly}
									/>
									<span className="slider"></span>
								</label>
							</label>
						))}
					</div>

					{/* Navigation buttons */}
					<div className="flex justify-between mt-4">
						<button
							className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
							onClick={handlePrevious}
							disabled={currentIndex === 0}
						>
							Previous
						</button>
						<button
							className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
							onClick={handleNext}
							disabled={currentIndex === ids.length - 1}
						>
							Next
						</button>
					</div>
				</div>
			) : (
				<p className="text-center">No job details available.</p>
			)}

			{/* Toast notifications */}
			<ToastContainer />

			{/* Confirmation dialog */}
			<Transition appear show={isDialogOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setIsDialogOpen(false)}
				>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black bg-opacity-25" />
					</Transition.Child>
					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
									<Dialog.Title
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900"
									>
										Confirm Change
									</Dialog.Title>
									<div className="mt-2">
										<p className="text-sm text-gray-500">
											Are you sure you want to save this change?
										</p>
									</div>
									<div className="mt-4 flex justify-end space-x-4">
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-purple-500 px-4 py-2 text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-purple-500"
											onClick={confirmToggleChange}
										>
											Yes
										</button>
										<button
											type="button"
											className="inline-flex justify-center rounded-md border border-transparent bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
											onClick={() => setIsDialogOpen(false)}
										>
											No
										</button>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
};

export default App;
