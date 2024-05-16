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

    addStudentBtn.addEventListener('click', () => openModal('add'));
    closeModalBtns.forEach(btn => btn.addEventListener('click', closeModal));
    window.addEventListener('click', (event) => {
        if (event.target == studentModal || event.target == confirmDeleteModal) {
            closeModal();
        }
    });

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formAction = document.getElementById('formAction').value;
        const studentId = document.getElementById('studentId').value;
        const name = document.getElementById('name').value;
        const dob = document.getElementById('dob').value;
        const gender = document.querySelector('input[name="gender"]:checked').value;
        const className = document.getElementById('class').value;

        if (formAction === 'add' && isDuplicateStudentId(studentId)) {
            alert('Student ID already exists!');
            return;
        }

        if (formAction === 'add') {
            addStudent(studentId, name, dob, gender, className);
        } else {
            updateStudent(studentId, name, dob, gender, className);
        }
        closeModal();
        clearForm();
    });

    confirmDeleteBtn.addEventListener('click', () => {
        deleteStudent(studentToDelete);
        closeModal();
    });

    cancelDeleteBtn.addEventListener('click', closeModal);

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

    function closeModal() {
        studentModal.style.display = 'none';
        confirmDeleteModal.style.display = 'none';
    }

    function clearForm() {
        document.getElementById('studentId').readOnly = false;
        document.getElementById('studentId').value = '';
        document.getElementById('name').value = '';
        document.getElementById('dob').value = '';
        document.querySelector('input[name="gender"][value="Unspecified"]').checked = true;
        document.getElementById('class').value = 'Class A';
    }

    function isDuplicateStudentId(studentId) {
        const rows = studentTableBody.rows;
        for (let i = 0; i < rows.length; i++) {
            if (rows[i].cells[0].innerText === studentId) {
                return true;
            }
        }
        return false;
    }

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

    window.editStudent = (button) => {
        const row = button.parentNode.parentNode;
        const studentId = row.cells[0].innerText;
        const name = row.cells[1].innerText;
        const dob = row.cells[2].innerText;
        const gender = row.cells[3].innerText;
        const className = row.cells[4].innerText;

        openModal('edit', studentId, name, dob, gender, className);
    };

    window.confirmDelete = (button) => {
        const row = button.parentNode.parentNode;
        studentToDelete = row;
        confirmDeleteModal.style.display = 'block';
    };

    function deleteStudent(row) {
        row.parentNode.removeChild(row);
        studentToDelete = null;
    }
});
