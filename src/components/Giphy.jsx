import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import Paginate from './Paginate';

const Giphy = () => {
	const [data, setData] = useState([]);
	const [search, setSearch] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [GiphyPerPage, setGiphyPerPage] = useState(25);
	const indexOfLastItem = currentPage * GiphyPerPage;
	const indexOfFirstItem = indexOfLastItem - GiphyPerPage;
	const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

	const handleSearchChange = (e) => setSearch(e.target.value);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsError(false);
		setIsLoading(true);
		try {
			const results = await axios('https://api.giphy.com/v1/gifs/search	', {
				params: {
					api_key: '7ZYcYkF9MT5y0xre6QkmGHL6pYtP2jt8',
					q: search,
					limit: 1000,
				},
			});
			setData(results.data.data);
		} catch (err) {
			setIsError(true);
			setTimeout(() => setIsError(false), 3000);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);
			try {
				const results = await axios('https://api.giphy.com/v1/gifs/trending', {
					params: {
						api_key: '7ZYcYkF9MT5y0xre6QkmGHL6pYtP2jt8',
						limit: 100,
					},
				});

				console.log(results);
				setData(results.data.data);
			} catch (err) {
				setIsError(true);
				setTimeout(() => setIsError(false), 3000);
			}

			setIsLoading(false);
		};
		fetchData();
	}, []);

	const renderGifs = () => {
		if (isLoading) {
			return <Loader />;
		}
		return currentItems.map((item) => {
			return (
				<div key={item.id} className="gif">
					<img src={item.images.fixed_height.url} alt="/" />
				</div>
			);
		});
	};
	const renderError = () => {
		if (isError) {
			return (
				<div className="alert alert-danger" role="alert">
					{' '}
					Unable to Show Gifs, please try in few minutes
				</div>
			);
		}
	};

	const pageSelected = (pageNumbers) => {
		setCurrentPage(pageNumbers);
	};

	return (
		<div className="m-2">
			{renderError()}
			<form className="row g-2 justify-content-center m-2">
				<div className="col-auto">
					<input
						type="text"
						placeholder="search"
						className="form-control"
						value={search}
						onChange={handleSearchChange}
					/>
				</div>
				<div className="col-auto">
					<button
						type="submit"
						className="btn btn-primary mx-2"
						onClick={handleSubmit}
					>
						Go
					</button>
				</div>
			</form>
			<Paginate
				pageSelected={pageSelected}
				currentPage={currentPage}
				GiphyPerPage={GiphyPerPage}
				totalGiphys={data.length}
			/>
			<div className="container gifs">{renderGifs()}</div>
		</div>
	);
};

export default Giphy;
