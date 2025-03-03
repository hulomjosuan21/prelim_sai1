$(document).ready(function () {
    const rowTemplate = document.querySelector('#row_tamplate');
    const tableBody = document.querySelector("#tableBody");
    let toEditId = null;
    getAllStudents()
    function calculateAge(birthdate) {
        const birthDate = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age;
    }

    function getAllStudents() {
        $.ajax({
            url: "get_allStudents.php",
            type: "GET",
        }).done(function (response) {
            const responsedata = JSON.parse(response);

            if (responsedata.status == 200) {
                const students = responsedata.data;

                students.forEach(student => {
                    const clone = rowTemplate.content.cloneNode(true);

                    clone.querySelector("#trId").innerHTML = student.student_id;
                    clone.querySelector("#trFname").innerHTML = student.first_name;
                    clone.querySelector("#trLname").innerHTML = student.last_name;
                    clone.querySelector("#trEmail").innerHTML = student.email;
                    clone.querySelector("#trGender").innerHTML = student.gender;
                    clone.querySelector("#trCourse").innerHTML = student.course;
                    clone.querySelector("#trAddress").innerHTML = student.user_address;
                    clone.querySelector("#trAge").innerHTML = calculateAge(student.birthdate);
                    const editBtn = clone.querySelector("#editBtn");

                    editBtn.onclick = () => {
                        toEditId = student.student_id;
                        setModal(student.first_name, student.email, student.course, student.birthdate, student.last_name, student.gender, student.user_address);
                    }

                    clone.querySelector("#deleteBtn").onclick = () => {
                        deleteStudentById(student.student_id);
                    }

                    tableBody.appendChild(clone);
                });
            } else if (responsedata.status == 404) {
                alert("No student found");
            } else {
                alert("Failed to get students");
            }
        })
    }

    function setModal(fname, email, course, bday, lname, gender, address) {
        $("#editModal").modal("show");
        $("#fname_input_edit").val(fname)
        $("#email_input_edit").val(email)
        $("#course_input_edit").val(course)
        $("#bday_input_edit").val(bday)
        $("#lname_input_edit").val(lname)
        $("#gender_input_edit").val(gender)
        $("#address_input_edit").val(address)
    }

    $("#editForm").submit(function (e) {
        e.preventDefault();
        $("#fname_input_edit").val()
        $("#email_input_edit").val()
        $("#course_input_edit").val()
        $("#bday_input_edit").val()
        $("#lname_input_edit").val()
        $("#gender_input_edit").val()
        $("#address_input_edit").val()
        $("#profile_input_edit").val()

        const formData = {
            first_name: $("#fname_input_edit").val(),
            email: $("#email_input_edit").val(),
            course: $("#course_input_edit").val(),
            bday: $("#bday_input_edit").val(),
            last_name: $("#lname_input_edit").val(),
            gender: $("#gender_input_edit").val(),
            address: $("#address_input_edit").val(),
            profile: $("#profile_input_edit").val()
        }

        $.ajax({
            url: "edit_student.php",
            method: "POST",
            data: { student_id: toEditId, ...formData }
        }).done(function (response) {
            const responsedata = JSON.parse(response);

            if (responsedata.status == 200) {
                alert("Student updated successfully");
                location.reload();
            } else {
                alert("Failed to update student");
            }
        })
    })


    $("#addForm").submit(function (e) {
        e.preventDefault();

        const fname = $("#fname_input").val();
        const email = $("#email_input").val();
        const course = $("#course_input").val();
        const bday = $("#bday_input").val();

        const lname = $("#lname_input").val();
        const gender = $("#gender_input").val();
        const address = $("#address_input").val();
        const profile = $("#profile_input").val();

        if (fname && email && course && bday && lname && gender && address && profile) {

            $.ajax({
                url: "add_student.php",
                type: "POST",
                data: {
                    first_name: fname,
                    last_name: lname,
                    email: email,
                    gender: gender,
                    course: course,
                    bday: bday,
                    address: address,
                    profile: profile
                }
            }).done(function (data) {
                const response = JSON.parse(data);

                if (response.status == 200) {
                    alert("Student added successfully");

                    location.reload();
                } else {
                    alert("Failed to add student");
                }
            })
        } else {
            alert("Please fill all the fields");
            return;
        }
    });

    function deleteStudentById(student_id) {
        if (student_id) {
            $.ajax({
                url: "delete_product.php",
                method: "POST",
                data: { student_id: student_id }
            }).done(function (response) {
                const responsedata = JSON.parse(response);

                if (responsedata.status == 200) {
                    alert(`Student with id of ${student_id} deleted successfully`);
                    location.reload();
                } else {
                    alert("Failed to delete student");
                }
            });
        } else {
            alert("Please select student");
        }
    }
});

