const CheckDeadlineAvailability = (deadline: string): boolean => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    return currentDate <= deadlineDate;
}

export default CheckDeadlineAvailability;