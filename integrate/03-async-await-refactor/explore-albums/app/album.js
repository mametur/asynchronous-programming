import { Photo } from './photo.js';

export class Album {
	id = null;
	userId = null;
	title = '';
	populated = false;
	photos = [];

	constructor(albumData) {
		Object.assign(this, albumData);
	}

	async populate() {
		const url = 'https://jsonplaceholder.typicode.com/albums/' + this.id + '/photos';
		const response = await fetch(url);

		const photos = await response.json();
		this.photos = photos.map((photo) => new Photo(photo));
		this.populated = true;
		return this;
	}
	render() {
		const container = document.createElement('div');
		container.id = 'album ' + this.id + ': ' + this.title;

		const titleEl = document.createElement('h2');
		titleEl.innerHTML = this.title;
		container.appendChild(titleEl);

		const idEl = document.createElement('p');
		idEl.innerHTML = 'album: ' + this.id;
		container.appendChild(idEl);

		const userEl = document.createElement('p');
		userEl.innerHTML = 'user: ' + this.userId;
		container.appendChild(userEl);

		const renderedPhotos = this.photos
			.map((photo) => photo.render())
			.reduce((all, next) => {
				all.appendChild(next);
				return all;
			}, document.createElement('div'));
		renderedPhotos.id = 'photos';
		container.appendChild(renderedPhotos);

		return container;
	}
}

/*
	async populate() {
		const url = 'https://jsonplaceholder.typicode.com/albums/' + this.id + '/photos';

		const response = await fetch(url);

		await response
			.json()
			.then((photos) => {
				this.photos = photos.map((photo) => new Photo(photo));
				this.populated = true;
				return this;
			})
			.catch((err) => console.error(err));
	} */
