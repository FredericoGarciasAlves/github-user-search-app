document.addEventListener("DOMContentLoaded", () => {
    const searchBox = document.querySelector(".search-box");
    const searchInput = document.querySelector(".search-input");
    const searchBtn = document.querySelector(".search-btn");
    const profileImg = document.querySelector(".profile-img");
    const profileName = document.querySelector(".profile-name");
    const profileUsername = document.querySelector(".profile-username");
    const profileJoinDateDay = document.querySelector(".day");
    const profileJoinDateMonth = document.querySelector(".month");
    const profileJoinDateYear = document.querySelector(".year");
    const profileBio = document.querySelector(".profile-bio");
    const reposNumber = document.getElementById("repos-number");
    const followersNumber = document.getElementById("followers-number");
    const followingNumber = document.getElementById("following-number");
    const locationName = document.querySelector(".location-name");
    const twitterUsername = document.querySelector(".twitter-username");
    const githubLink = document.querySelector(".github-link");
    const companyName = document.querySelector(".company-name");
    const button = document.querySelector(".box-theme");
    const themeIcon = document.querySelector(".theme-toggle-icon");
    const ThemeBtn = document.querySelector(".theme-toggle-btn");

    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
    }

    button.addEventListener("click", () => {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
        if (themeIcon.src.endsWith("icon-moon.svg")) {
            themeIcon.src = "./assets/icon-sun.svg";
            ThemeBtn.innerText = "LIGHT";
        } else {
            themeIcon.src = "./assets/icon-moon.svg";
            ThemeBtn.innerText = "DARK";
        }
    });
    searchBtn.addEventListener("click", () => {
        const apiUrl = `https://api.github.com/users/${searchInput.value}`;

        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Not avaliable");
                }
                return response.json();
            })
            .then((data) => {
                const messageErroRem = document.querySelector(".message-erro");
                if (messageErroRem) {
                    messageErroRem.remove();
                }
                profileImg.src = data.avatar_url;
                profileName.textContent = data.name;
                profileUsername.textContent = `@${data.login}`;
                const dataDay = data.created_at;
                const day = dataDay.slice(8, 10);
                profileJoinDateDay.textContent = day;
                const dataMonth = data.created_at;
                const month = dataMonth.slice(5, 7).replace(/^0+/, "");
                const arrayMonth = [
                    "linguiço",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                ];
                if (month < 9) {
                    profileJoinDateMonth.textContent = arrayMonth[month];
                } else {
                    profileJoinDateMonth.textContent = arrayMonth[month];
                }
                dataYear = data.created_at;
                year = dataYear.slice(0, 4);
                profileJoinDateYear.textContent = year;
                if (data.bio !== null) {
                    profileBio.textContent = data.bio;
                } else {
                    profileBio.textContent = "Not Available";
                }
                reposNumber.textContent = data.public_repos;
                followersNumber.textContent = data.followers;
                followingNumber.textContent = data.following;
                if (data.location !== null) {
                    locationName.textContent = data.location;
                } else {
                    locationName.textContent = "Not Available";
                }

                if (data.twitter_username !== null) {
                    twitterUsername.textContent = data.twitter_username;
                } else {
                    twitterUsername.textContent = "Not Available";
                }
                githubLink.textContent = data.html_url;
                if (data.company !== null) {
                    companyName.textContent = `@${data.company}`;
                } else {
                    companyName.textContent = "Not Available";
                }
            })
            .catch((error) => {
                const messageErroRem = document.querySelector(".message-erro");
                if (messageErroRem) {
                    messageErroRem.remove();
                }
                const messageErro = document.createElement("span");
                messageErro.innerText = "No result";
                messageErro.className = "message-erro";
                searchBox.appendChild(messageErro);
            });
    });
});
