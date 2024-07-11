import { Request, Response, NextFunction } from "express";

export const validateHotelData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors: { [key: string]: string } = {};
  const { imageUrls } = req.body;
  const imageFiles = req.files as Express.Multer.File[];

  const bodyFields = {
    name: "Name is required",
    city: "City is required",
    country: "Country is required",
    description: "Description is required",
    starRating: "Star rating is required",
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
