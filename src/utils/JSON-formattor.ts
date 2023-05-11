// Structuring JSON data to be sent

export const dataFormattor = (data: any) => {
  // Adding length property to JSON for Array
  const status = "success";
  if (data instanceof Array) {
    return {
      status,
      count: data.length,
      data,
    };
  } else if (typeof data === "string" || typeof data === "number") {
    return {
      status,
      message: data,
    };
  } else {
    return {
      status,
      data,
    };
  }
};
