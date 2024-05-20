const PEOPLE_LIST = ["Михаил (М)", "Ильдар (М)", "Кирилл (Б)", "Егор (Б)", "Борис (Б)"]
const START_DATE = "20.05.2024"
const START_POS = 3

let start_date = moment(START_DATE, "DD.MM.YYYY").locale("ru").startOf("week")
let date_selector = document.getElementById("date_select")

update_page()

function get_workers(week) {
    let result = []
    for (let i = 0; i < 4; i++) {
        result.push(PEOPLE_LIST[(START_POS + week + i) % PEOPLE_LIST.length])
    }
    return result
}

function update_page(to_moment = moment(moment().format("YYYY-MM-DD"))) {
    let duration = moment.duration(to_moment - start_date)
    let number_of_weeks = Math.floor(duration.asWeeks())

    let workers = get_workers(number_of_weeks)
    let last_workers = get_workers(number_of_weeks - 1)

    document.getElementById("selected_date").innerText = to_moment.format("DD.MM.YYYY");
    document.getElementById("week_start").innerText = to_moment.locale("ru").startOf("week").format("DD.MM.YYYY")
    document.getElementById("week_end").innerText = to_moment.locale("ru").endOf("week").format("DD.MM.YYYY")

    document.getElementById("thursday-clean").innerText = workers[0]
    document.getElementById("thursday-wash").innerText = workers[1]
    document.getElementById("sunday-clean").innerText = workers[0]
    document.getElementById("sunday-wash").innerText = workers[1]
    document.getElementById("sunday-toilet").innerText = workers[2]
    document.getElementById("sunday-bathroom").innerText = workers[3]

    document.getElementById("last_floor_sweeper").innerText = last_workers[0]
    document.getElementById("last_floor_washer").innerText = last_workers[1]
    document.getElementById("last_toilet_washer").innerText = last_workers[2]
    document.getElementById("last_bathroom_washer").innerText = last_workers[3]
}

document.getElementById("show_datepicker_button").addEventListener("click", function () {
    date_selector.showPicker()
})

date_selector.addEventListener("change", function () {
    update_page(moment(this.value));
})

