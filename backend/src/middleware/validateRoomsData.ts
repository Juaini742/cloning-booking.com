import { NextFunction, Request, Response } from "express";

export const validateRoomsData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: { [key: string]: string } = {};
  const { imageUrls } = req.body;
  const imageFiles = req.files as Express.Multer.File[];

  const bodyFields = {
    roomNumber: "room number is required",
    type: "room type is required",
    pricePerNight: "room price per night is required",
    adultCount: "room adult count is required",
    childCount: "room child count is required",
    facilities: "room facilities are required",
    description: "room description is required",
    imageUrls: "Image URLs are required",
  };

  const fileFields = {
    imageFiles: "Image files are required",
  };

  for (const [field, message] of Object.entries(bodyFields)) {
    if (
      !req.body[field] ||
      (field === "imageUrls" && (!imageUrls || imageUrls.length === 0))
    ) {
      errors[field] = message;
    }
  }
  for (const [field, message] of Object.entries(fileFields)) {
    if (!imageFiles || imageFiles.length === 0) {
      errors[field] = message;
    }
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: "Validation errors", errors });
  }

  next();
};
