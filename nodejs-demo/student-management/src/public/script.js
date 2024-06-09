'use strict';

const app = Vue.createApp({
    data() {
        return {
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
    methods: {
        openModal: function (action, id = null) {
            this.formAction = action;
            this.modalTitle = action === 'add' ? 'Add Student' : 'Edit Student';

            if (action === 'edit' && id) {
                try {
                    this.fetchStudent(id).then((student) => {
                        this.studentForm.studentId = student.student_id;
                        this.studentForm.name = student.name;
                        this.studentForm.dob = student.dob;
                        this.studentForm.gender = student.gender;
                        this.studentForm.classId = student.class_id;
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
                    classId: null,
                };
            }

            this.showModal = true;
        },

        async fetchStudent(id) {
            const response = await fetch(`/students/${id}`);

            if (!response.ok) {
                throw new Error('Failed to fetch student data');
            }

            return await response.json();
        },

        closeModal() {
            this.showModal = false;
            this.showDeleteModal = false;
        },

        confirmDelete(id) {
            this.studentToDelete = id;
            this.showDeleteModal = true;
        },
    },
});

app.mount('#app');
