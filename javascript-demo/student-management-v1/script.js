document.addEventListener('DOMContentLoaded', () => {
    const addStudentBtn = document.getElementById('addStudentBtn');
    const studentModal = document.getElementById('studentModal');
    const studentModalTitle = document.getElementById('studentModalTitle');
    const closeModalBtns = document.querySelectorAll('.close');
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];
    const confirmDeleteModal = document.getElementById('confirmDeleteModal');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    let studentToDelete = null;

    // Load students from localStorage on page load
    loadStudents();

    // Open the modal for adding a new student
    addStudentBtn.addEventListener('click', () => openModal('add'));

    // Close the modal when clicking on the close button or outside the modal
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    window.addEventListener('click', (event) => {
        if (event.target == studentModal || event.target == confirmDeleteModal) {
            closeModal();
        }
    });

    // Handle form submission for adding or editing a student
    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formAction = document.getElementById('formAction').value;
        const studentId = document.getElementById('studentId').value;
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const className = document.getElementById('class').value;

        // Check for duplicate student ID if adding a new student
        if (formAction === 'add' && isDuplicateStudentId(studentId)) {
            alert('Student ID already exists!');
            return;
        }

        // Add or update the student based on the form action
        if (formAction === 'add') {
            addStudent(studentId, name, dob, gender, className);
        } else {
            updateStudent(studentId, name, dob, gender, className);
        }

        // Save the updated student list to localStorage
        saveStudents();
        closeModal();
        clearForm();
    });

    // Confirm deletion of a student
    confirmDeleteBtn.addEventListener('click', () => {
        deleteStudent(studentToDelete);
        saveStudents();
        closeModal();
    });

    // Cancel deletion of a student
    cancelDeleteBtn.addEventListener('click', closeModal);

    // Open the modal with appropriate action (add or edit)
    function openModal(action, studentId = '', name = '', dob = '', gender = 'Unspecified', className = 'Class A') {
        document.getElementById('formAction').value = action;
        studentModalTitle.textContent = action === 'add' ? 'Add Student' : 'Edit Student';
        const studentIdInput = document.getElementById('studentId');
        studentIdInput.readOnly = (action === 'edit');
        studentIdInput.value = studentId;
        document.getElementById('name').value = name;
        document.getElementById('dob').value = dob;
        document.querySelector(`input[name="gender"][value="${gender}"]`).checked = true;
        document.getElementById('class').value = className;
        studentModal.style.display = 'block';
    }

    // Close the modal
    function closeModal() {
        studentModal.style.display = 'none';
        confirmDeleteModal.style.display = 'none';
    }

    // Clear the form inputs and reset readOnly property of student ID
    function clearForm() {
        document.getElementById('studentId').readOnly = false;
        document.getElementById('studentId').value = '';
        document.getElementById('name').value = '';
        document.getElementById('dob').value = '';
        document.querySelector('input[name="gender"][value="Unspecified"]').checked = true;
        document.getElementById('class').value = 'Class A';
    }

    // Check if a student ID already exists
    function isDuplicateStudentId(studentId) {
        const rows = studentTableBody.rows;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].innerText === studentId) {
                return true;
            }
        }
        return false;
    }

    // Add a new student to the table
    function addStudent(studentId, name, dob, gender, className) {
        const newRow = studentTableBody.insertRow();
        newRow.innerHTML = `
            <td>${studentId}</td>
            <td>${name}</td>
            <td>${dob}</td>
            <td>${gender}</td>
            <td>${className}</td>
            <td>
                <button onclick="editStudent(this)">Edit</button>
                <button onclick="confirmDelete(this)">Delete</button>
            </td>
        `;
    }

    // Update an existing student in the table
    function updateStudent(studentId, name, dob, gender, className) {
        const rows = studentTableBody.rows;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].innerText === studentId) {
                rows[i].cells[1].innerText = name;
                rows[i].cells[2].innerText = dob;
                rows[i].cells[3].innerText = gender;
                rows[i].cells[4].innerText = className;
                break;
            }
        }
    }

    // Edit an existing student
    window.editStudent = (button) => {
        const row = button.parentNode.parentNode;
        const studentId = row.cells[0].innerText;
        const name = row.cells[1].innerText;
        const dob = row.cells[2].innerText;
        const gender = row.cells[3].innerText;
        const className = row.cells[4].innerText;

        openModal('edit', studentId, name, dob, gender, className);
    };

    // Confirm deletion of a student
    window.confirmDelete = (button) => {
        const row = button.parentNode.parentNode;
        studentToDelete = row;
        confirmDeleteModal.style.display = 'block';
    };

    // Delete a student from the table and localStorage
    function deleteStudent(row) {
        const studentId = row.cells[0].innerText;
        row.parentNode.removeChild(row);
        removeStudent(studentId);
        studentToDelete = null;
    }

    // Save the list of students to localStorage
    function saveStudents() {
        const students = [];
        const rows = studentTableBody.rows;
        for (let i = 0; i < rows.length; i++) {
            const studentId = rows[i].cells[0].innerText;
            const name = rows[i].cells[1].innerText;
            const dob = rows[i].cells[2].innerText;
            const gender = rows[i].cells[3].innerText;
            const className = rows[i].cells[4].innerText;
            students.push({ studentId, name, dob, gender, className });
        }
        localStorage.setItem('students', JSON.stringify(students));
    }

    // Remove a student from localStorage
    function removeStudent(studentId) {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        const updatedStudents = students.filter(student => student.studentId !== studentId);
        localStorage.setItem('students', JSON.stringify(updatedStudents));
    }

    // Load the list of students from localStorage
    function loadStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        students.forEach(student => {
            addStudent(student.studentId, student.name, student.dob, student.gender, student.className);
        });
    }
});
