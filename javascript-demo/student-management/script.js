document.addEventListener('DOMContentLoaded', () => {
    const addStudentBtn = document.getElementById('addStudentBtn');
    const studentModal = document.getElementById('studentModal');
    const closeModalBtn = document.getElementsByClassName('close')[0];
    const studentForm = document.getElementById('studentForm');
    const studentTableBody = document.getElementById('studentTable').getElementsByTagName('tbody')[0];

    addStudentBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target == studentModal) {
            closeModal();
        }
    });

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('studentId').value;
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const className = document.getElementById('class').value;

        if (id) {
            updateStudent(id, name, age, className);
        } else {
            addStudent(name, age, className);
        }
        closeModal();
        clearForm();
    });

    function openModal(id = '', name = '', age = '', className = '') {
        document.getElementById('studentId').value = id;
        document.getElementById('name').value = name;
        document.getElementById('age').value = age;
        document.getElementById('class').value = className;
        studentModal.style.display = 'block';
    }

    function closeModal() {
        studentModal.style.display = 'none';
    }

    function clearForm() {
        document.getElementById('studentId').value = '';
        document.getElementById('name').value = '';
        document.getElementById('age').value = '';
        document.getElementById('class').value = '';
    }

    function addStudent(name, age, className) {
        const newRow = studentTableBody.insertRow();
        newRow.innerHTML = `
            <td>${name}</td>
            <td>${age}</td>
            <td>${className}</td>
            <td>
                <button onclick="editStudent(this)">Edit</button>
                <button onclick="deleteStudent(this)">Delete</button>
            </td>
        `;
    }

    function updateStudent(id, name, age, className) {
        const row = studentTableBody.rows[id];
        row.cells[0].innerText = name;
        row.cells[1].innerText = age;
        row.cells[2].innerText = className;
    }

    window.editStudent = (button) => {
        const row = button.parentNode.parentNode;
        const id = row.rowIndex - 1;
        const name = row.cells[0].innerText;
        const age = row.cells[1].innerText;
        const className = row.cells[2].innerText;

        openModal(id, name, age, className);
    };

    window.deleteStudent = (button) => {
        const row = button.parentNode.parentNode;
        row.parentNode.removeChild(row);
    };
});
