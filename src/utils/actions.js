export const FindAccountLabel = (account) => {
  if (!account?.attributes?.account_type?.data?.attributes?.Name) {
    return 'Undefined';
  }

  return account.attributes.account_type.data.attributes.Name === "Association"
    ? account.attributes.associations.data[0]?.attributes?.Name
    : account.attributes.clubs.data[0]?.attributes?.Name;
};



export const DateFromTo = (createdAt) =>{
  const dateOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  const currentDate = new Date(createdAt);
  const pastDate = new Date(createdAt);
  pastDate.setDate(currentDate.getDate() - 7);

  const formattedCurrentDate = currentDate.toLocaleDateString('en-US', dateOptions);
  const formattedPastDate = pastDate.toLocaleDateString('en-US', dateOptions);

  return `${formattedPastDate} - ${formattedCurrentDate}`;
}
