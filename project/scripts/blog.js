// Targeting the parent element
const blogContainer = document.querySelector('.blog__container');
const blogModal = document.querySelector(".blog__modal__body");
// Global store for blog cards
let globalStore = [];

// -----------------------------------------------------
// A function for creating a new card
const newCard = ({
	id,
	imageUrl,
	blogTitle,
	blogType,
	blogDescription
}) => `
<div class="col-lg-4 col-md-6" id="${id}">
  <div class="card m-2">
    <div class="card-header d-flex justify-content-end gap-2">
      <button type="button" class="btn btn-outline-success" id="${id}" onclick="editCard(event)"><i class="fas fa-pencil-alt"></i></button>
      <button type="button" class="btn btn-outline-danger" id="${id}" onclick="deleteCard(event)"><i class="fas fa-trash-alt"></i></button>
    </div>
    <img src="${imageUrl}" class="card-img-top" alt="Blog Image">
    <div class="card-body">
      <h5 class="card-title">${blogTitle}</h5>
      <p class="card-text">${blogDescription}</p>
      <span class="badge bg-primary">${blogType}</span>
    </div>
    <div class="card-footer text-muted">
      <button type="button" id="${id}" class="btn btn-outline-primary float-end" data-bs-toggle="modal" data-bs-target="#showblog" onclick="openBlog(event)">Open Blog</button>
    </div>
  </div>
</div>`;

// --------------------------------------------------
const loadData = () => {
	const getInitialData = localStorage.getItem("blog");
	if (!getInitialData) return;

	const { cards } = JSON.parse(getInitialData);
	cards.forEach((blogObject) => {
		const createNewBlog = newCard(blogObject);
		blogContainer.insertAdjacentHTML("beforeend", createNewBlog);
		globalStore.push(blogObject);
	});
};

const updateLocalStorage = () => {
	localStorage.setItem("blog", JSON.stringify({ cards: globalStore }));
};

// Function for saving changes
const saveChanges = () => {
	const blogData = {
		id: `${Date.now()}`, // Generating a unique ID for each card
		imageUrl: document.getElementById('imageurl').value,
		blogTitle: document.getElementById('title').value,
		blogType: document.getElementById('type').value,
		blogDescription: document.getElementById('description').value
	};

	const createNewBlog = newCard(blogData);
	blogContainer.insertAdjacentHTML("beforeend", createNewBlog);
	globalStore.push(blogData);
	updateLocalStorage();
};

// Function for deleting a card
const deleteCard = (event) => {
	const targetID = event.target.closest('.col-lg-4').id;

	globalStore = globalStore.filter((blogObject) => blogObject.id !== targetID);
	updateLocalStorage();

	const cardElement = document.getElementById(targetID);
	if (cardElement) {
		blogContainer.removeChild(cardElement);
	}
};

// Function for editing a card
const editCard = (event) => {
	const targetID = event.target.closest('.col-lg-4').id;
	const parentElement = document.getElementById(targetID);

	const blogTitle = parentElement.querySelector('.card-title');
	const blogDescription = parentElement.querySelector('.card-text');
	const blogType = parentElement.querySelector('.badge');
	const submitBtn = parentElement.querySelector('.btn-outline-primary');

	blogTitle.setAttribute("contenteditable", "true");
	blogDescription.setAttribute("contenteditable", "true");
	blogType.setAttribute("contenteditable", "true");

	submitBtn.setAttribute("onclick", "saveEditChanges(event)");
	submitBtn.innerHTML = "Save Changes";
	submitBtn.removeAttribute("data-bs-toggle");
	submitBtn.removeAttribute("data-bs-target");
};

const saveEditChanges = (event) => {
	const targetID = event.target.closest('.col-lg-4').id;
	const parentElement = document.getElementById(targetID);

	const blogTitle = parentElement.querySelector('.card-title');
	const blogDescription = parentElement.querySelector('.card-text');
	const blogType = parentElement.querySelector('.badge');
	const submitBtn = parentElement.querySelector('.btn-outline-primary');

	const updatedData = {
		blogTitle: blogTitle.innerHTML,
		blogDescription: blogDescription.innerHTML,
		blogType: blogType.innerHTML,
	};

	globalStore = globalStore.map((blog) => {
		if (blog.id === targetID) {
			return {
				id: blog.id,
				imageUrl: blog.imageUrl,
				blogTitle: updatedData.blogType,
				blogDescription: updatedData.blogDescription,
			};
		}
		return blog; // important statement
	});

	updateLocalStorage();

	blogTitle.setAttribute("contenteditable", "false");

	blogDescription.setAttribute("contenteditable", "false");
	blogType.setAttribute("contenteditable", "false");

	// modal added
	submitBtn.setAttribute("onclick", "openBlog.apply(this, arguments)");
	submitBtn.setAttribute("data-bs-toggle", "modal");
	submitBtn.setAttribute("data-bs-target", "#showblog");

	submitBtn.innerHTML = "Open Blog";

}

const htmlModalContent = ({
	id,
	blogTitle,
	blogDescription,
	imageUrl,
	blogType
}) => {
	const date = new Date(parseInt(id));
	return ` <div id=${id}>
   <img
   src=${imageUrl}
   alt="bg image"
   class="img-fluid place__holder__image mb-3 p-4"
   />
   <div class="text-sm text-muted ">Created on ${date.toDateString()}</div>
   <h2 class="my-5 mt-5" style="display:inline;">${blogTitle}</h2>
   <span class="badge bg-primary">${blogType}</span>
   <p class="lead mt-2">
   ${blogDescription}
   </p></div>`;
};

const openBlog = (event) => {

	event = window.event;
	const targetID = event.target.id;

	const getBlog = globalStore.filter(({
		id
	}) => id === targetID);
	// console.log(getBlog[0]);
	blogModal.innerHTML = htmlModalContent(getBlog[0]);
};


