const renderJobCards = (obj) => {
    const ul = document.querySelector(".cards");
    Array.from(obj).forEach((elem, i) => {
        const { id, title, enterprise, location, descrition, modalities } = elem;

        const li = document.createElement("li");
        li.classList.add("card");
        li.innerHTML = `
        <h4>${title}</h4>
        <div class="enterprise-info">
            <span>${enterprise}</span>
            <span>${location}</span>
        </div>
        <p>${descrition}</p>
        <div class="footer">
            <div class="tags">
                <div class="modality-tag"><span>${modalities[0]}</span></div>
                <div class="modality-tag"><span>${modalities[1]}</span></div>
            </div>
            <button id="card-${id}" class="little-btn sendJob">Candidatar</button>
        </div>
        `;
        ul.append(li);
    })

}
renderJobCards(jobsData);

const ulAside = document.createElement("ul");
ulAside.classList.add("cards-list")
const renderSelectedJobsCard = (obj) => {
    const asideBox = document.querySelector(".aside-body");
    asideBox.append(ulAside);
    ulAside.innerHTML = "";
    obj.forEach(elem => {
        const li = document.createElement("li");
        li.innerHTML = `
        <div class="aside-card">
            <div class="header-card">
                <h4>${elem.title}</h4>
                <button id="${elem.id}" class="trash-btn removeJob"></button>
            </div>
            <div class="enterprise-info">
                <span>${elem.enterprise}</span>
                <span>${elem.location}</span>
            </div>
        </div>
        `;
        isEmptySelectBox();
        ulAside.append(li);
    })
}

const renderWarningBox = () => {
    const asideBox = document.querySelector(".aside-body");
    asideBox.innerHTML = `
    <div class="warning-box">
        <span class="warning-text">Você ainda não aplicou para nenhuma vaga</span>
        <div class="group-bar">
            <span class="bar"></span>
            <span class="bar second-bar"></span>
            <span class="footer-bar">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
            </span>
        </div>
    </div>
    `;
}