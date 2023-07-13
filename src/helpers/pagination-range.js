export const PaginationRange = (currentPage, totalPage) => {
	let allPages = [];

	if (totalPage <= 7) {
		for (let i = 1; i <= totalPage; i++) {
			allPages.push(i);
		}
		return allPages;
	}

	if (currentPage < 5) {
		for (let i = 1; i <= 5; i++) {
			allPages.push(i);
		}
		allPages.push('...');
		allPages.push(totalPage);
		return allPages;
	}

	if (currentPage > totalPage - 4) {
		allPages.push(1);
	
		allPages.push('...');
		for (let i = totalPage - 4; i <= totalPage; i++) {
			allPages.push(i);
		}
		return allPages;
	}

	allPages.push(1);
	allPages.push('...');
	allPages.push(currentPage - 1);
	allPages.push(currentPage);
	allPages.push(currentPage + 1);
	allPages.push('...');
	allPages.push(totalPage);
	return allPages;
};
