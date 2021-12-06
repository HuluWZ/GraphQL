exports.authors = () => 
  [
    { id: 1, name: 'J. K. Rowling' },
    { id: 2, name: 'J. R. R. Tolkien' },
    { id: 3, name: 'Brent Weeks' }
  ]

exports.books= () =>
[
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]

exports.students = () =>
  [
    { id: "ETS001/11", name: "Alex Graham", email: "Alex@gmail.com", collegeId: "Col-100" },
    { id: "ETS010/11", name: "Luis Figo", email: "figo@gmail.com", collegeId: "Col-102" },
    { id: "ETS011/11", name: "Mark Lucas", email: "lucasMark@gmail.com", collegeId: "Col-101" },
    { id: "ETS0801/11", name: "Alphonso Davies", email: "davies@gmail.com", collegeId: "Col-100" },
    { id: "ETS101/11", name: "John Doe", email: "johndoe@gmail.com", collegeId: "Col-100" }
  ]

  //TODO: add
exports.colleges = () =>
  [
    { id: "Col-100", name: "Software", rating: 5.0, term: 4 },
    { id: "Col-101", name: "Electrical", rating: 4.8, term: 5 },
    { id: "Col-102", name: "Mechanical", rating: 4.9, term: 5 }
  ]