'use strict';

/* eslint-disable no-unused-vars */
async function openModal(action, studentId = null) {
    document.getElementById('student-form').action = action === 'add' ? '/add-student' : '/edit-student';
    document.getElementById('modal-title').innerText = action === 'add' ? 'Add Student' : 'Edit Student';
    document.getElementById('studentId').readOnly = action === 'edit';

    if (action === 'edit' && studentId) {
        try {
            const response = await fetch(`/api/student/${studentId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }
            const student = await response.json();
            document.getElementById('studentId').value = student.studentId;
            document.getElementById('name').value = student.name;
            document.getElementById('dob').value = student.dob;
            document.getElementById('classId').value = student.class.id;
            document.querySelector(`input[name="gender"][value="${student.gender}"]`).checked = true;
        } catch (error) {
            console.error('Error fetching student data:', error);
            alert('Failed to load student data. Please try again.');
        }
    } else {
        document.getElementById('student-form').reset();
    }

    document.getElementById('student-modal').style.display = 'block';
}

/* eslint-disable no-unused-vars */
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

/* eslint-disable no-unused-vars */
function confirmDelete(studentId) {
    document.getElementById('delete-studentId').value = studentId;
    document.getElementById('delete-modal').style.display = 'block';
}
