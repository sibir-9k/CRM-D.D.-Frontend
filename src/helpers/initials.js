export const initialUsers = (fullName) => {
	let words = fullName.split(' ').filter((word) => word);
	return words.map((word) => word.charAt(0)).join('');
};
