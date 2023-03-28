// Trimming string

export const trimmer = (data: any) => {
  let trimmedData = data;
  for (const key in trimmedData) {
    if (typeof data[key] === "string") data[key].trim();
  }
  return trimmedData;
};
