const app = Vue.createApp({
    data() {
        return {
            students: JSON.parse(localStorage.getItem('students')) || [],
            showModal: false,
            showDeleteModal: false,
            modalTitle: '',
            formAction: '',
            studentForm: {
                studentId: '',
                name: '',
                dob: '',
                gender: 'Unspecified',
                className: 'Class A'
            },
            studentToDelete: null
        };
    },
    methods: {
        openModal(action, student = null) {
            this.formAction = action;
            this.modalTitle = action === 'add' ? 'Add Student' : 'Edit Student';

            if (action === 'edit' && student) {
                this.studentForm = { ...student };
            } else {
                this.studentForm = {
                    studentId: '',
                    name: '',
                    dob: '',
                    gender: 'Unspecified',
                    className: 'Class A'
                };
            }

            this.showModal = true;
        },

        closeModal() {
            this.showModal = false;
            this.showDeleteModal = false;
        },

        handleSubmit() {
            if (this.formAction === 'add' && this.isDuplicateStudentId(this.studentForm.studentId)) {
                alert('Student ID already exists!');
                return;
            }

            if (this.formAction === 'add') {
                this.students.push({ ...this.studentForm });
            } else {
                const index = this.students.findIndex(student => student.studentId === this.studentForm.studentId);
                this.students[index] = { ...this.studentForm };
            }

            this.saveStudents();
            this.closeModal();
        },

        isDuplicateStudentId(studentId) {
            return this.students.some(student => student.studentId === studentId);
        },

        confirmDelete(student) {
            this.studentToDelete = student;
            this.showDeleteModal = true;
        },

        deleteStudent() {
            this.students = this.students.filter(student => student !== this.studentToDelete);
            this.saveStudents();
            this.closeModal();
        },

        saveStudents() {
            localStorage.setItem('students', JSON.stringify(this.students));
        }
    }
});

app.mount('#app');
