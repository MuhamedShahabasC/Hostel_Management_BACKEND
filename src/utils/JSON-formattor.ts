// Structuring JSON data to be sent

export const dataFormattor = (data: any) => {
  // Adding length property to JSON for Array
  if (data instanceof Array) {
    return {
      status: "success",
      count: data.length,
      data,
    };
  } else {
    // if (!data) {
    //   return {
    //     status: "success",
    //     data: false,
    //   };
    // }
    return {
      status: "success",
      data,
    };
  }
};
