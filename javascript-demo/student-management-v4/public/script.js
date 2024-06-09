'use strict';

const app = Vue.createApp({
    data() {
        return {
            students: [],
            classes: [],
            showModal: false,
            showDeleteModal: false,
            modalTitle: '',
            formAction: '',
            studentForm: {
                studentId: '',
                name: '',
                dob: '',
                gender: 'Unspecified',
                classId: null,
            },
            studentToDelete: null,
        };
    },
    created() {
        this.fetchClasses();
        this.fetchStudents();
    },
    methods: {
        fetchClasses() {
            fetch('/classes')
                .then((response) => {
                    if (!response.ok) {
                        console.error('Failed to fetch class data');
                        return;
                    }

                    return response.json();
                })
                .then((classes) => {
                    this.classes = classes;
                });
        },

        fetchStudents() {
            fetch('/students')
                .then((response) => {
                    if (!response.ok) {
                        console.error('Failed to fetch student data');
                        return;
                    }

                    return response.json();
                })
                .then((students) => {
                    this.students = students;
                });
        },

        openModal: function (action, studentId = null) {
            this.formAction = action;
            this.modalTitle = action === 'add' ? 'Add Student' : 'Edit Student';

            if (action === 'edit' && studentId) {
                try {
                    this.fetchStudent(studentId).then((student) => {
                        this.studentForm = { ...student };
                    });
                } catch (error) {
                    console.error('Error fetching student data:', error);
                    alert('Failed to load student data. Please try again.');
                }
            } else {
                this.studentForm = {
                    studentId: '',
                    name: '',
                    dob: '',
                    gender: 'Unspecified',
                    className: 'Class A',
                };
            }

            this.showModal = true;
        },

        async fetchStudent(studentId) {
            const response = await fetch(`/api/student/${studentId}`);

            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }

            return await response.json();
        },

        handleSubmit() {
            if (this.formAction === 'add') {
                fetch('/add-student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.studentForm),
                }).then((response) => {
                    if (!response.ok) {
                        console.error('Failed to add student');
                        return;
                    }

                    this.fetchStudents(); // for a simple demo, we just fetch all students again
                    this.closeModal();
                });
            } else {
                fetch('/edit-student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.studentForm),
                }).then((response) => {
                    if (!response.ok) {
                        console.error('Failed to edit student');
                        return;
                    }

                    this.fetchStudents(); // for a simple demo, we just fetch all students again
                    this.closeModal();
                });
            }

            this.closeModal();
        },

        closeModal() {
            this.showModal = false;
            this.showDeleteModal = false;
        },

        confirmDelete(studentId) {
            this.studentToDelete = studentId;
            this.showDeleteModal = true;
        },

        deleteStudent() {
            fetch('/delete-student', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId: this.studentToDelete }),
            }).then((response) => {
                if (!response.ok) {
                    console.error('Failed to delete student');
                    return;
                }

                this.students = this.students.filter((student) => student.studentId !== this.studentToDelete);
                this.closeModal();
            });
        },
    },
});

app.mount('#app');
