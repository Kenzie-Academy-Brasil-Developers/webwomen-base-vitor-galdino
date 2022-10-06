const isEmptySelectBox = () => {
    
    if (selectedJobs.length === 0) {
        renderWarningBox();

    } else if (document.querySelector(".warning-box")) {
        document.querySelector(".warning-box").remove();
    }
}
isEmptySelectBox();

const checkButtonToSend = () => {
    const button = document.querySelectorAll(".sendJob");
    button.forEach(btn => {
        btn.onclick = (e) => {
            if (e.target.classList.contains("sendJob")) {
                e.target.classList.replace('sendJob', 'removeJob');
                e.target.innerHTML = "Remover candidatura";
                sendToSelectedJobs(e.target.id.replace("card-", ""));
            }
            checkButtonToRemove();
        }
    })
}

const checkButtonToRemove = () => {
    const button = document.querySelectorAll(".removeJob");
    button.forEach(btn => {
        btn.onclick = (e) => {
            if (e.target.classList.contains("trash-btn")) {
                const cardBtn = document.querySelector(`#card-${e.target.id}`);
                cardBtn.classList.replace('removeJob', 'sendJob');
                cardBtn.innerHTML = "Candidatar";
                removeFromSelctedJobs(e.target.id);
            } else {
                e.target.classList.replace('removeJob', 'sendJob');
                e.target.innerHTML = "Candidatar";
                removeFromSelctedJobs(e.target.id);
            }
            checkButtonToSend();
        }
    })
}
checkButtonToSend();

const sendToSelectedJobs = (id) => {
    const obj = jobsData.find(elem => elem.id === parseInt(id));
    selectedJobs.push(obj);
    renderSelectedJobsCard(selectedJobs);

    const jobsJson = JSON.stringify(selectedJobs);
    localStorage.setItem("chosenJobs", jobsJson);
}

const removeFromSelctedJobs = (id) => {
    const elemIndex = selectedJobs.findIndex(elem => elem.id === parseInt(id.replace("card-", "")))
    selectedJobs.splice(elemIndex, 1);
    renderSelectedJobsCard(selectedJobs);
    isEmptySelectBox();
    checkButtonToRemove();

    const jobsJson = JSON.stringify(selectedJobs);
    localStorage.setItem("chosenJobs", jobsJson);
}

const reloadLastActivity = () => {
    const jobsObj = JSON.parse(localStorage.getItem("chosenJobs"))
    selectedJobs = jobsObj;
    if (jobsObj !== null) {
        renderSelectedJobsCard(jobsObj);
        const btn = document.querySelectorAll(".sendJob");
        selectedJobs.forEach((elem) => {
            btn.forEach(button => {
                if (elem.id === parseInt(button.id.replace("card-", ""))) {
                    button.classList.replace('sendJob', 'removeJob');
                    button.innerHTML = "Remover candidatura";
                }
                checkButtonToSend();
                checkButtonToRemove();
            })
        })
    }
}
reloadLastActivity();