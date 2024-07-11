export function formDataToJson(formData: FormData): { [key: string]: any } {
    const jsonObject: { [key: string]: any } = {};
  
    formData.forEach((value, key) => {
      if (jsonObject[key]) {
        if (!Array.isArray(jsonObject[key])) {
          jsonObject[key] = [jsonObject[key]];
        }
        jsonObject[key].push(value);
      } else {
        jsonObject[key] = value;
      }
    });
  
    return jsonObject;
  }