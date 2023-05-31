import React from 'react';

const Paginate = (props) => {
	const pageNUmbers = [];
	for (let i = 1; i <= Math.ceil(props.totalGiphys / props.GiphyPerPage); i++) {
		pageNUmbers.push(i);
	}
	return (
		<nav>
			<ul className="pagination pagination-sm justify-content-end border-0">
				{pageNUmbers.map((number) => {
					let classes = 'page-item';
					if (number === props.currentPage) {
						classes += 'active';
					}
					return (
						<li className={classes}>
							<a
								href="/"
								className="page-link"
								onClick={() => props.pageSelected(number)}
							>
								{number}
							</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default Paginate;
