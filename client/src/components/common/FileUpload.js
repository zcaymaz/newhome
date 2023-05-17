import React, { useRef, useState } from "react";

function ImageUpload({ onFilesUpload }) {
	const [dragging, setDragging] = useState(false);

	const [imagePreviews, setImagePreviews] = useState([]);

	const fileInputRef = useRef(null);

	const handleDragEnter = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);
	};

	const handleDragOver = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	const handleDrop = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setDragging(false);
		const { files } = e.dataTransfer;

		onFilesUpload(files);
		const previews = Array.from(files).map((file) => URL.createObjectURL(file));

		setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
	};

	const handleInputChange = (e) => {
		const { files } = e.target;

		if (files != null) {
			onFilesUpload(files);
			const previews = Array.from(files).map((file) =>
				URL.createObjectURL(file),
			);

			setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
		}
	};

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "center",
				height: "100%",
				width: "100%",
				gap: "1rem",
			}}
		>
			<div
				className={`image-upload-container${dragging ? " dragging" : ""}`}
				onClick={() => fileInputRef.current?.click()}
				onDragEnter={handleDragEnter}
				onDragLeave={handleDragLeave}
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				<input
					multiple
					accept="image/*"
					onChange={handleInputChange}
					ref={fileInputRef}
					style={{ display: "none" }}
					type="file"
				/>
				<p>Drag and drop image files here or click to select files.</p>
			</div>
			<button
				onClick={() => {
					setImagePreviews([]);
				}}
			>
				Remove all
			</button>
			{imagePreviews.length > 0 ? (
				<div className="image-preview">
					{imagePreviews.map((preview) => (
						<div key={preview}>
							<button
								onClick={() => {
									setImagePreviews((prevPreviews) =>
										prevPreviews.filter((prev) => prev !== preview),
									);
								}}
							>
								Delete
							</button>
							<img
								alt="Preview"
								key={preview}
								src={preview}
								style={{
									width: "150px",
									height: "100%",
								}}
							/>
						</div>
					))}
				</div>
			) : null}
		</div>
	);
}

export default ImageUpload;