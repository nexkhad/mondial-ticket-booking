export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return hashHex;
};

export const jsToFormData = (data: any) => {
  const formData = new FormData();
  
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      if (typeof value === 'object' && value !== null && !(value instanceof File)) {
        // Convert objects and arrays to JSON strings
        formData.append(key, JSON.stringify(value));
      } else if (typeof value === 'boolean') {
        // Convert booleans to string "true" or "false"
        formData.append(key, value.toString());
      } else if (typeof value === 'number') {
        // Append numbers directly
        formData.append(key, value.toFixed(2));
      } else {
        // Append other types (string, File, etc.) directly
        formData.append(key, value);
      }
    }
  }

  return formData;
};

