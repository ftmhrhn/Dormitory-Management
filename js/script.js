// پیدا کردن فرم ورود
const loginForm = document.getElementById("loginForm");

// بررسی ارسال فرم
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {

        // جلوگیری از رفرش شدن صفحه
        event.preventDefault();

        // گرفتن اطلاعات وارد شده توسط کاربر
        const studentId = document.getElementById("studentId").value;
        const password = document.getElementById("password").value;

        // بررسی خالی نبودن فیلدها
        if (studentId === "" || password === "") {
            alert("لطفاً شماره دانشجویی و رمز عبور را وارد کنید.");
            return;
        }

        // ورود به داشبورد
        window.location.href = "dashboard.html";
    });
}

//  مدیریت فرم پروفایل 
const profileForm = document.getElementById("profileForm");

if (profileForm) {

    profileForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const firstName =
            document.getElementById("firstName").value;

        const lastName =
            document.getElementById("lastName").value;

        if (firstName.trim() === "" || lastName.trim() === "") {
            alert("لطفاً نام و نام خانوادگی را وارد کنید.");
            return;
        }

        alert("اطلاعات پروفایل با موفقیت ذخیره شد ✅");

    });
}


// بازنشانی فرم پروفایل
function resetProfile() {
    document.getElementById("firstName").value = "فاطمه";
    document.getElementById("lastName").value = "روحانی";
    document.getElementById("major").value = "مهندسی کامپیوتر";
    document.getElementById("phone").value = "4011429064";
    document.getElementById("email").value = "fatmhrohni@gmail.com";
}


// فرم درخواست اتاق
const roomRequestForm =
    document.getElementById("roomRequestForm");

if (roomRequestForm) {
    roomRequestForm.addEventListener("submit", function(event) {
        event.preventDefault();

       const dormitorySelect =
    document.getElementById("dormitory");

const roomTypeSelect =
    document.getElementById("roomType");

const capacitySelect =
    document.getElementById("capacity");

const dormitory =
    dormitorySelect.options[dormitorySelect.selectedIndex].text;

const roomType =
    roomTypeSelect.options[roomTypeSelect.selectedIndex].text;

const capacity =
    capacitySelect.options[capacitySelect.selectedIndex].text;

    const requestFloor =
    document.getElementById("requestFloor");

        const floorSelect =
    document.getElementById("floor");

        const floor =
            floorSelect.options[floorSelect.selectedIndex].text;

        const description =
            document.getElementById("description").value;

        const rules =
            document.getElementById("rules").checked;


        // بررسی اطلاعات 
        if (dormitory === "") {
            alert("لطفاً خوابگاه موردنظر را انتخاب کنید.");
            return;
        }

        if (roomType === "") {
            alert("لطفاً نوع اتاق را انتخاب کنید.");
            return;
        }

        if (capacity === "") {
            alert("لطفاً ظرفیت اتاق را انتخاب کنید.");
            return;
        }

        if (!rules) {
            alert("لطفاً قوانین خوابگاه را تأیید کنید.");
            return;
        }

        // ایجاد اطلاعات درخواست
        const requestData = {

            code: "REQ-1405-001",
            dormitory: dormitory,
            roomType: roomType,
            capacity: capacity,
            floor: floor,
            description: description,
            status: "در حال بررسی"
        };

        // ذخیره در مرورگر 
        localStorage.setItem(
            "roomRequest",
            JSON.stringify(requestData)
        ); 
        localStorage.setItem(
             "lastRequestType",
             "room"
        );

        // پیام موفقیت 
        alert(
            "درخواست اتاق با موفقیت ثبت شد ✅\n\n" +
            "کد پیگیری: REQ-1405-001"
        );

        // رفتن به صفحه وضعیت 
        window.location.href =
            "request-status.html";
    });
}

// فرم درخواست تعمیرات
const maintenanceForm =
    document.getElementById("maintenanceForm");

if (maintenanceForm) {
    maintenanceForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // گرفتن عناصر فرم 
        const problemTypeSelect =
            document.getElementById("problemType");

        const prioritySelect =
            document.getElementById("priority");

        const roomNumber =
            document.getElementById("roomNumber").value;

        const problemTitle =
            document.getElementById("problemTitle").value;

        const problemDescription =
            document.getElementById("problemDescription").value;

        // گرفتن متن فارسی گزینه‌های انتخاب شده 
        const problemType =
            problemTypeSelect.options[
                problemTypeSelect.selectedIndex
            ].text;

        const priority =
            prioritySelect.options[
                prioritySelect.selectedIndex
            ].text;

        // بررسی اطلاعات 
        if (problemTypeSelect.value === "") {
            alert("لطفاً نوع مشکل را انتخاب کنید.");
            return;
        }

        if (prioritySelect.value === "") {
            alert("لطفاً میزان فوریت را انتخاب کنید.");
            return;
        }

        if (problemTitle.trim() === "") {
            alert("لطفاً عنوان مشکل را وارد کنید.");
            return;
        }

        if (problemDescription.trim() === "") {
            alert("لطفاً شرح مشکل را وارد کنید.");
            return;
        }


        // ایجاد اطلاعات درخواست 
        const maintenanceData = {
            code: "REP-1405-001",
            problemType: problemType,
            roomNumber: roomNumber,
            priority: priority,
            problemTitle: problemTitle,
            problemDescription: problemDescription,
            status: "در حال بررسی"
        };


        // ذخیره در مرورگر 
        localStorage.setItem(
            "maintenanceRequest",
            JSON.stringify(maintenanceData)
        );
        localStorage.setItem(
              "lastRequestType",
                "maintenance"
        );


        // پیام موفقیت 
        alert(
            "درخواست تعمیرات با موفقیت ثبت شد ✅\n\n" +
            "کد پیگیری: REP-1405-001"
        );  
        window.location.href = "request-status.html";
    });
}


// تشخیص نوع آخرین درخواست
const lastRequestType =
    localStorage.getItem("lastRequestType");

const roomRequest =
    localStorage.getItem("roomRequest");

const maintenanceRequest =
    localStorage.getItem("maintenanceRequest");

// تشخیص درخواست فعال
if (lastRequestType === "maintenance" && maintenanceRequest) {

    const maintenanceData =
        JSON.parse(maintenanceRequest);

    console.log("درخواست تعمیرات:", maintenanceData);
}


if (lastRequestType === "room" && roomRequest) {
    const roomData =
        JSON.parse(roomRequest);
    console.log("درخواست اتاق:", roomData);
}


// نمایش اطلاعات درخواست اتاق
const savedRequest =
    localStorage.getItem("roomRequest");

if (savedRequest) {

    const requestData =
        JSON.parse(savedRequest);

    const requestCode =
        document.getElementById("requestCode");

    const requestDormitory =
        document.getElementById("requestDormitory");

    const requestRoomType =
        document.getElementById("requestRoomType");

    const requestCapacity =
        document.getElementById("requestCapacity");

    const requestFloor =
        document.getElementById("requestFloor");

    if (requestCode) {
        requestCode.textContent =
            requestData.code;
    }

    if (requestDormitory) {
        requestDormitory.textContent =
            requestData.dormitory;
    }

    if (requestRoomType) {
        requestRoomType.textContent =
            requestData.roomType;
    }

    if (requestCapacity) {
        requestCapacity.textContent =
            requestData.capacity;
    }

    if (requestFloor) {
    requestFloor.textContent =
        requestData.floor;
}
}


// نمایش اطلاعات درخواست تعمیرات
if (lastRequestType === "maintenance" && maintenanceRequest) {

    const maintenanceData =
        JSON.parse(maintenanceRequest);

    const maintenanceProblemType =
        document.getElementById("maintenanceProblemType");

    const maintenanceRoomNumber =
        document.getElementById("maintenanceRoomNumber");

    const maintenancePriority =
        document.getElementById("maintenancePriority");

    const maintenanceProblemTitle =
        document.getElementById("maintenanceProblemTitle");

    const maintenanceProblemDescription =
        document.getElementById("maintenanceProblemDescription");


    if (maintenanceProblemType) {
        maintenanceProblemType.textContent =
            maintenanceData.problemType;
    }

    if (maintenanceRoomNumber) {
        maintenanceRoomNumber.textContent =
            maintenanceData.roomNumber;
    }

    if (maintenancePriority) {
        maintenancePriority.textContent =
            maintenanceData.priority;
    }

    if (maintenanceProblemTitle) {
        maintenanceProblemTitle.textContent =
            maintenanceData.problemTitle;
    }

    if (maintenanceProblemDescription) {
        maintenanceProblemDescription.textContent =
            maintenanceData.problemDescription;
    }
}


// نمایش وضعیت درخواست
const roomRequestDetails =
    document.getElementById("roomRequestDetails");

const maintenanceRequestDetails =
    document.getElementById("maintenanceRequestDetails");


if (lastRequestType === "maintenance") {

    if (roomRequestDetails) {
        roomRequestDetails.style.display = "none";
    }

    if (maintenanceRequestDetails) {
        maintenanceRequestDetails.style.display = "grid";
    }
}

if (lastRequestType === "room") {

    if (roomRequestDetails) {
        roomRequestDetails.style.display = "grid";
    }

    if (maintenanceRequestDetails) {
        maintenanceRequestDetails.style.display = "none";
    }
}