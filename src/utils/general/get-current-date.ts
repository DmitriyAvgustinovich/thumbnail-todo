export const getCurrentDate = () => {
  const currentDate = new Date();

  const dayOfWeek = currentDate.toLocaleString("en-US", { weekday: "long" });

  const formattedDate = currentDate
    .toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .replace(/\//g, "/");

  return { dayOfWeek, formattedDate };
};
