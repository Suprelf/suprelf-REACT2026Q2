export const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

export const isValidImageType = (file: File) => {
  return file.type === 'image/png' || file.type === 'image/jpeg';
};

export const isValidImageSize = (file: File) => {
  return file.size <= MAX_IMAGE_SIZE;
};

export const validateImageFile = (file: File) => {
  if (!isValidImageType(file)) {
    return 'Only PNG or JPEG allowed';
  }

  if (!isValidImageSize(file)) {
    return 'Image must be less than 2MB';
  }

  return null;
};