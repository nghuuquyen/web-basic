const app = document.getElementById("app")

// Remove the warning message once this script is loaded
document.getElementById('warning-message').remove();

// Student Management App in React
function HomePage() {
    const [students, setStudents] = React.useState([]);
    const [isStudentModalOpen, setStudentModalOpen] = React.useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = React.useState(false);
    const [currentStudent, setCurrentStudent] = React.useState(null);
    const [formAction, setFormAction] = React.useState('add');
    const [studentToDelete, setStudentToDelete] = React.useState(null);

    // Add a new student
    const handleAddStudent = () => {
        setCurrentStudent({
            studentId: '',
            name: '',
            dob: '',
            gender: 'Unspecified',
            class: 'Class A'
        });
        setFormAction('add');
        setStudentModalOpen(true);
    };

    // Edit student
    const handleEditStudent = (student) => {
        setCurrentStudent({ ...student });
        setFormAction('edit');
        setStudentModalOpen(true);
    };

    // Delete student
    const handleDeleteClick = (student) => {
        setStudentToDelete(student);
        setDeleteModalOpen(true);
    };

    // Confirm student deletion
    const confirmDelete = () => {
        setStudents(students.filter(s => s.studentId !== studentToDelete.studentId));
        setDeleteModalOpen(false);
    };

    // Save student (add or update)
    const handleSaveStudent = (studentData) => {
        if (formAction === 'add') {
            // Check if student ID already exists
            if (students.some(s => s.studentId === studentData.studentId)) {
                alert('Student ID already exists!');
                return;
            }
            setStudents([...students, studentData]);
        } else {
            // Update existing student
            setStudents(students.map(s =>
                s.studentId === studentData.studentId ? studentData : s
            ));
        }

        setStudentModalOpen(false);
    };

    return (
        <>
            <h1>Student Management System (V1)</h1>
            <button className="btn-primary" onClick={handleAddStudent}>Add Student</button>
            <h2>Student List</h2>

            <StudentTable
                students={students}
                onEditStudent={handleEditStudent}
                onDeleteStudent={handleDeleteClick}
            />

            {isStudentModalOpen && (
                <StudentModal
                    student={currentStudent}
                    formAction={formAction}
                    onClose={() => setStudentModalOpen(false)}
                    onSave={handleSaveStudent}
                />
            )}

            {isDeleteModalOpen && (
                <ConfirmDeleteModal
                    onCancel={() => setDeleteModalOpen(false)}
                    onConfirm={confirmDelete}
                />
            )}
        </>
    );
}

// Student Table Component
function StudentTable({ students, onEditStudent, onDeleteStudent }) {
    return (
        <table id="studentTable">
            <thead>
                <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Date of Birth</th>
                    <th>Gender</th>
                    <th>Class</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {students.length > 0 ? (
                    students.map(student => (
                        <tr key={student.studentId}>
                            <td>{student.studentId}</td>
                            <td>{student.name}</td>
                            <td>{student.dob}</td>
                            <td>{student.gender}</td>
                            <td>{student.class}</td>
                            <td>
                                <button
                                    className="btn-secondary"
                                    onClick={() => onEditStudent(student)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn-danger"
                                    onClick={() => onDeleteStudent(student)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="6" style={{ textAlign: "center" }}>No students found</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

// Student Modal Component
function StudentModal({ student, formAction, onClose, onSave }) {
    const [formData, setFormData] = React.useState({ ...student });

    const handleChange = (e) => {
        const { id, value, type, name } = e.target;

        if (type === 'radio' && name === 'gender') {
            setFormData({ ...formData, gender: value });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={onClose}>&times;</span>
                    <h2 id="studentModalTitle">
                        {formAction === 'add' ? 'Add Student' : 'Edit Student'}
                    </h2>
                </div>
                <form id="studentForm" onSubmit={handleSubmit}>
                    <input type="hidden" id="formAction" value={formAction} />
                    <div className="form-group">
                        <label htmlFor="studentId">Student ID</label>
                        <input
                            type="text"
                            id="studentId"
                            placeholder="Student ID"
                            required
                            value={formData.studentId}
                            onChange={handleChange}
                            readOnly={formAction === 'edit'}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Student Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Student Name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            required
                            value={formData.dob}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <div className="gender-container">
                            <input
                                type="radio"
                                id="male"
                                name="gender"
                                value="Male"
                                checked={formData.gender === "Male"}
                                onChange={handleChange}
                            />
                            <label htmlFor="male">Male</label>
                            <input
                                type="radio"
                                id="female"
                                name="gender"
                                value="Female"
                                checked={formData.gender === "Female"}
                                onChange={handleChange}
                            />
                            <label htmlFor="female">Female</label>
                            <input
                                type="radio"
                                id="unspecified"
                                name="gender"
                                value="Unspecified"
                                checked={formData.gender === "Unspecified"}
                                onChange={handleChange}
                            />
                            <label htmlFor="unspecified">Unspecified</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="class">Class:</label>
                        <select
                            id="class"
                            required
                            value={formData.class}
                            onChange={handleChange}
                        >
                            <option value="Class A">Class A</option>
                            <option value="Class B">Class B</option>
                            <option value="Class C">Class C</option>
                        </select>
                    </div>
                    <button type="submit" className="btn-primary">Save</button>
                </form>
            </div>
        </div>
    );
}

// Confirm Delete Modal Component
function ConfirmDeleteModal({ onCancel, onConfirm }) {
    return (
        <div id="confirmDeleteModal" className="modal" style={{ display: 'block' }}>
            <div className="modal-content">
                <div className="modal-header">
                    <span className="close" onClick={onCancel}>&times;</span>
                    <h2>Confirm Delete</h2>
                </div>
                <p>Are you sure you want to delete this student?</p>
                <div className="modal-buttons">
                    <button className="btn-secondary" onClick={onCancel}>Cancel</button>
                    <button className="btn-danger" onClick={onConfirm}>Yes</button>
                </div>
            </div>
        </div>
    );
}

const root = ReactDOM.createRoot(app);

root.render(<HomePage />);