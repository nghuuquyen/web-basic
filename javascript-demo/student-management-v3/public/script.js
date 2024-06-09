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

        closeModal() {
            this.showModal = false;
            this.showDeleteModal = false;
        },

        confirmDelete(studentId) {
            this.studentToDelete = studentId;
            this.showDeleteModal = true;
        },
    },
});

app.mount('#app');
