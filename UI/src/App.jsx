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
		companymembers: [], // Added companymembers to tempToggleValues
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
				companymembers:
					response.data.companymembers.map((member) => {
						return { ...member };
					}) || [],
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
		// Extract index and property from field
		const [baseField, index, property] = field
			.split(/[\[\].]+/)
			.filter(Boolean);

		if (baseField === "companymembers" && index !== undefined && property) {
			setTempToggleValues((prevValues) => {
				// Deep clone jobDetail to avoid mutating the state directly

				// Update the specific company member's property
				prevValues.companymembers[index][property] =
					!prevValues.companymembers[index][property];

				return {
					...prevValues,
				};
			});

			// Open the dialog
			setIsDialogOpen(true);
		} else {
			setTempToggleValues((prevValues) => ({
				...prevValues,
				[field]: !prevValues[field],
			}));
			setIsDialogOpen(true);
		}
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
		const queryObject = JSON.parse(event.target.value);
		console.log(queryObject);
		let query = "";
		if (queryObject.visited != null) {
			query += `visited=${queryObject.visited}`;
		}
		if (queryObject.interested != null) {
			query += `&interested=${queryObject.interested}`;
		}

		try {
			const response = await axios.get(
				`http://localhost:3000/jobDetails/ids?${query}`
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
					<option value={JSON.stringify({ visited: null, interested: null })}>
						Show All
					</option>
					<option value={JSON.stringify({ visited: true, interested: null })}>
						Show Visited Only
					</option>
					<option value={JSON.stringify({ visited: false, interested: null })}>
						Show Not Visited Only
					</option>
					<option value={JSON.stringify({ visited: true, interested: true })}>
						Show interested Only
					</option>
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
				<div className="card w-[90%] mx-auto p-10 rounded shadow-lg bg-opacity-20 bg-gray-800">
					<div className="flex w-full justify-between flex-wrap">
						<div className="w-[40%]">
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
									{
										label: "Application Submitted",
										field: "isApplicationSubmitted",
									},
									{
										label: "Referral Message Sent",
										field: "isRefralMessageSent",
									},
									{ label: "Interested", field: "isIntrested" },
									{ label: "Visited", field: "isVisited", readOnly: true },
								].map(({ label, field, readOnly }, index) => (
									<label key={index} className="flex items-center my-2">
										<span className="mr-2">{label}</span>
										<label className="switch">
											<input
												type="checkbox"
												checked={jobDetail[field]}
												onChange={() => handleToggleChange(field)}
												disabled={readOnly}
											/>
											<span className="slider"></span>
										</label>
									</label>
								))}
							</div>
						</div>

						<div className="w-[60%]">
							{/* Company members */}
							<h3 className="text-lg font-bold mb-2">Company Members</h3>
							{jobDetail.companymembers && (
								<div className="flex gap-10 flex-wrap justify-between ">
									{jobDetail.companymembers.map((member, index) => (
										<div
											key={member._id}
											className="p-3 border rounded min-w-[250px]"
										>
											<div className="flex items-center my-1 gap-2">
												<svg
													class="h-8 w-8 text-violet-700"
													fill="none"
													viewBox="0 0 24 24"
													stroke="currentColor"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
													/>
												</svg>

												<span className="mr-2">
													<a
														href={member.memberProfileUrl}
														target="_blank"
														rel="noopener noreferrer"
														className="underline"
													>
														{member.memberName}
													</a>
												</span>
											</div>
											<div className="flex items-center my-1 gap-2 justify-between">
												copy messgae
												<svg
													class="h-6 w-6 text-violet-700 cursor-pointer mx-3 hover"
													width="24"
													height="24"
													viewBox="0 0 24 24"
													stroke-width="2"
													stroke="currentColor"
													fill="none"
													stroke-linecap="round"
													stroke-linejoin="round"
													onClick={() => {
														navigator.clipboard.writeText(
															`Hi ${member.memberName},\nI hope you're well. Noticed we work in the same industry and would love to connect. I found an exciting opening for ${jobDetail.Job.JobTitle} at ${jobDetail.Company.CompanyName}. I believe I'd be a great fit. Could you refer me for the same?`
														);
														toast.success("Message copied to clipboard!", {
															position: "bottom-right",
														});
													}}
												>
													{" "}
													<path stroke="none" d="M0 0h24v24H0z" />{" "}
													<rect x="8" y="8" width="12" height="12" rx="2" />{" "}
													<path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2" />
												</svg>
											</div>
											<label className="flex items-center my-1 justify-between">
												Is used for refral
												<label className="switch">
													<input
														type="checkbox"
														checked={member.IsInvitationSent}
														onChange={() =>
															handleToggleChange(
																`companymembers[${index}].IsInvitationSent`
															)
														}
													/>
													<span className="slider"></span>
												</label>
											</label>
										</div>
									))}
								</div>
							)}
						</div>
					</div>

					{/* Navigation buttons */}
					<div className="flex justify-between my-4">
						<button
							onClick={handlePrevious}
							className="px-4 py-2 bg-purple-600 rounded"
							disabled={currentIndex === 0}
						>
							Previous
						</button>
						<button
							onClick={handleNext}
							className="px-4 py-2 bg-purple-600 rounded"
							disabled={currentIndex === ids.length - 1}
						>
							Next
						</button>
					</div>
				</div>
			) : (
				<p className="text-center">No job details available.</p>
			)}

			{/* Dialog for confirmation */}
			<Transition appear show={isDialogOpen} as={Fragment}>
				<Dialog
					as="div"
					className="relative z-10"
					onClose={() => setIsDialogOpen(false)}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
					</Transition.Child>
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Transition.Child
							as={Fragment}
							enter="transition-transform ease-out duration-300"
							enterFrom="translate-y-4 opacity-0"
							enterTo="translate-y-0 opacity-100"
							leave="transition-transform ease-in duration-200"
							leaveFrom="translate-y-0 opacity-100"
							leaveTo="translate-y-4 opacity-0"
						>
							<Dialog.Panel className="max-w-sm dialog-panel">
								<Dialog.Title as="h3" className="text-lg font-bold mb-4">
									Confirm Changes
								</Dialog.Title>
								<p className="mb-4">
									Are you sure you want to apply these changes?
								</p>
								<div className="flex justify-end space-x-4">
									<button
										type="button"
										className="dialog-button cancel"
										onClick={() => setIsDialogOpen(false)}
									>
										Cancel
									</button>
									<button
										type="button"
										className="dialog-button"
										onClick={confirmToggleChange}
									>
										Confirm
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>

			<ToastContainer />
		</div>
	);
};

export default App;
