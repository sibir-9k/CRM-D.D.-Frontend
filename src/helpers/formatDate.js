export function formatDate(dateCreated, dateEdited) {
	const months = [
		'янв',
		'фев',
		'мар',
		'апр',
		'май',
		'июн',
		'июл',
		'авг',
		'сен',
		'окт',
		'ноя',
		'дек',
	];
	const dayOfWeek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

	const formattedDateCreated = `${dateCreated.getDate()} ${
		months[dateCreated.getMonth()]
	} ${dateCreated.getFullYear()} в ${dateCreated.getHours()}:${dateCreated
		.getMinutes()
		.toString()
		.padStart(2, '0')}`;
	const formattedDateEdited = dateEdited
		? `${dateEdited.getDate()} ${
				months[dateEdited.getMonth()]
		  } ${dateEdited.getFullYear()} в ${dateEdited.getHours()}:${dateEdited
				.getMinutes()
				.toString()
				.padStart(2, '0')}`
		: null;

	return {
		formattedDate: formattedDateCreated,
		formattedDateEdited,
	};
}
